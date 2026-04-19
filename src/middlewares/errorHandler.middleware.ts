import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({error: err.message || 'Internal Server Error'});
}

export default errorHandler;