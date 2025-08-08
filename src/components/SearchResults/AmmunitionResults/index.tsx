import React from 'react';
import { ammunitionColumns } from '@/config/searchConfigs/ammunitionConfig';
import {
  Button,
  Card,
  Descriptions,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
} from '@arco-design/web-react';
import { IconInfoCircle } from '@arco-design/web-react/icon';

const { Title, Text } = Typography;

interface AmmunitionResultsProps {
  searchResults: Record<string, unknown>[];
  loading: boolean;
  error: string | null;
  total: number;
  hasSearched: boolean;
  onRetry: () => void;
}

function AmmunitionResults({
  searchResults,
  loading,
  error,
  total,
  hasSearched,
  onRetry,
}: AmmunitionResultsProps) {
  // 计算统计信息
  const getStats = () => {
    if (!hasSearched || searchResults.length === 0) {
      return { types: {}, countries: 0, avgRange: '0' };
    }

    const types = searchResults.reduce((acc, item) => {
      const type = item.type as string;
      const prev = typeof acc[type] === 'number' ? acc[type] : 0;
      acc[type] = prev + 1;
      return acc;
    }, {} as Record<string, number>);

    const countries = Array.from(new Set(searchResults.map(item => String(item.country)))).length;
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
                  label: '弹药类型',
                  value: (
                    <Space wrap>
                      {Object.entries(stats.types).map(([type, count]) => (
                        <Tag key={type} color="blue">
                          {type}: {count}
                        </Tag>
                      ))}
                    </Space>
                  ),
                },
              ]}
              column={2}
              style={{ marginTop: '16px' }}
            />
          </Card>
        )}

        {/* 搜索结果 */}
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
          </div>

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
                  padding: '40px',
                }}
              >
                <Spin size={20} />
                <Text style={{ marginLeft: '12px', color: '#86909c' }}>搜索中...</Text>
              </div>
            ) : searchResults.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '40px',
                  color: '#86909c',
                }}
              >
                <Text>没有找到相关弹药，请尝试其他关键词</Text>
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
                scroll={{ x: 1000 }}
                style={
                  {
                    '--arco-table-border-radius': '8px',
                  } as React.CSSProperties
                }
              />
            )}
          </div>

          {searchResults.length > 0 && !loading && (
            <div
              style={{
                marginTop: '24px',
                padding: '16px',
                background: '#fafafa',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <Text type="secondary">
                显示了 {searchResults.length} 个结果，共找到 {total} 条记录
              </Text>
            </div>
          )}
        </Card>
      </Space>
    </div>
  );
}

export default AmmunitionResults;
