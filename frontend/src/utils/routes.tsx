import { ReactElement } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';

// 定义路由项的接口
export interface RouteItem {
  text: string;      // 显示的文本
  href: string;      // 路由路径
  icon: ReactElement; // 图标组件
}

// 主要路由配置
export const mainRoutes: RouteItem[] = [
  { text: '首页', href: '/', icon: <HomeIcon /> },
  { text: '仪表盘', href: '/dashboard', icon: <DashboardIcon /> },
  { text: '个人资料', href: '/profile', icon: <PersonIcon /> },
  { text: '关于', href: '/about', icon: <InfoIcon /> },
];
