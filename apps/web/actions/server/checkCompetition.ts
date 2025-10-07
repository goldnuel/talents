"use server"

import { prisma } from "@/lib/prisma";


export default async function checkCompetition() {

    try {
        //Delete admin
        const activeCompetition = await prisma.competition.findFirst({
            where: {
                isAcceptingContestants: true
            },
        });

        if (!activeCompetition) {
            return { success: false }
        }

        return { success: true };

    } catch (error) {
        console.log('Error fetching active competition', error)
        return { success: false }
    }
}