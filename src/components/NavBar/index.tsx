import Logo from '@/assets/logo.svg';
import MessageBox from '@/components/MessageBox';
import { GlobalContext } from '@/context';
import { generatePermission } from '@/routes';
import { GlobalState } from '@/store';
import useLocale from '@/utils/useLocale';
import useStorage from '@/utils/useStorage';
import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  Input,
  Menu,
  Message,
  Tooltip,
} from '@arco-design/web-react';
import {
  IconDashboard,
  IconExperiment,
  IconInteraction,
  IconLoading,
  IconMoonFill,
  IconNotification,
  IconPoweroff,
  IconSettings,
  IconSunFill,
  IconTag,
  IconUser,
} from '@arco-design/web-react/icon';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Settings from '../Settings';
import IconButton from './IconButton';
import styles from './style/index.module.less';

function Navbar({ show, Menus }: { show: boolean; Menus?: any }) {
  const t = useLocale();
  const { userInfo, userLoading } = useSelector((state: GlobalState) => state);
  const dispatch = useDispatch();

  const [_, setUserStatus] = useStorage('userStatus');
  const [role, setRole] = useStorage('userRole', 'admin');

  const { theme, setTheme } = useContext(GlobalContext);

  function logout() {
    setUserStatus('logout');
    window.location.href = '/login';
  }

  function onMenuItemClick(key) {
    if (key === 'logout') {
      logout();
    } else {
      Message.info(`You clicked ${key}`);
    }
  }

  useEffect(() => {
    dispatch({
      type: 'update-userInfo',
      payload: {
        userInfo: {
          ...userInfo,
          permissions: generatePermission(role),
        },
      },
    });
  }, [role]);

  if (!show) {
    return (
      <div className={styles['fixed-settings']}>
        <Settings trigger={<Button icon={<IconSettings />} type="primary" size="large" />} />
      </div>
    );
  }

  const handleChangeRole = () => {
    const newRole = role === 'admin' ? 'user' : 'admin';
    setRole(newRole);
  };

  const droplist = (
    <Menu onClickMenuItem={onMenuItemClick}>
      <Menu.SubMenu
        key="role"
        title={
          <>
            <IconUser className={styles['dropdown-icon']} />
            <span className={styles['user-role']}>
              {role === 'admin' ? t['menu.user.role.admin'] : t['menu.user.role.user']}
            </span>
          </>
        }
      >
        <Menu.Item onClick={handleChangeRole} key="switch role">
          <IconTag className={styles['dropdown-icon']} />
          {t['menu.user.switchRoles']}
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="setting">
        <IconSettings className={styles['dropdown-icon']} />
        {t['menu.user.setting']}
      </Menu.Item>
      <Menu.SubMenu
        key="more"
        title={
          <div style={{ width: 80 }}>
            <IconExperiment className={styles['dropdown-icon']} />
            {t['message.seeMore']}
          </div>
        }
      >
        <Menu.Item key="workplace">
          <IconDashboard className={styles['dropdown-icon']} />
          {t['menu.dashboard.workplace']}
        </Menu.Item>
        <Menu.Item key="card list">
          <IconInteraction className={styles['dropdown-icon']} />
          {t['menu.list.cardList']}
        </Menu.Item>
      </Menu.SubMenu>

      <Divider style={{ margin: '4px 0' }} />
      <Menu.Item key="logout">
        <IconPoweroff className={styles['dropdown-icon']} />
        {t['navbar.logout']}
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Logo />
          <div className={styles['logo-name']}>军贸产品管理系统</div>
        </div>
      </div>
      <ul className={styles.right}>
        {Menus ? (
          <>
            <Menus />
            {userInfo && (
              <li>
                <Dropdown droplist={droplist} position="br" disabled={userLoading}>
                  <Avatar size={32} style={{ cursor: 'pointer' }}>
                    {userLoading ? <IconLoading /> : <img alt="avatar" src={userInfo.avatar} />}
                  </Avatar>
                </Dropdown>
              </li>
            )}
          </>
        ) : (
          <>
            <li>
              <Input.Search className={styles.round} placeholder={t['navbar.search.placeholder']} />
            </li>
            <li>
              <MessageBox>
                <IconButton icon={<IconNotification />} />
              </MessageBox>
            </li>
            <li>
              <Tooltip
                content={
                  theme === 'light'
                    ? t['settings.navbar.theme.toDark']
                    : t['settings.navbar.theme.toLight']
                }
              >
                <IconButton
                  icon={theme !== 'dark' ? <IconMoonFill /> : <IconSunFill />}
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                />
              </Tooltip>
            </li>
            <Settings />
            {userInfo && (
              <li>
                <Dropdown droplist={droplist} position="br" disabled={userLoading}>
                  <Avatar size={32} style={{ cursor: 'pointer' }}>
                    {userLoading ? <IconLoading /> : <img alt="avatar" src={userInfo.avatar} />}
                  </Avatar>
                </Dropdown>
              </li>
            )}
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
