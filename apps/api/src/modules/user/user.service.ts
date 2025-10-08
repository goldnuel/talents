import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

//Packages
import { prisma } from "../../lib/prisma.js";
import { sendEmail } from "../../lib/email.js";

//Libs
import { s3, config } from "../../lib/s3.js";

//Utils
import { generateUserId } from "../../utils/generate.js";

//Templates and Configs
import RegisterTemplate from "../../templates/Registration.js";
import { LINK } from "../../config.js";

export async function createUser(input: CreateUserInput) {

    const email = input.emailAddress.toLowerCase();

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error("User already exists.");

    // Unique custom ID
    let customUserId: string;
    do {
        customUserId = generateUserId();
    } while (await prisma.user.findUnique({ where: { customUserId } }));

    const fileKey = `${customUserId}-${uuidv4()}.mp4`;

    await s3.send(
        new PutObjectCommand({
            Bucket: config.bucket,
            Key: fileKey,
            Body: input.videoBuffer,
            ContentType: input.mimeType,
        })
    );

    const publicUrl = `https://${config.bucket}.s3.${config.region}.amazonaws.com/${fileKey}`;

    const newUser = await prisma.user.create({
        data: {
            email,
            customUserId,
            fullName: input.fullName,
            phoneNumber: input.phoneNumber,
            story: input.story,
            danceVideo: publicUrl,
        },
    });

    // Emails
    const emailTemplate = RegisterTemplate({ name: input.fullName, paymentLink: LINK });
    await sendEmail({ to: email, subject: "Successful Registration", html: emailTemplate.html });

    await sendEmail({
        to: process.env.EMAIL_NOTIFICATION ?? "goldnueltalents@gmail.com",
        subject: "New Registration",
        html: `<p>${input.fullName} (${email}) just registered.</p>`,
    });

    return newUser;
}
