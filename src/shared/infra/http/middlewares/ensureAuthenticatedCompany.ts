import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticatedCompany (
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token não encontrado", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: company_id } = verify(token, 'desafioNode') as IPayload;

    request['company'] = {
      id: company_id,
    };

    next();
  } catch {
    throw new AppError("Token invalido", 401);
  }
}
