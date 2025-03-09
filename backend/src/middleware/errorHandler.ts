import { Request, Response, NextFunction } from 'express';

/**
 * 全局错误处理中间件
 */
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('错误详情:', err);
  
  // 默认错误状态码和消息
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  const message = err.message || '服务器内部错误';
  
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }
  });
};

/**
 * 404错误处理中间件
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`找不到 - ${req.originalUrl}`);
  res.status(404);
  next(error);
};