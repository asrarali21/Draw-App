import { Request, Response } from "express";
import { prisma } from "@draw-app/database";



export const signUp = async (req: Request, res: Response) => {
   const { email, username, password } = req.body as {
      email?: string;
      username?: string;
      password?: string;
   };

   if (!email || !username || !password) {
      return res.status(400).json({ error: "Missing fields" });
   }

   try {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
         return res.status(409).json({ error: "Email already in use" });
      }

      // TODO: hash password before saving in production
      const user = await prisma.user.create({
         data: { email, username, password },
         select: { id: true, email: true, username: true },
      });
      return res.status(201).json(user);
   } catch (err) {
      return res.status(500).json({ error: "Internal Server Error" });
   }
};

export default { signUp };