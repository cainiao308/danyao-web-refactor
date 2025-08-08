import React, { useState } from 'react';
import {
  Card,
  Typography,
  Table,
  Space,
  Tag,
  Input,
  Button,
  Grid,
  Statistic,
  Radio,
  Spin,
} from '@arco-design/web-react';
import {
  IconSearch,
  IconFilter,
  IconThunderbolt,
  IconEye,
  IconList,
} from '@arco-design/web-react/icon';
import { artilleryColumns } from '@/config/searchConfigs/artilleryConfig';

const { Title } = Typography;
const { Row, Col } = Grid;

interface ArtilleryResultsProps {
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

function ArtilleryResults({
  searchValue,
  searchResults,
  loading,
  error,
  total,
  hasSearched,
  onSearchChange,
  onClear,
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

  // 卡片视图渲染
  const renderCardView = () => (
    <Row gutter={[16, 16]}>
      {searchResults.map(item => (
        <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
          <Card
            hoverable
            style={{ height: '100%' }}
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
            <Card.Meta
              title={
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.name as string}</div>
              }
              description={
                <Space direction="vertical" size="mini" style={{ width: '100%' }}>
                  <div>
                    <Tag color="blue">{item.type as string}</Tag>
                    <Tag color="orange">{item.mobility as string}</Tag>
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    口径: {item.caliber}mm | 射程: {item.range}km
                  </div>
                  <div style={{ fontSize: '12px', color: '#999' }}>
                    {item.country as string} · {item.manufacturer as string}
                  </div>
                </Space>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );

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
            <Row gutter={16}>
              <Col span={6}>
                <Statistic
                  title="自行榴弹炮"
                  value={stats.selfPropelled}
                  suffix="门"
                  valueStyle={{ color: '#1890ff', fontSize: '24px', fontWeight: 600 }}
                  style={{ textAlign: 'center' }}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="牵引榴弹炮"
                  value={stats.towed}
                  suffix="门"
                  valueStyle={{ color: '#52c41a', fontSize: '24px', fontWeight: 600 }}
                  style={{ textAlign: 'center' }}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="最大射程"
                  value={stats.maxRange}
                  suffix="km"
                  valueStyle={{ color: '#f5222d', fontSize: '24px', fontWeight: 600 }}
                  style={{ textAlign: 'center' }}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="平均口径"
                  value={stats.avgCaliber}
                  suffix="mm"
                  valueStyle={{ color: '#722ed1', fontSize: '24px', fontWeight: 600 }}
                  style={{ textAlign: 'center' }}
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
                <div style={{ marginTop: '16px', color: '#86909c' }}>正在搜索火炮数据...</div>
              </div>
            ) : searchResults.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '60px',
                  color: '#86909c',
                }}
              >
                <Typography.Text>未找到相关火炮</Typography.Text>
                <br />
                <Typography.Text type="secondary">尝试使用其他关键词搜索</Typography.Text>
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
              <div style={{ padding: '16px 0' }}>{renderCardView()}</div>
            )}
          </div>
        </Card>
      </Space>
    </div>
  );
}

export default ArtilleryResults;
