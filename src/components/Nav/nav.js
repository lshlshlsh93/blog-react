import { BiCategoryAlt, BiHomeAlt, BiCylinder } from 'react-icons/bi'
import { FiArchive, FiTag } from 'react-icons/fi'
import { AiFillFileAdd } from 'react-icons/ai'

export const navData = [
  {
    id: 1,
    icon: <BiHomeAlt />,
    title: '首页',
    path: '/home',
  },
  {
    id: 2,
    icon: <BiCategoryAlt />,
    title: '分类',
    path: '/category',
  },
  {
    id: 3,
    icon: <FiTag />,
    title: '标签',
    path: '/tag',
  },
  // {
  //   id: 4,
  //   icon: <FiArchive />,
  //   title: '归档',
  //   path: '/archives',
  // },
  {
    id: 5,
    icon: <BiCylinder />,
    title: '操作日志',
    path: '/sysOpLogs',
  },
  {
    id: 6,
    icon: <AiFillFileAdd />,
    title: '添加文章',
    path: '/create',
    state: { blog: null },
  },
]
