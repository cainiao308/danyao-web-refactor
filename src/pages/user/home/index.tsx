import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Grid, Typography, Space } from '@arco-design/web-react';
import { IconThunderbolt, IconRobot, IconBug } from '@arco-design/web-react/icon';
import SearchBox from '@/components/SearchBox';
import styles from './style/index.module.less';

const { Row, Col } = Grid;
const { Title, Text } = Typography;

interface QuickAccessCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
}

function HomePage() {
  const history = useHistory();

  const quickAccess: QuickAccessCard[] = [
    {
      title: '国家检索',
      description: '按国家查找军贸产品信息',
      icon: <IconThunderbolt />,
      path: '/user/country-search',
      color: '#165dff',
    },
    {
      title: '弹药检索',
      description: '搜索各类弹药产品详情',
      icon: <IconThunderbolt />,
      path: '/user/ammunition-search',
      color: '#f53f3f',
    },
    {
      title: '火炮检索',
      description: '查找火炮装备技术参数',
      icon: <IconBug />,
      path: '/user/artillery-search',
      color: '#ff7d00',
    },
    {
      title: '产品对比',
      description: '对比不同产品的性能指标',
      icon: <IconThunderbolt />,
      path: '/user/product-compare',
      color: '#00b42a',
    },
    {
      title: 'AI问答',
      description: '智能问答助手解答疑问',
      icon: <IconRobot />,
      path: '/user/ai-chat',
      color: '#722ed1',
    },
  ];

  const popularSearches = [
    '红箭-12反坦克导弹',
    'M777榴弹炮',
    '中国军贸产品',
    '155mm火炮',
    '精确制导弹药',
    '自行火炮',
    '反舰导弹',
    '防空导弹',
  ];

  const handleSearch = (value: string) => {
    // 根据搜索内容智能判断跳转到对应页面
    const lowerValue = value.toLowerCase();
    if (
      lowerValue.includes('导弹') ||
      lowerValue.includes('弹药') ||
      lowerValue.includes('missile')
    ) {
      history.push(`/user/ammunition-search?q=${encodeURIComponent(value)}`);
    } else if (
      lowerValue.includes('火炮') ||
      lowerValue.includes('炮') ||
      lowerValue.includes('artillery')
    ) {
      history.push(`/user/artillery-search?q=${encodeURIComponent(value)}`);
    } else if (lowerValue.includes('国家') || lowerValue.includes('country')) {
      history.push(`/user/country-search?q=${encodeURIComponent(value)}`);
    } else {
      // 默认跳转到弹药搜索
      history.push(`/user/ammunition-search?q=${encodeURIComponent(value)}`);
    }
  };

  const handleQuickAccessClick = (path: string) => {
    history.push(path);
  };

  return (
    <div className={styles.container}>
      {/* 主搜索区域 */}
      <SearchBox
        title="军贸产品智能搜索"
        placeholder="搜索弹药、火炮、国家等..."
        suggestions={popularSearches}
        onSearch={handleSearch}
        onSuggestionClick={handleSearch}
      />

      {/* 快速访问卡片 */}
      <div className={styles.quickAccess}>
        <div className={styles.sectionHeader}>
          <Title heading={4}>快速访问</Title>
          <Text type="secondary">选择下方功能模块快速开始</Text>
        </div>

        <Row gutter={24} className={styles.cardGrid}>
          {quickAccess.map((item, index) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={4} key={index}>
              <Card
                className={styles.quickCard}
                hoverable
                onClick={() => handleQuickAccessClick(item.path)}
              >
                <div className={styles.cardContent}>
                  <div className={styles.cardIcon} style={{ color: item.color }}>
                    {item.icon}
                  </div>
                  <Title heading={6} className={styles.cardTitle}>
                    {item.title}
                  </Title>
                  <Text type="secondary" className={styles.cardDescription}>
                    {item.description}
                  </Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* 热门搜索 */}
      <div className={styles.hotSearches}>
        <div className={styles.sectionHeader}>
          <Title heading={5}>热门搜索</Title>
        </div>
        <Space wrap className={styles.searchTags}>
          {popularSearches.map((search, index) => (
            <span key={index} className={styles.searchTag} onClick={() => handleSearch(search)}>
              {search}
            </span>
          ))}
        </Space>
      </div>
    </div>
  );
}

export default HomePage;
