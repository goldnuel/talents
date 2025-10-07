import { S3Client } from "@aws-sdk/client-s3";

//Configs
import { BUCKET_NAME, BUCKET_REGION, ACCESS_KEY, SECRET_ACCESS_KEY } from "../config.ts";

export const config = {
    bucket: BUCKET_NAME,
    region: BUCKET_REGION,
};

export const s3 = new S3Client({
    region: config.region,
    credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
    },
});
