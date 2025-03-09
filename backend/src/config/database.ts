import { neon } from '@neondatabase/serverless';
import pkg from 'pg';
const { Pool } = pkg;
import { config } from 'dotenv';

// 加载环境变量
config();

// 创建 Neon 数据库连接
const sql = neon(process.env.DATABASE_URL!);

// 创建兼容的数据库连接池
// 这样可以保持与现有代码的兼容性
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// 测试数据库连接
pool.on('connect', () => {
  console.log('数据库连接成功');
});

pool.on('error', (err) => {
  console.error('数据库连接错误:', err);
});

// 导出 pool 以保持与现有代码的兼容性
export default pool;
// 同时导出 sql 函数，可用于直接执行 SQL 查询
export { sql };