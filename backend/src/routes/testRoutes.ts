import express from 'express';
import TestController from '../controllers/testController.js';

const router = express.Router();
const testController = new TestController();

// 获取所有测试数据
router.get('/', testController.getAllTests);

// 创建新测试数据
router.post('/', testController.createTest);

export default router;