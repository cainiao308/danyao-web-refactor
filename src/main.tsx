import { ConfigProvider } from '@arco-design/web-react';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import RoleRouter from './components/RoleRouter';
import { GlobalContext } from './context';
import './mock';
import Login from './pages/login';
import rootReducer from './store';
import './style/global.less';
import changeTheme from './utils/changeTheme';
import useStorage from './utils/useStorage';

const store = createStore(rootReducer);

function Index() {
  const [theme, setTheme] = useStorage('arco-theme', 'light');

  // function fetchUserInfo() {
  //   store.dispatch({
  //     type: 'update-userInfo',
  //     payload: { userLoading: true },
  //   });
  //   axios.get('/api/user/userInfo').then(res => {
  //     store.dispatch({
  //       type: 'update-userInfo',
  //       payload: { userInfo: res.data, userLoading: false },
  //     });
  //   });
  // }

  // useEffect(() => {
  //   if (checkLogin()) {
  //     fetchUserInfo();
  //   } else if (window.location.pathname.replace(/\//g, '') !== 'login') {
  //     window.location.pathname = '/login';
  //   }
  // }, []);

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  const contextValue = {
    theme,
    setTheme,
  };

  return (
    <BrowserRouter>
      <ConfigProvider
        locale={zhCN}
        componentConfig={{
          Card: {
            bordered: false,
          },
          List: {
            bordered: false,
          },
          Table: {
            border: false,
          },
        }}
      >
        <Provider store={store}>
          <GlobalContext.Provider value={contextValue}>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" component={RoleRouter} />
            </Switch>
          </GlobalContext.Provider>
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));
