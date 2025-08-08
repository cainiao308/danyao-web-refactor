import React from 'react';
import {
  Card,
  Typography,
  Table,
  Space,
  Tag,
  Input,
  Button,
  Descriptions,
  Spin,
} from '@arco-design/web-react';
import { IconSearch, IconFilter, IconInfoCircle } from '@arco-design/web-react/icon';
import { ammunitionColumns } from '@/config/searchConfigs/ammunitionConfig';

const { Title } = Typography;

interface AmmunitionResultsProps {
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

function AmmunitionResults({
  searchValue,
  searchResults,
  loading,
  error,
  total,
  hasSearched,
  onSearchChange,
  onClear,
  onRetry,
}: AmmunitionResultsProps) {
  // 计算统计信息
  const getStats = () => {
    if (!hasSearched || searchResults.length === 0) {
      return { types: {}, countries: 0, avgRange: '0' };
    }

    const types = searchResults.reduce((acc, item) => {
      const type = item.type as string;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const countries = [...new Set(searchResults.map(item => item.country))].length;
    const avgRange =
      searchResults.length > 0
        ? (
            searchResults.reduce((sum, item) => sum + ((item.maxRange as number) || 0), 0) /
            searchResults.length
          ).toFixed(1)
        : '0';

    return { types, countries, avgRange };
  };

  const stats = getStats();

  return (
    <div style={{ width: '100%' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 统计信息卡片 */}
        {hasSearched && searchResults.length > 0 && !loading && (
          <Card
            title={
              <Space>
                <IconInfoCircle style={{ color: '#165dff' }} />
                <span style={{ color: '#1d2129', fontWeight: 600 }}>📊 数据统计</span>
              </Space>
            }
            style={{
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e5e8ef',
            }}
          >
            <Descriptions
              data={[
                {
                  label: '总数量',
                  value: (
                    <span style={{ color: '#165dff', fontWeight: 600 }}>
                      {searchResults.length} 种弹药
                    </span>
                  ),
                },
                {
                  label: '涉及国家',
                  value: (
                    <span style={{ color: '#52c41a', fontWeight: 600 }}>{stats.countries} 个</span>
                  ),
                },
                {
                  label: '平均射程',
                  value: (
                    <span style={{ color: '#f5222d', fontWeight: 600 }}>{stats.avgRange} km</span>
                  ),
                },
                {
                  label: '类型分布',
                  value: (
                    <Space wrap>
                      {Object.entries(stats.types).map(([type, count]) => (
                        <Tag key={type} color="blue" style={{ borderRadius: '6px' }}>
                          {type}: {count}
                        </Tag>
                      ))}
                    </Space>
                  ),
                },
              ]}
              column={2}
              layout="inline-horizontal"
            />
          </Card>
        )}

        {/* 搜索结果表格 */}
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
              🚀 弹药列表 ({hasSearched ? searchResults.length : 0}个结果)
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
                <Typography.Text>搜索出错了，请重试</Typography.Text>
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
                <Typography.Text>请输入关键词开始搜索</Typography.Text>
              </div>
            ) : loading ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '60px',
                }}
              >
                <Spin size={40} />
                <div style={{ marginTop: '16px', color: '#86909c' }}>正在搜索弹药数据...</div>
              </div>
            ) : searchResults.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '60px',
                  color: '#86909c',
                }}
              >
                <Typography.Text>未找到相关弹药</Typography.Text>
                <br />
                <Typography.Text type="secondary">尝试使用其他关键词搜索</Typography.Text>
              </div>
            ) : (
              <Table
                columns={ammunitionColumns}
                data={searchResults}
                pagination={{
                  pageSize: 10,
                  showTotal: true,
                  showJumper: true,
                  sizeCanChange: true,
                  size: 'default',
                }}
                rowKey="id"
                borderCell={false}
                stripe
                scroll={{ x: 1200 }}
                style={
                  {
                    '--arco-table-border-radius': '8px',
                  } as React.CSSProperties
                }
              />
            )}
          </div>
        </Card>
      </Space>
    </div>
  );
}

export default AmmunitionResults;
