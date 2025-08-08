import React from 'react';
import { Space, Tag, Typography } from '@arco-design/web-react';
import { SearchColumn } from '@/components/UniversalSearch';

const { Text } = Typography;

// 火炮数据
export const artilleryData = [
  {
    id: 1,
    name: 'PLZ-05自行榴弹炮',
    caliber: 155,
    type: '自行榴弹炮',
    mobility: '履带式',
    muzzleVelocity: 930,
    range: 50,
    barrelLength: 8.1,
    elevationRange: '-5°~+70°',
    traverseRange: '360°',
    manufacturer: '中国北方工业公司',
    country: '中国',
  },
  {
    id: 2,
    name: 'M777超轻型榴弹炮',
    caliber: 155,
    type: '牵引榴弹炮',
    mobility: '牵引式',
    muzzleVelocity: 827,
    range: 40,
    barrelLength: 6.4,
    elevationRange: '-5°~+70°',
    traverseRange: '±25°',
    manufacturer: 'BAE系统',
    country: '美国',
  },
  {
    id: 3,
    name: 'PzH 2000自行榴弹炮',
    caliber: 155,
    type: '自行榴弹炮',
    mobility: '履带式',
    muzzleVelocity: 940,
    range: 56,
    barrelLength: 8.1,
    elevationRange: '-2.5°~+65°',
    traverseRange: '360°',
    manufacturer: '克劳斯-玛菲',
    country: '德国',
  },
  {
    id: 4,
    name: 'CAESAR自行榴弹炮',
    caliber: 155,
    type: '自行榴弹炮',
    mobility: '轮式',
    muzzleVelocity: 810,
    range: 42,
    barrelLength: 6.5,
    elevationRange: '-5°~+66°',
    traverseRange: '±30°',
    manufacturer: '奈克斯特',
    country: '法国',
  },
  {
    id: 5,
    name: 'K9雷鸣自行榴弹炮',
    caliber: 155,
    type: '自行榴弹炮',
    mobility: '履带式',
    muzzleVelocity: 915,
    range: 40,
    barrelLength: 8.1,
    elevationRange: '-3°~+65°',
    traverseRange: '360°',
    manufacturer: '韩华系统',
    country: '韩国',
  },
  {
    id: 6,
    name: '2S19姆斯塔河自行榴弹炮',
    caliber: 152,
    type: '自行榴弹炮',
    mobility: '履带式',
    muzzleVelocity: 810,
    range: 25,
    barrelLength: 6.1,
    elevationRange: '-4°~+68°',
    traverseRange: '360°',
    manufacturer: '乌拉尔机车厂',
    country: '俄罗斯',
  },
  {
    id: 7,
    name: 'M109帕拉丁自行榴弹炮',
    caliber: 155,
    type: '自行榴弹炮',
    mobility: '履带式',
    muzzleVelocity: 684,
    range: 30,
    barrelLength: 6.1,
    elevationRange: '-3°~+75°',
    traverseRange: '360°',
    manufacturer: 'BAE系统',
    country: '美国',
  },
];

// 获取类型颜色
const getTypeColor = (type: string) => {
  switch (type) {
    case '自行榴弹炮':
      return 'blue';
    case '牵引榴弹炮':
      return 'green';
    case '火箭炮':
      return 'red';
    default:
      return 'gray';
  }
};

// 获取运动方式颜色
const getMobilityColor = (mobility: string) => {
  switch (mobility) {
    case '履带式':
      return 'orange';
    case '轮式':
      return 'purple';
    case '牵引式':
      return 'cyan';
    default:
      return 'gray';
  }
};

// 火炮检索列配置
export const artilleryColumns: SearchColumn[] = [
  {
    title: '火炮名称',
    dataIndex: 'name',
    width: 200,
    render: value => <Text strong>{value}</Text>,
  },
  {
    title: '口径',
    dataIndex: 'caliber',
    width: 80,
    render: value => `${value}mm`,
    sorter: (a, b) => a.caliber - b.caliber,
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: 120,
    render: value => <Tag color={getTypeColor(value)}>{value}</Tag>,
  },
  {
    title: '运动方式',
    dataIndex: 'mobility',
    width: 100,
    render: value => <Tag color={getMobilityColor(value)}>{value}</Tag>,
  },
  {
    title: '初速',
    dataIndex: 'muzzleVelocity',
    width: 100,
    render: value => `${value}m/s`,
    sorter: (a, b) => a.muzzleVelocity - b.muzzleVelocity,
  },
  {
    title: '射程',
    dataIndex: 'range',
    width: 80,
    render: value => `${value}km`,
    sorter: (a, b) => a.range - b.range,
  },
  {
    title: '身管长度',
    dataIndex: 'barrelLength',
    width: 100,
    render: value => `${value}m`,
    sorter: (a, b) => a.barrelLength - b.barrelLength,
  },
  {
    title: '厂商',
    dataIndex: 'manufacturer',
    width: 160,
    ellipsis: true,
  },
  {
    title: '国家',
    dataIndex: 'country',
    width: 80,
    render: value => <Tag color="orange">{value}</Tag>,
  },
];

// 搜索字段配置
export const artillerySearchFields = ['name', 'type', 'mobility', 'manufacturer', 'country'];

// 搜索建议
export const artillerySuggestions = [
  '自行榴弹炮',
  '牵引榴弹炮',
  '履带式',
  '轮式',
  '155mm',
  '152mm',
  '中国',
  '美国',
  '德国',
  'PLZ-05',
  'M777',
  'PzH 2000',
  'CAESAR',
];
