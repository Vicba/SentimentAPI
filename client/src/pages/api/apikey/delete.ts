import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { options } from "../auth/options";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id = req.body.id as string;

    const session = await getServerSession(req, res, options);
    const user = session?.user;

    if (!user) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const apiKey = await prisma.apiKey.findUnique({
      where: {
        id: id,
      },
    });

    if (!apiKey) {
      return res.status(404).json({ message: "Not found" });
    }

    if (apiKey.userId !== user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await prisma.apiKey.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
}
