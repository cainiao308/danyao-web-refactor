import React from 'react';
import { Button, Typography, Badge, Space } from '@arco-design/web-react';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import { IconEye, IconEdit, IconDelete } from '@arco-design/web-react/icon';

const { Text } = Typography;

export interface AmmunitionRecord {
  id: string;
  name: string;
  abbreviation: string;
  caliber: number;
  weight: number;
  length: number;
  minRange: number;
  maxRange: number;
  accuracy: number;
  power: string;
  type: string;
  guidance: string;
  manufacturer: string;
  country: string;
  createdTime: string;
}

export const AmmunitionTypes = [
  '反坦克导弹',
  '空对空导弹',
  '空对地导弹',
  '地对空导弹',
  '地对地导弹',
  '巡航导弹',
  '火箭弹',
  '炮弹',
  '鱼雷',
  '深水炸弹',
];

export const GuidanceTypes = [
  '激光制导',
  '红外制导',
  '雷达制导',
  '卫星制导',
  '惯性制导',
  '电视制导',
  '线控制导',
  '无制导',
];

export const PowerLevels = ['低', '中', '高', '极高'];

const getPowerColor = (power: string) => {
  switch (power) {
    case '低':
      return 'green';
    case '中':
      return 'orange';
    case '高':
      return 'red';
    case '极高':
      return 'purple';
    default:
      return 'gray';
  }
};

export function getColumns(
  t: any,
  callback: (record: AmmunitionRecord, type: string) => Promise<void>
): ColumnProps[] {
  return [
    {
      title: t['ammunition.columns.name'],
      dataIndex: 'name',
      width: 180,
      fixed: 'left',
      render: value => <Text copyable>{value}</Text>,
    },
    {
      title: t['ammunition.columns.abbreviation'],
      dataIndex: 'abbreviation',
      width: 100,
    },
    {
      title: t['ammunition.columns.caliber'],
      dataIndex: 'caliber',
      width: 120,
      render: value => `${value}mm`,
      sorter: (a, b) => a.caliber - b.caliber,
    },
    {
      title: t['ammunition.columns.weight'],
      dataIndex: 'weight',
      width: 120,
      render: value => `${value}kg`,
      sorter: (a, b) => a.weight - b.weight,
    },
    {
      title: t['ammunition.columns.length'],
      dataIndex: 'length',
      width: 120,
      render: value => `${value}mm`,
      sorter: (a, b) => a.length - b.length,
    },
    {
      title: t['ammunition.columns.minRange'],
      dataIndex: 'minRange',
      width: 130,
      render: value => `${value}km`,
      sorter: (a, b) => a.minRange - b.minRange,
    },
    {
      title: t['ammunition.columns.maxRange'],
      dataIndex: 'maxRange',
      width: 130,
      render: value => `${value}km`,
      sorter: (a, b) => a.maxRange - b.maxRange,
    },
    {
      title: t['ammunition.columns.accuracy'],
      dataIndex: 'accuracy',
      width: 120,
      render: value => `±${value}m`,
      sorter: (a, b) => a.accuracy - b.accuracy,
    },
    {
      title: t['ammunition.columns.power'],
      dataIndex: 'power',
      width: 100,
      render: value => <Badge color={getPowerColor(value)} text={value} />,
    },
    {
      title: t['ammunition.columns.type'],
      dataIndex: 'type',
      width: 140,
      // filterDropdown: true,
      filters: AmmunitionTypes.map(type => ({ text: type, value: type })),
      onFilter: (value, record) => record.type === value,
    },
    {
      title: t['ammunition.columns.guidance'],
      dataIndex: 'guidance',
      width: 140,
    },
    {
      title: t['ammunition.columns.manufacturer'],
      dataIndex: 'manufacturer',
      width: 180,
      ellipsis: true,
    },
    {
      title: t['ammunition.columns.country'],
      dataIndex: 'country',
      width: 120,
    },
    {
      title: t['ammunition.columns.operations'],
      dataIndex: 'operations',
      fixed: 'right',
      width: 180,
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            size="small"
            icon={<IconEye />}
            onClick={() => callback(record, 'view')}
          >
            {t['ammunition.operations.view']}
          </Button>
          <Button
            type="text"
            size="small"
            icon={<IconEdit />}
            onClick={() => callback(record, 'edit')}
          >
            {t['ammunition.operations.edit']}
          </Button>
          <Button
            type="text"
            size="small"
            icon={<IconDelete />}
            status="danger"
            onClick={() => callback(record, 'delete')}
          >
            {t['ammunition.operations.delete']}
          </Button>
        </Space>
      ),
    },
  ];
}
