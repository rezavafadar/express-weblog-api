import type { Request, Response } from "express";

const register = async (req: Request, res: Response) => {
  await res.json({ ok: true });
};

export default {
  register,
};
