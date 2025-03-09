import { Request, Response, NextFunction } from 'express';
import UserService from '../services/userService.js';
import { CreateUserDTO, UpdateUserDTO } from '../models/User.js';

/**
 * 用户控制器 - 处理与用户相关的HTTP请求
 */
export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * 获取所有用户
   */
  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json({
        success: true,
        data: users,
        count: users.length
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * 获取单个用户
   */
  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: '无效的用户ID'
        });
      }

      const user = await this.userService.getUserById(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: '用户不存在'
        });
      }

      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * 创建用户
   */
  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDTO = req.body;

      // 简单验证
      if (!userData.username || !userData.email || !userData.password) {
        return res.status(400).json({
          success: false,
          error: '请提供用户名、邮箱和密码'
        });
      }

      // 检查邮箱是否已存在
      const existingUser = await this.userService.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: '该邮箱已被注册'
        });
      }

      const newUser = await this.userService.createUser(userData);
      res.status(201).json({
        success: true,
        data: newUser
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * 更新用户
   */
  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: '无效的用户ID'
        });
      }

      const userData: UpdateUserDTO = req.body;
      const updatedUser = await this.userService.updateUser(id, userData);

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          error: '用户不存在'
        });
      }

      res.status(200).json({
        success: true,
        data: updatedUser
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * 删除用户
   */
  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: '无效的用户ID'
        });
      }

      const deleted = await this.userService.deleteUser(id);
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: '用户不存在'
        });
      }

      res.status(200).json({
        success: true,
        data: {}
      });
    } catch (error) {
      next(error);
    }
  };
}