import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// 加载环境变量
config();

// 创建Express应用
const app = express();

// 基础中间件
app.use(helmet()); // 安全中间件
app.use(cors()); // 跨域中间件
app.use(morgan('dev')); // 日志中间件
app.use(express.json()); // JSON解析中间件
app.use(express.urlencoded({ extended: true })); // URL编码解析中间件

// API路由
app.get('/', (req, res) => {
  res.json({ message: '欢迎访问API服务器', documentation: '/api/health' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 用户路由
app.use('/api/users', userRoutes);

// 404处理
app.use(notFound);

// 错误处理中间件
app.use(errorHandler);


export default app;