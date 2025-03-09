import pool from '../config/database.js';
import { User, CreateUserDTO, UpdateUserDTO } from '../models/User.js';

/**
 * 用户服务类 - 处理与用户相关的数据库操作
 */
export default class UserService {
  /**
   * 获取所有用户
   */
  async getAllUsers(): Promise<User[]> {
    try {
      const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
      return result.rows;
    } catch (error) {
      console.error('获取所有用户失败:', error);
      throw new Error('获取用户列表失败');
    }
  }

  /**
   * 根据ID获取用户
   */
  async getUserById(id: number): Promise<User | null> {
    try {
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      return result.rows.length ? result.rows[0] : null;
    } catch (error) {
      console.error(`获取用户ID ${id} 失败:`, error);
      throw new Error('获取用户详情失败');
    }
  }

  /**
   * 根据邮箱获取用户
   */
  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      return result.rows.length ? result.rows[0] : null;
    } catch (error) {
      console.error(`获取邮箱为 ${email} 的用户失败:`, error);
      throw new Error('获取用户详情失败');
    }
  }

  /**
   * 创建新用户
   */
  async createUser(userData: CreateUserDTO): Promise<User> {
    try {
      const { username, email, password } = userData;
      const result = await pool.query(
        'INSERT INTO users (username, email, password, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *',
        [username, email, password] // 注意：实际应用中应该对密码进行哈希处理
      );
      return result.rows[0];
    } catch (error) {
      console.error('创建用户失败:', error);
      throw new Error('创建用户失败');
    }
  }

  /**
   * 更新用户信息
   */
  async updateUser(id: number, userData: UpdateUserDTO): Promise<User | null> {
    try {
      // 构建动态更新查询
      const updates: string[] = [];
      const values: any[] = [];
      let paramIndex = 1;

      // 遍历用户数据，构建更新字段
      Object.entries(userData).forEach(([key, value]) => {
        if (value !== undefined) {
          updates.push(`${key} = $${paramIndex}`);
          values.push(value);
          paramIndex++;
        }
      });

      // 如果没有要更新的字段，直接返回当前用户
      if (updates.length === 0) {
        return this.getUserById(id);
      }

      // 添加更新时间和ID参数
      updates.push(`updated_at = $${paramIndex}`);
      values.push(new Date());
      paramIndex++;
      values.push(id);

      // 执行更新查询
      const query = `
        UPDATE users 
        SET ${updates.join(', ')} 
        WHERE id = $${paramIndex - 1} 
        RETURNING *
      `;

      const result = await pool.query(query, values);
      return result.rows.length ? result.rows[0] : null;
    } catch (error) {
      console.error(`更新用户ID ${id} 失败:`, error);
      throw new Error('更新用户信息失败');
    }
  }

  /**
   * 删除用户
   */
  async deleteUser(id: number): Promise<boolean> {
    try {
      const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
      return result.rows.length > 0;
    } catch (error) {
      console.error(`删除用户ID ${id} 失败:`, error);
      throw new Error('删除用户失败');
    }
  }
}