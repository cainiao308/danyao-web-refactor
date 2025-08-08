import React from 'react';
import { Switch, Route, useHistory, useLocation, Redirect } from 'react-router-dom';
import { Layout, Menu } from '@arco-design/web-react';
import CountrySearch from '../../pages/user/country-search/index';
import AmmunitionSearch from '../../pages/user/ammunition-search/index';
import ArtillerySearch from '../../pages/user/artillery-search/index';
import ProductCompare from '../../pages/user/product-compare/index';
import AIChat from '../../pages/user/ai-chat/index';
import Home from '../../pages/user/home/index';
import styles from './style/index.module.less';
import Navbar from '../NavBar';
import cs from 'classnames';

const { Content } = Layout;

const MenuItem = Menu.Item;

function UserLayout() {
  const history = useHistory();
  const location = useLocation();

  // 根据当前路径确定选中的菜单项
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.includes('country-search')) return '1';
    if (path.includes('ammunition-search')) return '2';
    if (path.includes('artillery-search')) return '3';
    if (path.includes('product-compare')) return '4';
    if (path.includes('ai-chat')) return '5';
    if (path === '/user/home' || path === '/user' || path === '/user/') return '0';
    return '0'; // 默认首页
  };

  const handleMenuClick = (key: string) => {
    switch (key) {
      case '0':
        history.push('/user/home');
        break;
      case '1':
        history.push('/user/country-search');
        break;
      case '2':
        history.push('/user/ammunition-search');
        break;
      case '3':
        history.push('/user/artillery-search');
        break;
      case '4':
        history.push('/user/product-compare');
        break;
      case '5':
        history.push('/user/ai-chat');
        break;
      default:
        break;
    }
  };

  // 用户界面的自定义菜单组件
  const UserMenus = () => (
    <>
      <div style={{ width: '800px', position: 'relative' }}>
        <Menu
          mode="horizontal"
          selectedKeys={[getSelectedKey()]}
          onClickMenuItem={handleMenuClick}
          style={{ height: '60px', position: 'absolute', top: -15, width: '100%' }}
        >
          <MenuItem key="0">首页</MenuItem>
          <MenuItem key="1">国家检索</MenuItem>
          <MenuItem key="2">弹药检索</MenuItem>
          <MenuItem key="3">火炮检索</MenuItem>
          <MenuItem key="4">产品对比</MenuItem>
          <MenuItem key="5">AI问答</MenuItem>
        </Menu>
      </div>
    </>
  );

  return (
    <Layout className={styles.layout}>
      <div
        className={cs(styles['layout-navbar'], {
          [styles['layout-navbar-hidden']]: false,
        })}
      >
        <Navbar show={true} Menus={UserMenus} />
      </div>
      <Layout>
        <Layout className={styles['layout-content']} style={{ paddingTop: '60px' }}>
          <Content className={styles.content}>
            <Switch>
              <Route exact path="/user/home" component={Home} />
              <Route exact path="/user/country-search" component={CountrySearch} />
              <Route exact path="/user/ammunition-search" component={AmmunitionSearch} />
              <Route exact path="/user/artillery-search" component={ArtillerySearch} />
              <Route exact path="/user/product-compare" component={ProductCompare} />
              <Route exact path="/user/ai-chat" component={AIChat} />
              <Route exact path="/user">
                <Redirect to="/user/home" />
              </Route>
              <Route path="/user">
                <Redirect to="/user/home" />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default UserLayout;
