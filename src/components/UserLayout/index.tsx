import React from 'react';
import { Switch, Route, useHistory, useLocation, Redirect } from 'react-router-dom';
import { Layout, Menu } from '@arco-design/web-react';
import CountrySearch from '../../pages/user/country-search/index';
import CountryDetail from '../../pages/user/country-detail/index';
import AmmunitionSearch from '../../pages/user/ammunition-search/index';
import ArtillerySearch from '../../pages/user/artillery-search/index';
import AmmunitionDetail from '../../pages/user/ammunition-detail/index';
import ArtilleryDetail from '../../pages/user/artillery-detail/index';
import ProductCompare from '../../pages/user/product-compare/index';
import AIChat from '../../pages/user/ai-chat/index';
import Documents from '../../pages/user/documents/index';
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

    // 详情页面时，对应的检索菜单项保持选中状态
    if (path.includes('country-detail')) return '1'; // 国家详情 -> 国家检索选中
    if (path.includes('ammunition-detail')) return '2'; // 弹药详情 -> 弹药检索选中
    if (path.includes('artillery-detail')) return '3'; // 火炮详情 -> 火炮检索选中

    // 检索页面
    if (path.includes('country-search')) return '1';
    if (path.includes('ammunition-search')) return '2';
    if (path.includes('artillery-search')) return '3';

    // 其他页面
    if (path.includes('documents')) return '4';
    if (path.includes('product-compare')) return '5';
    if (path.includes('ai-chat')) return '6';
    if (path === '/user/home' || path === '/user' || path === '/user/') return '0';

    return '0'; // 默认首页
  };

  const handleMenuClick = (key: string) => {
    switch (key) {
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
        history.push('/user/documents');
        break;
      case '5':
        history.push('/user/product-compare');
        break;
      case '6':
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
          <MenuItem key="1">国家检索</MenuItem>
          <MenuItem key="2">弹药检索</MenuItem>
          <MenuItem key="3">火炮检索</MenuItem>
          <MenuItem key="4">知识管理</MenuItem>
          <MenuItem key="5">产品对比</MenuItem>
          <MenuItem key="6">AI问答</MenuItem>
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
      <Content className={styles.content}>
        <Switch>
          <Route exact path="/user/country-search" component={CountrySearch} />
          <Route exact path="/user/country-detail/:id" component={CountryDetail} />
          <Route exact path="/user/ammunition-search" component={AmmunitionSearch} />
          <Route exact path="/user/artillery-search" component={ArtillerySearch} />
          <Route exact path="/user/documents" component={Documents} />
          <Route exact path="/user/ammunition-detail/:id" component={AmmunitionDetail} />
          <Route exact path="/user/artillery-detail/:id" component={ArtilleryDetail} />
          <Route exact path="/user/product-compare" component={ProductCompare} />
          <Route exact path="/user/ai-chat" component={AIChat} />
          <Route exact path="/user">
            <Redirect to="/user/country-search" />
          </Route>
          <Route path="/user">
            <Redirect to="/user/country-search" />
          </Route>
          <Route path="/">
            <Redirect to="/user/country-search" />
          </Route>
        </Switch>
      </Content>
    </Layout>
  );
}

export default UserLayout;
