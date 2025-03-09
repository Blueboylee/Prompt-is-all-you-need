import pool from '../config/database.js';
import { testDb } from '../models/Test.js';

/**
 * 测试服务类 - 处理与测试相关的数据库操作
 */
export default class TestService {
  /**
   * 获取所有测试数据
   */
  async getAllTests(): Promise<testDb[]> {
    try {
      const result = await pool.query('SELECT * FROM test_db');
      return result.rows;
    } catch (error) {
      console.error('获取所有测试数据失败:', error);
      throw new Error('获取测试数据列表失败');
    }
  }

  /**
   * 创建新测试数据 (POST请求)
   */
  async createTest(testData: testDb): Promise<testDb> {
    try {
      const { name, description } = testData;
      const result = await pool.query(
        'INSERT INTO test_db (name, description) VALUES ($1, $2) RETURNING *',
        [name, description]
      );
      return result.rows[0];
    } catch (error) {
      console.error('创建测试数据失败:', error);
      throw new Error('创建测试数据失败');
    }
  }
}