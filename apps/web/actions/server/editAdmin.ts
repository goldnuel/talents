"use server"

import bcrypt from 'bcrypt';
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

//Libs, Schemas, Utils
import { encryptPassword } from '@/utils/token.utils';

export default async function editAdmin(id: string, email: string, password: string, suspended: boolean, role: string) {

    try {

        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        //Encrypt the password
        const encryptedPassword = encryptPassword(password)

        await prisma.admin.update({
            where: {
                id
            },
            data: {
                email: email.toLowerCase(),
                hashedPassword: hashedPassword,
                encryptedPassword,
                suspended,
                role: role as "admin" | "super_admin"
            }
        });

        revalidatePath(`/admin/staff`)
        return { success: true, message: "The admin details was updated successfully." }

    } catch (error) {
        console.log('Error updating admin details', error)
        return { success: false, message: "Couldn't update admin details, kindly try again later." }
    }
}