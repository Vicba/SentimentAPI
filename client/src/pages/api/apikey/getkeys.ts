import prisma from "@/utils/prisma";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });
    const user = session?.user;

    if (!user) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const apikeys = await prisma.apiKey.findMany({
      where: { userId: user.id, enabled: true },
    });

    return res.status(200).json(apikeys);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
}
