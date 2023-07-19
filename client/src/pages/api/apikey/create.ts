import { nanoid } from "nanoid"
import prisma from "@/utils/prisma"
import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next"


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    try {
        const session = await getSession({ req }); 
        const user = session?.user;


        if (!user) {
            return res.status(403).json({ message: "Not authorized" })
        }

        const apikeys = await prisma.apiKey.findMany({
            where: { userId: user.id, enabled: true },
        })


        if(apikeys.length >= 3) {
            return res.status(403).json({ message: "You reached the limit amount of api keys" })
        }

        const createdApiKey = await prisma.apiKey.create({
            data: {
                userId: user.id,
                key: nanoid()
            }
        })

        return res.status(200).json({ message: "Api key created" , createdApiKey})
        
    }catch (error) {
        if(error instanceof Error){
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "Something went wrong" })
    }
}