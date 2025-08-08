import React, { useState } from 'react';
import { artilleryColumns } from '@/config/searchConfigs/artilleryConfig';
import {
  Button,
  Card,
  Grid,
  Radio,
  Space,
  Spin,
  Statistic,
  Table,
  Tag,
  Typography,
} from '@arco-design/web-react';
import { IconEye, IconList, IconThunderbolt } from '@arco-design/web-react/icon';

const { Title, Text } = Typography;
const { Row, Col } = Grid;

interface ArtilleryResultsProps {
  searchResults: Record<string, unknown>[];
  loading: boolean;
  error: string | null;
  total: number;
  hasSearched: boolean;
  onRetry: () => void;
}

function ArtilleryResults({
  searchResults,
  loading,
  error,
  total,
  hasSearched,
  onRetry,
}: ArtilleryResultsProps) {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // 计算统计信息
  const getStats = () => {
    if (!hasSearched || searchResults.length === 0) {
      return { selfPropelled: 0, towed: 0, maxRange: 0, avgCaliber: '0' };
    }

    const selfPropelled = searchResults.filter(item => item.type === '自行榴弹炮').length;
    const towed = searchResults.filter(item => item.type === '牵引榴弹炮').length;
    const maxRange = Math.max(...searchResults.map(item => (item.range as number) || 0));
    const avgCaliber =
      searchResults.length > 0
        ? (
            searchResults.reduce((sum, item) => sum + ((item.caliber as number) || 0), 0) /
            searchResults.length
          ).toFixed(0)
        : '0';

    return { selfPropelled, towed, maxRange, avgCaliber };
  };

  const stats = getStats();

  return (
    <div style={{ width: '100%' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 统计概览 */}
        {hasSearched && searchResults.length > 0 && !loading && (
          <Card
            title={<span style={{ color: '#1d2129', fontWeight: 600 }}>📈 火炮统计概览</span>}
            style={{
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e5e8ef',
            }}
          >
            <Row gutter={24}>
              <Col span={6}>
                <Statistic
                  title="自行榴弹炮"
                  value={stats.selfPropelled}
                  suffix="门"
                  countUp
                  styleValue={{ color: '#165dff' }}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="牵引榴弹炮"
                  value={stats.towed}
                  suffix="门"
                  countUp
                  styleValue={{ color: '#00b42a' }}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="最大射程"
                  value={stats.maxRange}
                  suffix="km"
                  countUp
                  styleValue={{ color: '#ff7d00' }}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="平均口径"
                  value={stats.avgCaliber}
                  suffix="mm"
                  countUp
                  styleValue={{ color: '#722ed1' }}
                />
              </Col>
            </Row>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Title heading={5} style={{ margin: 0, color: '#1d2129' }}>
                🎯 火炮装备 ({hasSearched ? searchResults.length : 0}个结果)
              </Title>

              <Radio.Group
                value={viewMode}
                onChange={setViewMode}
                options={[
                  {
                    label: (
                      <>
                        <IconList /> 表格
                      </>
                    ),
                    value: 'table',
                  },
                  {
                    label: (
                      <>
                        <IconEye /> 卡片
                      </>
                    ),
                    value: 'cards',
                  },
                ]}
                type="button"
                size="small"
                style={{ borderRadius: '8px' }}
              />
            </div>
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
                <Text>没有找到相关火炮装备，请尝试其他关键词</Text>
              </div>
            ) : viewMode === 'table' ? (
              <Table
                columns={artilleryColumns}
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
            ) : (
              <div>
                <Row gutter={[16, 16]}>
                  {searchResults.map((artillery: any, index: number) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={artillery.id || index}>
                      <Card
                        hoverable
                        style={{
                          borderRadius: '8px',
                          transition: 'all 0.3s ease',
                          height: '100%',
                        }}
                        cover={
                          <div
                            style={{
                              height: '120px',
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <IconThunderbolt style={{ fontSize: '48px', color: 'white' }} />
                          </div>
                        }
                      >
                        <div style={{ marginBottom: '12px' }}>
                          <Text style={{ fontWeight: 500, fontSize: '16px' }}>
                            {artillery.name}
                          </Text>
                        </div>

                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                          {artillery.type && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Text type="secondary" style={{ fontSize: '12px', width: '60px' }}>
                                类型:
                              </Text>
                              <Tag color="blue" size="small">
                                {artillery.type}
                              </Tag>
                            </div>
                          )}

                          {artillery.caliber && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Text type="secondary" style={{ fontSize: '12px', width: '60px' }}>
                                口径:
                              </Text>
                              <Text style={{ fontSize: '12px' }}>{artillery.caliber}mm</Text>
                            </div>
                          )}

                          {artillery.manufacturer && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Text type="secondary" style={{ fontSize: '12px', width: '60px' }}>
                                制造商:
                              </Text>
                              <Text style={{ fontSize: '12px' }}>{artillery.manufacturer}</Text>
                            </div>
                          )}

                          {artillery.country && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Text type="secondary" style={{ fontSize: '12px', width: '60px' }}>
                                国家:
                              </Text>
                              <Text style={{ fontSize: '12px' }}>{artillery.country}</Text>
                            </div>
                          )}
                        </Space>
                      </Card>
                    </Col>
                  ))}
                </Row>

                {searchResults.length > 0 && (
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
              </div>
            )}
          </div>
        </Card>
      </Space>
    </div>
  );
}

export default ArtilleryResults;
