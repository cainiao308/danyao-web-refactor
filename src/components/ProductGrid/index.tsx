import React, { useState, useMemo } from 'react';
import { Grid, Input, Select, Space, Typography, Pagination, Empty } from '@arco-design/web-react';
import { IconSearch } from '@arco-design/web-react/icon';
import ProductCard, { ProductCardProps } from '@/components/ProductCard';
import styles from './style/index.module.less';

const { Row, Col } = Grid;
const { Title, Text } = Typography;
const Option = Select.Option;

export interface ProductGridProps {
  title: string;
  products: Omit<ProductCardProps, 'onClick'>[];
  filterOptions?: {
    types?: string[];
    manufacturers?: string[];
    countries?: string[];
  };
  onProductClick?: (id: string | number) => void;
  pageSize?: number;
  className?: string;
}

function ProductGrid({
  title,
  products,
  filterOptions = {},
  onProductClick,
  pageSize = 12,
  className,
}: ProductGridProps) {
  const [searchValue, setSearchValue] = useState('');
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
  const [selectedManufacturer, setSelectedManufacturer] = useState<string | undefined>(undefined);
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  // 过滤产品
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch =
        !searchValue ||
        product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.type.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.manufacturer.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.country.toLowerCase().includes(searchValue.toLowerCase());

      const matchesType = !selectedType || product.type === selectedType;
      const matchesManufacturer =
        !selectedManufacturer || product.manufacturer === selectedManufacturer;
      const matchesCountry = !selectedCountry || product.country === selectedCountry;

      return matchesSearch && matchesType && matchesManufacturer && matchesCountry;
    });
  }, [products, searchValue, selectedType, selectedManufacturer, selectedCountry]);

  // 分页数据
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, pageSize]);

  // 重置分页当过滤条件变化时
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, selectedType, selectedManufacturer, selectedCountry]);

  const handleClearFilters = () => {
    setSearchValue('');
    setSelectedType(undefined);
    setSelectedManufacturer(undefined);
    setSelectedCountry(undefined);
    setCurrentPage(1);
  };

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {/* 标题和统计 */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Title heading={2} className={styles.title}>
            {title}
          </Title>
          <Text className={styles.subtitle}>共 {filteredProducts.length} 个产品</Text>
        </div>
      </div>

      {/* 搜索和过滤器 */}
      <div className={styles.filterSection}>
        <Space size="medium" wrap>
          {/* 搜索框 */}
          <Input
            value={searchValue}
            onChange={setSearchValue}
            placeholder="搜索产品名称、类型、厂商..."
            prefix={<IconSearch />}
            style={{ width: 380, height: 40 }}
            allowClear
          />

          {/* 类型过滤 */}
          {filterOptions.types && filterOptions.types.length > 0 && (
            <Select
              value={selectedType}
              onChange={setSelectedType}
              placeholder="选择类型"
              className={styles.select}
              allowClear
            >
              {filterOptions.types.map(type => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          )}

          {/* 厂商过滤 */}
          {filterOptions.manufacturers && filterOptions.manufacturers.length > 0 && (
            <Select
              value={selectedManufacturer}
              onChange={setSelectedManufacturer}
              placeholder="选择厂商"
              className={styles.select}
              allowClear
            >
              {filterOptions.manufacturers.map(manufacturer => (
                <Option key={manufacturer} value={manufacturer}>
                  {manufacturer}
                </Option>
              ))}
            </Select>
          )}

          {/* 国家过滤 */}
          {filterOptions.countries && filterOptions.countries.length > 0 && (
            <Select
              value={selectedCountry}
              onChange={setSelectedCountry}
              placeholder="选择国家"
              className={styles.select}
              allowClear
            >
              {filterOptions.countries.map(country => (
                <Option key={country} value={country}>
                  {country}
                </Option>
              ))}
            </Select>
          )}

          {/* 清除按钮 */}
          {(searchValue || selectedType || selectedManufacturer || selectedCountry) && (
            <button onClick={handleClearFilters} className={styles.clearButton}>
              清除筛选
            </button>
          )}
        </Space>
      </div>

      {/* 产品网格 */}
      <div>
        {paginatedProducts.length > 0 ? (
          <>
            <Row gutter={[24, 24]}>
              {paginatedProducts.map(product => (
                <Col key={product.id} xs={12} sm={12} md={8} lg={6} xl={6}>
                  <ProductCard
                    {...product}
                    onClick={onProductClick}
                    className={styles.productCard}
                  />
                </Col>
              ))}
            </Row>

            {/* 分页器 */}
            {filteredProducts.length > pageSize && (
              <div className={styles.paginationSection}>
                <Pagination
                  current={currentPage}
                  total={filteredProducts.length}
                  pageSize={pageSize}
                  onChange={setCurrentPage}
                  showTotal
                  showJumper
                  sizeCanChange={false}
                />
              </div>
            )}
          </>
        ) : (
          <div className={styles.emptySection}>
            <Empty
              description={
                searchValue || selectedType || selectedManufacturer || selectedCountry
                  ? '没有找到匹配的产品'
                  : '暂无产品数据'
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductGrid;
