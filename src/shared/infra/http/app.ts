import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

import "@shared/container";

import "express-async-errors";
import { AppError } from "@shared/errors/AppError";
import "@shared/infra/typeorm";

import { router } from "./routes";


const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      console.log('entrou')
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
