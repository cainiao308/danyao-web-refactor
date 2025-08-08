import React, { useState } from 'react';
import {
  Card,
  Typography,
  Button,
  Space,
  Table,
  Select,
  Tag,
  Divider,
} from '@arco-design/web-react';
import { IconPlus, IconDelete, IconSwap } from '@arco-design/web-react/icon';

const { Title, Text } = Typography;
const { Option } = Select;

function ProductCompare() {
  const [selectedProducts, setSelectedProducts] = useState([]);

  // 示例产品数据
  const products = [
    {
      id: 1,
      name: '红箭-12反坦克导弹',
      type: '弹药',
      caliber: '120mm',
      range: '4-8km',
      guidance: '激光制导',
      country: '中国',
      manufacturer: '中国兵器工业集团',
    },
    {
      id: 2,
      name: 'AGM-114地狱火导弹',
      type: '弹药',
      caliber: '178mm',
      range: '8-11km',
      guidance: '激光制导',
      country: '美国',
      manufacturer: '洛克希德·马丁',
    },
    {
      id: 3,
      name: 'PLZ-05自行榴弹炮',
      type: '火炮',
      caliber: '155mm',
      range: '50km',
      mobility: '履带式',
      country: '中国',
      manufacturer: '中国北方工业公司',
    },
    {
      id: 4,
      name: 'M777超轻型榴弹炮',
      type: '火炮',
      caliber: '155mm',
      range: '40km',
      mobility: '牵引式',
      country: '美国',
      manufacturer: 'BAE系统',
    },
  ];

  const handleAddProduct = productId => {
    const product = products.find(p => p.id === productId);
    if (product && !selectedProducts.find(p => p.id === productId)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleRemoveProduct = productId => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  const compareFields = [
    { key: 'name', label: '产品名称' },
    { key: 'type', label: '类型' },
    { key: 'caliber', label: '口径' },
    { key: 'range', label: '射程' },
    { key: 'guidance', label: '制导方式' },
    { key: 'mobility', label: '运动方式' },
    { key: 'country', label: '国家' },
    { key: 'manufacturer', label: '厂商' },
  ];

  return (
    <div style={{ padding: '20px', background: '#f5f7fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Card>
          <Title heading={4} style={{ marginBottom: '20px' }}>
            产品对比
          </Title>

          <div style={{ marginBottom: '30px' }}>
            <Text type="secondary">选择要对比的产品：</Text>
            <div style={{ marginTop: '12px' }}>
              <Space wrap>
                <Select
                  placeholder="选择产品"
                  style={{ width: 300 }}
                  onChange={handleAddProduct}
                  allowClear
                >
                  {products.map(product => (
                    <Option
                      key={product.id}
                      value={product.id}
                      disabled={selectedProducts.some(p => p.id === product.id)}
                    >
                      {product.name} ({product.type})
                    </Option>
                  ))}
                </Select>
                <Text type="secondary">已选择 {selectedProducts.length} / 4 个产品</Text>
              </Space>
            </div>
          </div>

          {selectedProducts.length > 0 && (
            <>
              <Divider />
              <div style={{ marginBottom: '20px' }}>
                <Title heading={6}>已选择的产品：</Title>
                <Space wrap style={{ marginTop: '12px' }}>
                  {selectedProducts.map(product => (
                    <Tag
                      key={product.id}
                      color="blue"
                      closable
                      onClose={() => handleRemoveProduct(product.id)}
                    >
                      {product.name}
                    </Tag>
                  ))}
                </Space>
              </div>
            </>
          )}

          {selectedProducts.length >= 2 && (
            <>
              <Divider />
              <Title heading={6} style={{ marginBottom: '20px' }}>
                对比结果：
              </Title>
              <div style={{ overflowX: 'auto' }}>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    border: '1px solid #e5e6eb',
                  }}
                >
                  <thead>
                    <tr style={{ background: '#f7f8fa' }}>
                      <th
                        style={{
                          padding: '12px',
                          border: '1px solid #e5e6eb',
                          textAlign: 'left',
                          fontWeight: 600,
                        }}
                      >
                        对比项目
                      </th>
                      {selectedProducts.map(product => (
                        <th
                          key={product.id}
                          style={{
                            padding: '12px',
                            border: '1px solid #e5e6eb',
                            textAlign: 'center',
                            fontWeight: 600,
                            minWidth: '200px',
                          }}
                        >
                          {product.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {compareFields.map(field => (
                      <tr key={field.key}>
                        <td
                          style={{
                            padding: '12px',
                            border: '1px solid #e5e6eb',
                            background: '#fafbfc',
                            fontWeight: 500,
                          }}
                        >
                          {field.label}
                        </td>
                        {selectedProducts.map(product => (
                          <td
                            key={product.id}
                            style={{
                              padding: '12px',
                              border: '1px solid #e5e6eb',
                              textAlign: 'center',
                            }}
                          >
                            {product[field.key] || '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {selectedProducts.length < 2 && (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#86909c',
              }}
            >
              <IconSwap style={{ fontSize: '48px', marginBottom: '16px' }} />
              <div>
                <Text type="secondary">请选择至少 2 个产品进行对比</Text>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default ProductCompare;
