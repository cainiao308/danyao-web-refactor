import React from 'react';
import { Space, Tag, Typography } from '@arco-design/web-react';
import { SearchColumn } from '@/components/UniversalSearch';

const { Text } = Typography;

// 弹药数据
export const ammunitionData = [
  {
    id: 1,
    name: '红箭-12反坦克导弹',
    abbreviation: 'HJ-12',
    caliber: 120,
    type: '反坦克导弹',
    weight: 22,
    length: 1200,
    minRange: 0.3,
    maxRange: 8,
    accuracy: 5,
    power: '高',
    guidance: '激光制导',
    manufacturer: '中国兵器工业集团',
    country: '中国',
  },
  {
    id: 2,
    name: 'AGM-114地狱火导弹',
    abbreviation: 'Hellfire',
    caliber: 178,
    type: '空对地导弹',
    weight: 45,
    length: 1625,
    minRange: 0.5,
    maxRange: 11,
    accuracy: 3,
    power: '高',
    guidance: '激光制导',
    manufacturer: '洛克希德·马丁',
    country: '美国',
  },
  {
    id: 3,
    name: 'AIM-120先进中程空对空导弹',
    abbreviation: 'AMRAAM',
    caliber: 178,
    type: '空对空导弹',
    weight: 161,
    length: 3650,
    minRange: 1,
    maxRange: 180,
    accuracy: 10,
    power: '中',
    guidance: '雷达制导',
    manufacturer: '雷神公司',
    country: '美国',
  },
  {
    id: 4,
    name: '飞鱼反舰导弹',
    abbreviation: 'Exocet',
    caliber: 350,
    type: '反舰导弹',
    weight: 670,
    length: 4700,
    minRange: 5,
    maxRange: 180,
    accuracy: 15,
    power: '极高',
    guidance: '惯性+雷达制导',
    manufacturer: 'MBDA',
    country: '法国',
  },
  {
    id: 5,
    name: 'RPG-7火箭推进榴弹',
    abbreviation: 'RPG-7',
    caliber: 85,
    type: '火箭弹',
    weight: 6.3,
    length: 950,
    minRange: 0.05,
    maxRange: 0.5,
    accuracy: 50,
    power: '中',
    guidance: '无制导',
    manufacturer: '俄罗斯战术导弹公司',
    country: '俄罗斯',
  },
  {
    id: 6,
    name: '标枪反坦克导弹',
    abbreviation: 'Javelin',
    caliber: 127,
    type: '反坦克导弹',
    weight: 22.8,
    length: 1080,
    minRange: 0.15,
    maxRange: 4.75,
    accuracy: 5,
    power: '高',
    guidance: '红外制导',
    manufacturer: '雷神公司',
    country: '美国',
  },
];

// 弹药检索列配置
export const ammunitionColumns: SearchColumn[] = [
  {
    title: '弹药名称',
    dataIndex: 'name',
    width: 200,
    render: (value, record: any) => (
      <Space direction="vertical" size="mini">
        <Text bold>{value}</Text>
        <Text type="secondary" style={{ fontSize: '12px' }}>
          {record.abbreviation}
        </Text>
      </Space>
    ),
  },
  {
    title: '口径',
    dataIndex: 'caliber',
    width: 80,
    render: value => `${value}mm`,
    sorter: (a: any, b: any) => a.caliber - b.caliber,
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: 120,
    render: value => <Tag color="blue">{value}</Tag>,
  },
  {
    title: '重量',
    dataIndex: 'weight',
    width: 80,
    render: value => `${value}kg`,
    sorter: (a: any, b: any) => a.weight - b.weight,
  },
  {
    title: '射程',
    dataIndex: 'maxRange',
    width: 100,
    render: (value, record: any) => `${record.minRange}-${value}km`,
    sorter: (a: any, b: any) => a.maxRange - b.maxRange,
  },
  {
    title: '制导方式',
    dataIndex: 'guidance',
    width: 140,
  },
  {
    title: '厂商',
    dataIndex: 'manufacturer',
    width: 180,
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
export const ammunitionSearchFields = [
  'name',
  'abbreviation',
  'type',
  'guidance',
  'manufacturer',
  'country',
];

// 搜索建议
export const ammunitionSuggestions = [
  '反坦克导弹',
  '空对空导弹',
  '巡航导弹',
  '火箭弹',
  '激光制导',
  '雷达制导',
  '红外制导',
  '中国',
  '美国',
  '俄罗斯',
  '法国',
  '洛克希德·马丁',
  '雷神公司',
  'MBDA',
];
