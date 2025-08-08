import React from 'react';
import useStorage from '@/utils/useStorage';
import PageLayout from '@/layout'; // 管理员布局
import UserLayout from '@/components/UserLayout'; // 普通用户布局

function RoleRouter() {
  const [role] = useStorage('userRole', 'admin');
  console.log('🚀 ~ RoleRouter ~ role:', role);

  // 根据角色判断显示哪个布局
  // 如果是管理员角色，显示原有的管理后台
  // 如果是普通用户角色，显示新的搜索界面
  if (role === 'admin') {
    return <PageLayout />;
  } else {
    return <UserLayout />;
  }
}

export default RoleRouter;
