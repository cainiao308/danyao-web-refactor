import React from 'react';
import { Button, Badge, Space, Tag } from '@arco-design/web-react';
import { IconEye, IconDownload } from '@arco-design/web-react/icon';

export interface DocumentRecord {
  id: string;
  name: string;
  format: string;
  type: string;
  researchType: string;
  tags: string[];
  uploader: string;
  uploadTime: string;
  status: string;
  fileSize?: string;
}

export const DocumentFormats = ['PDF', 'DOCX'];

export const DocumentTypes = [
  '技术文档',
  '研究报告',
  '产品手册',
  '工艺文件',
  '质量标准',
  '测试报告',
  '培训材料',
  '其他',
];

export const ResearchTypes = [
  '基础研究',
  '应用研究',
  '技术开发',
  '产品设计',
  '工艺改进',
  '质量控制',
  '其他',
];

export const DocumentStatuses = ['草稿', '审核中', '已发布', '已归档', '已过期'];

const getStatusColor = (status: string) => {
  switch (status) {
    case '草稿':
      return 'gray';
    case '审核中':
      return 'orange';
    case '已发布':
      return 'green';
    case '已归档':
      return 'blue';
    case '已过期':
      return 'red';
    default:
      return 'gray';
  }
};

const getFormatColor = (format: string) => {
  switch (format) {
    case 'PDF':
      return 'red';
    case 'DOC':
    case 'DOCX':
      return 'blue';
    case 'XLS':
    case 'XLSX':
      return 'green';
    case 'PPT':
    case 'PPTX':
      return 'orange';
    default:
      return 'gray';
  }
};

export const getColumns = (
  t: any,
  tableCallback: (record: DocumentRecord, type: string) => void
) => {
  return [
    {
      title: t['documents.columns.name'],
      dataIndex: 'name',
      width: 200,
      render: (value: string) => (
        <div style={{ cursor: 'pointer' }} onClick={() => navigator.clipboard.writeText(value)}>
          {value}
        </div>
      ),
    },
    {
      title: t['documents.columns.format'],
      dataIndex: 'format',
      width: 100,
      render: (value: string) => <Badge color={getFormatColor(value)} text={value} />,
      filters: DocumentFormats.map(format => ({ text: format, value: format })),
      onFilter: (value: string, record: DocumentRecord) => record.format === value,
    },
    {
      title: t['documents.columns.type'],
      dataIndex: 'type',
      width: 120,
      filters: DocumentTypes.map(type => ({ text: type, value: type })),
      onFilter: (value: string, record: DocumentRecord) => record.type === value,
    },
    {
      title: t['documents.columns.researchType'],
      dataIndex: 'researchType',
      width: 120,
      filters: ResearchTypes.map(type => ({ text: type, value: type })),
      onFilter: (value: string, record: DocumentRecord) => record.researchType === value,
    },
    {
      title: t['documents.columns.tags'],
      dataIndex: 'tags',
      width: 200,
      render: (tags: string[]) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {tags.map(tag => (
            <Tag key={tag} size="small">
              {tag}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: t['documents.columns.uploader'],
      dataIndex: 'uploader',
      width: 100,
    },
    {
      title: t['documents.columns.uploadTime'],
      dataIndex: 'uploadTime',
      width: 120,
      sorter: (a: DocumentRecord, b: DocumentRecord) =>
        new Date(a.uploadTime).getTime() - new Date(b.uploadTime).getTime(),
    },
    {
      title: t['documents.columns.status'],
      dataIndex: 'status',
      width: 100,
      render: (value: string) => <Badge color={getStatusColor(value)} text={value} />,
      filters: DocumentStatuses.map(status => ({ text: status, value: status })),
      onFilter: (value: string, record: DocumentRecord) => record.status === value,
    },
    {
      title: '文件大小',
      dataIndex: 'fileSize',
      width: 100,
      render: (value: string) => <span style={{ color: '#666', fontSize: '12px' }}>{value}</span>,
    },
    {
      title: t['documents.columns.operations'],
      dataIndex: 'operations',
      width: 160,
      fixed: 'right' as const,
      render: (_: any, record: DocumentRecord) => (
        <Space size="small">
          <Button
            type="text"
            size="mini"
            icon={<IconEye />}
            onClick={() => tableCallback(record, 'preview')}
            className="preview-button"
            style={{ padding: '2px 8px', height: '24px' }}
          >
            {t['documents.operations.preview']}
          </Button>
          <Button
            type="text"
            size="mini"
            icon={<IconDownload />}
            onClick={() => tableCallback(record, 'download')}
            className="download-button"
            style={{ padding: '2px 8px', height: '24px' }}
          >
            {t['documents.operations.download']}
          </Button>
        </Space>
      ),
    },
  ];
};
