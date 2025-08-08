import React from 'react';
import { Button, Typography, Badge, Space } from '@arco-design/web-react';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import { IconEye, IconEdit, IconDelete } from '@arco-design/web-react/icon';

const { Text } = Typography;

export interface ArtilleryRecord {
  id: string;
  name: string;
  caliber: number;
  type: string;
  mobility: string;
  muzzleVelocity: number;
  range: number;
  barrelLength: number;
  elevationRange: string;
  traverseRange: string;
  manufacturer: string;
  country: string;
  createdTime: string;
}

export const ArtilleryTypes = [
  '榴弹炮',
  '加农炮',
  '火箭炮',
  '迫击炮',
  '高射炮',
  '反坦克炮',
  '自行火炮',
  '牵引火炮',
  '海军舰炮',
  '坦克炮',
];

export const MobilityTypes = [
  '履带式',
  '轮式',
  '牵引式',
  '固定式',
  '铁路式',
  '舰载式',
  '自行式',
  '便携式',
];

const getTypeColor = (type: string) => {
  switch (type) {
    case '榴弹炮':
    case '自行火炮':
      return 'blue';
    case '加农炮':
    case '反坦克炮':
      return 'red';
    case '火箭炮':
      return 'orange';
    case '迫击炮':
      return 'green';
    case '高射炮':
      return 'purple';
    default:
      return 'gray';
  }
};

const getMobilityColor = (mobility: string) => {
  switch (mobility) {
    case '履带式':
    case '自行式':
      return 'blue';
    case '轮式':
      return 'green';
    case '牵引式':
      return 'orange';
    case '固定式':
      return 'gray';
    default:
      return 'cyan';
  }
};

export function getColumns(
  t: any,
  callback: (record: ArtilleryRecord, type: string) => Promise<void>
): ColumnProps[] {
  return [
    {
      title: t['artillery.columns.name'],
      dataIndex: 'name',
      width: 200,
      fixed: 'left',
      render: value => <Text copyable>{value}</Text>,
    },
    {
      title: t['artillery.columns.caliber'],
      dataIndex: 'caliber',
      width: 140,
      render: value => `${value}mm`,
      sorter: (a, b) => a.caliber - b.caliber,
    },
    {
      title: t['artillery.columns.type'],
      dataIndex: 'type',
      width: 120,
      render: value => <Badge color={getTypeColor(value)} text={value} />,
      filterDropdown: true,
      filters: ArtilleryTypes.map(type => ({ text: type, value: type })),
      onFilter: (value, record) => record.type === value,
    },
    {
      title: t['artillery.columns.mobility'],
      dataIndex: 'mobility',
      width: 120,
      render: value => <Badge color={getMobilityColor(value)} text={value} />,
    },
    {
      title: t['artillery.columns.muzzleVelocity'],
      dataIndex: 'muzzleVelocity',
      width: 150,
      render: value => `${value}m/s`,
      sorter: (a, b) => a.muzzleVelocity - b.muzzleVelocity,
    },
    {
      title: t['artillery.columns.range'],
      dataIndex: 'range',
      width: 140,
      render: value => `${value}km`,
      sorter: (a, b) => a.range - b.range,
    },
    {
      title: t['artillery.columns.barrelLength'],
      dataIndex: 'barrelLength',
      width: 140,
      render: value => `${value}m`,
      sorter: (a, b) => a.barrelLength - b.barrelLength,
    },
    {
      title: t['artillery.columns.elevationRange'],
      dataIndex: 'elevationRange',
      width: 140,
      ellipsis: true,
    },
    {
      title: t['artillery.columns.traverseRange'],
      dataIndex: 'traverseRange',
      width: 140,
      ellipsis: true,
    },
    {
      title: t['artillery.columns.manufacturer'],
      dataIndex: 'manufacturer',
      width: 180,
      ellipsis: true,
    },
    {
      title: t['artillery.columns.country'],
      dataIndex: 'country',
      width: 100,
    },
    {
      title: t['artillery.columns.operations'],
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
            {t['artillery.operations.view']}
          </Button>
          <Button
            type="text"
            size="small"
            icon={<IconEdit />}
            onClick={() => callback(record, 'edit')}
          >
            {t['artillery.operations.edit']}
          </Button>
          <Button
            type="text"
            size="small"
            icon={<IconDelete />}
            status="danger"
            onClick={() => callback(record, 'delete')}
          >
            {t['artillery.operations.delete']}
          </Button>
        </Space>
      ),
    },
  ];
}
