import { db } from './index';
import { usersSQL, postsSQL } from './schema';

/**
 * 初始化数据库表结构
 */
async function initDatabase() {
  try {
    console.log('开始初始化数据库...');
    
    // 创建用户表
    await db.query(usersSQL.createTable);
    console.log('用户表创建成功');
    
    // 创建文章表
    await db.query(postsSQL.createTable);
    console.log('文章表创建成功');
    
    console.log('数据库初始化完成！');
  } catch (error) {
    console.error('数据库初始化失败:', error);
    throw error;
  }
}

// 如果直接运行此文件，则执行初始化
if (require.main === module) {
  initDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export default initDatabase;