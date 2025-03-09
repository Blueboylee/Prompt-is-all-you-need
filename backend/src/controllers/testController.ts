import { Request, Response, NextFunction } from 'express';
import TestService from '../services/testService.js';
import { testDb } from '../models/Test.js';

/**
 * 测试控制器 - 处理与测试相关的HTTP请求
 */
export default class TestController {
  private testService: TestService;

  constructor() {
    this.testService = new TestService();
  }

  /**
   * 获取所有测试数据
   */
  getAllTests = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tests = await this.testService.getAllTests();
      res.status(200).json({
        success: true,
        data: tests,
        count: tests.length
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * 创建新测试数据
   */
  createTest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const testData: testDb = req.body;

      // 简单验证
      if (!testData.name) {
        return res.status(400).json({
          success: false,
          error: '请提供测试名称'
        });
      }

      const newTest = await this.testService.createTest(testData);
      res.status(201).json({
        success: true,
        data: newTest
      });
    } catch (error) {
      next(error);
    }
  };
}