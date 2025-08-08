import React from 'react';
import { Button, Card, Grid, Space, Spin, Typography } from '@arco-design/web-react';

const { Title, Text } = Typography;
const { Row, Col } = Grid;

interface CountryResultsProps {
  searchResults: Record<string, unknown>[];
  loading: boolean;
  error: string | null;
  total: number;
  hasSearched: boolean;
  onRetry: () => void;
}

function CountryResults({
  searchResults,
  loading,
  error,
  total,
  hasSearched,
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
              <Text>没有找到相关国家，请尝试其他关键词</Text>
            </div>
          ) : (
            <div>
              <Row gutter={[16, 16]}>
                {searchResults.map((country: any, index: number) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={country.id || index}>
                    <Card
                      hoverable
                      style={{
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        height: '100%',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{ fontSize: '24px', marginRight: '8px' }}>
                          {country.flag || '🏳️'}
                        </span>
                        <Text style={{ fontWeight: 500, fontSize: '16px' }}>{country.name}</Text>
                      </div>

                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        {country.region && (
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Text type="secondary" style={{ fontSize: '12px', width: '50px' }}>
                              地区:
                            </Text>
                            <Text style={{ fontSize: '12px' }}>{country.region}</Text>
                          </div>
                        )}

                        {country.capital && (
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Text type="secondary" style={{ fontSize: '12px', width: '50px' }}>
                              首都:
                            </Text>
                            <Text style={{ fontSize: '12px' }}>{country.capital}</Text>
                          </div>
                        )}

                        {country.population && (
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Text type="secondary" style={{ fontSize: '12px', width: '50px' }}>
                              人口:
                            </Text>
                            <Text style={{ fontSize: '12px' }}>
                              {(country.population / 1000000).toFixed(1)}M
                            </Text>
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
    </div>
  );
}

export default CountryResults;
