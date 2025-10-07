"use server"

import { prisma } from "@/lib/prisma";

export default async function getContestant(customUserId: string) {

    try {

        const user = await prisma.user.findUnique({
            where: {
                customUserId
            }
        })
        return { success: true, user }


    } catch (error) {
        console.log("Error fetching user:", error);
        return { success: false, user: null }
    }
}