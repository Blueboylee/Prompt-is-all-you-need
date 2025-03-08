// 定义SQL语句常量，用于数据库操作

// 用户表相关SQL
export const usersSQL = {
  // 创建用户表
  createTable: `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `,
  // 查询所有用户
  findAll: 'SELECT * FROM users',
  // 通过ID查询用户
  findById: 'SELECT * FROM users WHERE id = $1',
  // 通过邮箱查询用户
  findByEmail: 'SELECT * FROM users WHERE email = $1',
  // 创建新用户
  create: 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
  // 更新用户
  update: 'UPDATE users SET name = $1, email = $2, password = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
  // 删除用户
  delete: 'DELETE FROM users WHERE id = $1'
};

// 文章表相关SQL
export const postsSQL = {
  // 创建文章表
  createTable: `
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      author_id INTEGER REFERENCES users(id),
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `,
  // 查询所有文章
  findAll: 'SELECT * FROM posts',
  // 通过ID查询文章
  findById: 'SELECT * FROM posts WHERE id = $1',
  // 查询用户的所有文章
  findByAuthor: 'SELECT * FROM posts WHERE author_id = $1',
  // 创建新文章
  create: 'INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING *',
  // 更新文章
  update: 'UPDATE posts SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
  // 删除文章
  delete: 'DELETE FROM posts WHERE id = $1'
};