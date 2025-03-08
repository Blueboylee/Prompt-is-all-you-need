import { Pool } from 'pg';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

// 获取数据库连接URL
const databaseUrl = process.env.NEON_DATABASE_URL;

if (!databaseUrl) {
  throw new Error('数据库连接URL未设置，请检查.env文件');
}

// 创建PostgreSQL连接池
const pool = new Pool({
  connectionString: databaseUrl,
});

// 导出数据库连接池以便在其他地方使用
export const db = {
  query: (text: string, params?:unknown[]) => pool.query(text, params),
  // 添加一个方法用于事务处理
  getClient: async () => {
    const client = await pool.connect();
    return client;
  },
};