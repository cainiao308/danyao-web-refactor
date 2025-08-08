import React from 'react';
import { Card, Typography, Table, Space, Tag, Input, Button, Spin } from '@arco-design/web-react';
import { IconSearch, IconFilter } from '@arco-design/web-react/icon';
import { countryColumns } from '@/config/searchConfigs/countryConfig';

const { Title, Text } = Typography;

interface CountryResultsProps {
  searchValue: string;
  searchResults: Record<string, unknown>[];
  loading: boolean;
  error: string | null;
  total: number;
  hasSearched: boolean;
  onSearchChange: (value: string) => void;
  onClear: () => void;
  onRetry: () => void;
}

function CountryResults({
  searchValue,
  searchResults,
  loading,
  error,
  total,
  hasSearched,
  onSearchChange,
  onClear,
  onRetry,
}: CountryResultsProps) {
  return (
    <div style={{ width: '100%' }}>
      <Card
        style={{
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e5e8ef',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <Title heading={5} style={{ margin: 0, color: '#1d2129' }}>
            🌍 搜索结果 ({hasSearched ? searchResults.length : 0}个国家)
          </Title>

          <Space wrap>
            <Input
              value={searchValue}
              onChange={onSearchChange}
              onPressEnter={() => onSearchChange(searchValue)}
              placeholder="快速筛选..."
              prefix={<IconSearch />}
              style={{ width: 240, borderRadius: '8px' }}
              allowClear
              onClear={onClear}
            />
            <Button
              type="primary"
              icon={<IconFilter />}
              onClick={() => onSearchChange(searchValue)}
              style={{ borderRadius: '8px' }}
            >
              筛选
            </Button>
            {searchValue && (
              <Button onClick={onClear} style={{ borderRadius: '8px' }}>
                清除
              </Button>
            )}
          </Space>
        </div>

        {searchValue && (
          <div
            style={{
              marginBottom: '20px',
              padding: '16px',
              background: 'linear-gradient(90deg, #f0f8ff 0%, #e6f3ff 100%)',
              borderRadius: '8px',
              border: '1px solid #b3d8ff',
            }}
          >
            <Space>
              <span style={{ color: '#0066cc', fontWeight: 500 }}>当前搜索：</span>
              <Tag color="blue" closable onClose={onClear} style={{ borderRadius: '6px' }}>
                {searchValue}
              </Tag>
            </Space>
          </div>
        )}

        <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
          {error ? (
            <div
              style={{
                textAlign: 'center',
                padding: '40px',
                color: '#f5222d',
              }}
            >
              <Text>搜索出错了，请重试</Text>
              <br />
              <Button type="primary" style={{ marginTop: '16px' }} onClick={onRetry}>
                重新搜索
              </Button>
            </div>
          ) : !hasSearched ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px',
                color: '#86909c',
              }}
            >
              <Text>请输入关键词开始搜索</Text>
            </div>
          ) : loading ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px',
              }}
            >
              <Spin size={40} />
              <div style={{ marginTop: '16px', color: '#86909c' }}>正在搜索中...</div>
            </div>
          ) : searchResults.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px',
                color: '#86909c',
              }}
            >
              <Text>未找到相关结果</Text>
              <br />
              <Text type="secondary">尝试使用其他关键词搜索</Text>
            </div>
          ) : (
            <Table
              columns={countryColumns}
              data={searchResults}
              pagination={{
                pageSize: 8,
                showTotal: true,
                showJumper: true,
                sizeCanChange: true,
                size: 'default',
              }}
              rowKey="id"
              borderCell={false}
              stripe
              scroll={{ x: 800 }}
              style={
                {
                  '--arco-table-border-radius': '8px',
                } as React.CSSProperties
              }
            />
          )}
        </div>
      </Card>
    </div>
  );
}

export default CountryResults;
