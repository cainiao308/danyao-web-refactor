import React from 'react';
import { Space, Tag, Typography } from '@arco-design/web-react';
import { SearchColumn } from '@/components/UniversalSearch';

const { Text } = Typography;

// 国家数据
export const countryData = [
  {
    id: 1,
    name: '中国',
    nameEn: 'China',
    region: '亚洲',
    products: ['红箭-12导弹', 'PLZ-05自行榴弹炮', '东风系列导弹'],
    manufacturers: ['中国兵器工业集团', '中国航天科技集团'],
  },
  {
    id: 2,
    name: '美国',
    nameEn: 'United States',
    region: '北美洲',
    products: ['地狱火导弹', 'M777榴弹炮', '战斧巡航导弹'],
    manufacturers: ['洛克希德·马丁', '雷神公司', '通用动力'],
  },
  {
    id: 3,
    name: '俄罗斯',
    nameEn: 'Russia',
    region: '欧洲',
    products: ['伊斯坎德尔导弹', '姆斯塔河榴弹炮', 'S-400防空系统'],
    manufacturers: ['俄罗斯战术导弹公司', '乌拉尔机车厂'],
  },
  {
    id: 4,
    name: '德国',
    nameEn: 'Germany',
    region: '欧洲',
    products: ['PzH 2000自行榴弹炮', '豹2坦克', 'IRIS-T导弹'],
    manufacturers: ['莱茵金属', '克劳斯-玛菲'],
  },
  {
    id: 5,
    name: '法国',
    nameEn: 'France',
    region: '欧洲',
    products: ['CAESAR自行榴弹炮', '飞鱼导弹', 'MICA导弹'],
    manufacturers: ['奈克斯特', 'MBDA'],
  },
  {
    id: 6,
    name: '英国',
    nameEn: 'United Kingdom',
    region: '欧洲',
    products: ['挑战者2坦克', '海标枪导弹', '暴风战斗机'],
    manufacturers: ['BAE系统', '劳斯莱斯'],
  },
  {
    id: 7,
    name: '以色列',
    nameEn: 'Israel',
    region: '亚洲',
    products: ['铁穹防空系统', '梅卡瓦坦克', '长钉导弹'],
    manufacturers: ['拉斐尔', '以色列航空工业'],
  },
  {
    id: 8,
    name: '韩国',
    nameEn: 'South Korea',
    region: '亚洲',
    products: ['K9雷鸣自行榴弹炮', 'K2黑豹坦克', '玄武导弹'],
    manufacturers: ['韩华系统', '现代重工'],
  },
];

// 国家检索列配置
export const countryColumns: SearchColumn[] = [
  {
    title: '国家',
    dataIndex: 'name',
    width: 120,
    render: (value, record) => (
      <Space>
        <Text strong>{value}</Text>
        <Text type="secondary">({record.nameEn})</Text>
      </Space>
    ),
  },
  {
    title: '地区',
    dataIndex: 'region',
    width: 100,
    render: value => <Tag color="orange">{value}</Tag>,
  },
  {
    title: '主要产品',
    dataIndex: 'products',
    render: products => (
      <Space wrap>
        {products.slice(0, 3).map((product, index) => (
          <Tag key={index} color="blue" size="small">
            {product}
          </Tag>
        ))}
        {products.length > 3 && <Text type="secondary">+{products.length - 3}个</Text>}
      </Space>
    ),
  },
  {
    title: '主要厂商',
    dataIndex: 'manufacturers',
    render: manufacturers => (
      <Space direction="vertical" size="mini">
        {manufacturers.slice(0, 2).map((manufacturer, index) => (
          <Text key={index} type="secondary" style={{ fontSize: '12px' }}>
            {manufacturer}
          </Text>
        ))}
        {manufacturers.length > 2 && <Text type="secondary">+{manufacturers.length - 2}个</Text>}
      </Space>
    ),
  },
];

// 搜索字段配置
export const countrySearchFields = ['name', 'nameEn', 'region', 'products', 'manufacturers'];

// 搜索建议
export const countrySuggestions = [
  '中国',
  '美国',
  '俄罗斯',
  '德国',
  '法国',
  '英国',
  '亚洲',
  '欧洲',
  '北美洲',
  '导弹',
  '榴弹炮',
  '坦克',
  '防空系统',
];
