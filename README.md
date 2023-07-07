# 介绍

---

这是我的毕设项目--基于 springboot 下的个人博客系统

# 选用技术

## 前端技术

- react 18.x
- react-redux
- @reduxjs/toolkit
- react-router-dom 6.x
- react-icons
- for-editor
- react-toastify
- semantic-ui-react
- slick-carousel
- validator

# 项目目录结构

```
blog-ui
├─ .gitignore
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  └─ index.html
├─ README.md
└─ src
   ├─ api
   │  ├─ article.js
   │  └─ data
   │     └─ category.js
   ├─ App.js
   ├─ assets
   │  ├─ icons
   │  └─ images
   │     ├─ a.png
   │     ├─ blog.png
   │     ├─ error.jpg
   │     ├─ o.jpg
   │     ├─ sky.jpg
   │     └─ Upload.png
   ├─ components
   │  ├─ Card
   │  │  ├─ card.module.css
   │  │  └─ index.jsx
   │  ├─ Category
   │  │  ├─ category.module.css
   │  │  └─ index.jsx
   │  ├─ Dropdown
   │  │  ├─ dropdown.module.css
   │  │  └─ index.jsx
   │  ├─ Footer
   │  │  ├─ footer.module.css
   │  │  └─ index.jsx
   │  ├─ Header
   │  │  ├─ header.module.css
   │  │  └─ index.jsx
   │  ├─ Logo
   │  │  └─ index.jsx
   │  ├─ Nav
   │  │  ├─ index.jsx
   │  │  ├─ nav.js
   │  │  └─ nav.module.css
   │  ├─ NoAuth
   │  │  └─ index.jsx
   │  ├─ NoData
   │  │  └─ index.jsx
   │  ├─ Profile
   │  │  ├─ index.jsx
   │  │  └─ profile.module.css
   │  ├─ Progress
   │  │  ├─ index.jsx
   │  │  └─ progress.module.css
   │  ├─ Table
   │  │  ├─ index.jsx
   │  │  └─ table.module.css
   │  └─ UploadFile
   │     ├─ index.jsx
   │     └─ uploadFile.module.css
   ├─ constants
   │  ├─ common
   │  │  ├─ cdnConstants.js
   │  │  ├─ index.js
   │  │  ├─ responseCodeConstants.js
   │  │  └─ systemConstans.js
   │  └─ index.js
   ├─ context
   │  └─ userContext.js
   ├─ hooks
   │  ├─ api
   │  │  ├─ index.js
   │  │  └─ useLogs.js
   │  ├─ content
   │  │  ├─ index.js
   │  │  ├─ useFetch.js
   │  │  ├─ useInput.js
   │  │  └─ usePageQuery.js
   │  └─ index.js
   ├─ index.js
   ├─ router
   │  ├─ index.js
   │  ├─ otherBoundary.jsx
   │  └─ rootBoundary.jsx
   ├─ setupProxy.js
   ├─ store
   │  ├─ reducer
   │  │  └─ index.js
   │  └─ slice
   │     ├─ auth.js
   │     ├─ category.js
   │     ├─ index.js
   │     └─ message.js
   ├─ style
   │  └─ index.css
   ├─ utils
   │  ├─ cache
   │  │  ├─ index.js
   │  │  ├─ localStorage.js
   │  │  └─ sessionStorage.js
   │  ├─ common
   │  │  ├─ common.js
   │  │  ├─ index.js
   │  │  ├─ page.js
   │  │  └─ validator.js
   │  └─ index.js
   └─ views
      ├─ About
      │  ├─ about.module.css
      │  └─ index.jsx
      ├─ Account
      │  ├─ account.module.css
      │  └─ index.jsx
      ├─ Archives
      │  └─ index.jsx
      ├─ Article
      │  └─ index.jsx
      ├─ Category
      │  ├─ category.module.css
      │  └─ index.jsx
      ├─ Create
      │  ├─ create.module.css
      │  └─ index.jsx
      ├─ Detail
      │  ├─ detail.module.css
      │  └─ index.jsx
      ├─ Error
      │  └─ 404.jsx
      ├─ ForgetPassword
      │  ├─ forgetPassword.module.css
      │  ├─ index.jsx
      │  ├─ newPassword.jsx
      │  └─ verify.jsx
      ├─ Home
      │  ├─ home.module.css
      │  └─ index.jsx
      ├─ Login
      │  ├─ index.jsx
      │  └─ login.module.css
      ├─ NewPost
      │  └─ index.jsx
      ├─ Register
      │  ├─ index.jsx
      │  └─ register.module.css
      ├─ sysOpLogs
      │  └─ index.jsx
      └─ Tag
         ├─ index.jsx
         └─ tag.module.css

```

# 功能模块

- 注册
- 登录
- 修改密码
  - 修改密码需要系统存在账户
- 文章增删改查模块
- 热门文章模块（利用 redis 的 lua 表达式来定时更新浏览量）
- 文章分类模块
- 文章标签模块
- 系统日志模块
- 个人信息展示
- 关于我
  ...

# 待改善

- 将接口调用全部替换为 hooks 函数
- 加入文章评论功能
- 优化页面加载速度
- 提取部分内容作为组件
- ...
