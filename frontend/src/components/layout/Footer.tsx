'use client';

import { Box, Container, Typography, Link as MuiLink, Grid, Divider } from '@mui/material';
import Link from 'next/link';
import { mainRoutes } from '@/utils/routes';
export default function Footer() {
  // 使用常量年份而不是动态生成，避免客户端和服务器端不一致
  const currentYear = 2025;
  
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              关于我们
            </Typography>
            <Typography variant="body2" color="text.secondary">
              我们是一个使用Next.js、React和MUI构建的现代化Web应用程序，致力于提供最佳用户体验。
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              快速链接
            </Typography>
            <Typography variant="body2" component="div">
              {mainRoutes.map((route) => (
                <MuiLink key={route.text} component={Link} href={route.href} color="inherit" display="block" sx={{ mb: 1 }}>
                  {route.text}
                </MuiLink>
              ))}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              联系我们
            </Typography>
            <Typography variant="body2" color="text.secondary">
              邮箱: contact@example.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              电话: +123 456 7890
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {currentYear}
          {' '}
          <MuiLink color="inherit" href="/">
            Next.js应用
          </MuiLink>
          {'. 保留所有权利。'}
        </Typography>
      </Container>
    </Box>
  );
}