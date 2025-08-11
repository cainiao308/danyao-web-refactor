import { Button, Card, Space, Tag, Typography } from '@arco-design/web-react';
import { IconEye } from '@arco-design/web-react/icon';
import styles from './style/index.module.less';

const { Title, Text } = Typography;

export interface ProductCardProps {
  id: string | number;
  name: string;
  type: string;
  manufacturer: string;
  country: string;
  image?: string;
  description?: string;
  specifications?: Record<string, any>;
  onClick?: (id: string | number) => void;
  className?: string;
}

function ProductCard({
  id,
  name,
  type,
  manufacturer,
  country,
  description,
  specifications,
  onClick,
  className,
}: ProductCardProps) {
  const handleClick = () => {
    onClick?.(id);
  };

  const handleViewDetails = (e: Event) => {
    e.stopPropagation();
    onClick?.(id);
  };

  return (
    <Card
      className={`${styles.productCard} ${className || ''}`}
      hoverable
      onClick={handleClick}
      cover={
        <div className={styles.imageContainer}>
          <img
            src="http://119.45.121.216/api/v1/upload/7a6d248b6b017fed90c00ef1a0caf5f4.png"
            alt={name}
            className={styles.productImage}
          />
          <div className={styles.imageActions}>
            <Button
              type="primary"
              icon={<IconEye />}
              size="small"
              onClick={handleViewDetails}
              className={styles.viewButton}
            >
              查看详情
            </Button>
          </div>
        </div>
      }
    >
      <div className={styles.cardContent}>
        {/* 产品名称 */}
        <Title heading={5} className={styles.productName}>
          {name}
        </Title>

        {/* 产品类型和制造商 */}
        <div className={styles.productMeta}>
          <Space size="small" wrap>
            <Tag color="blue" className={styles.typeTag}>
              {type}
            </Tag>
            <Tag color="green" className={styles.manufacturerTag}>
              {manufacturer}
            </Tag>
            <Tag color="orange" className={styles.countryTag}>
              {country}
            </Tag>
          </Space>
        </div>

        {/* 产品描述 */}
        {description && (
          <Text className={styles.description}>
            {description.length > 80 ? `${description.substring(0, 80)}...` : description}
          </Text>
        )}

        {/* 关键规格 */}
        {specifications && (
          <div className={styles.specifications}>
            <Space size="small" wrap>
              {Object.entries(specifications)
                .slice(0, 3)
                .map(([key, value]) => (
                  <div key={key} className={styles.specItem}>
                    <Text className={styles.specLabel}>{key}:</Text>
                    <Text className={styles.specValue}>{value}</Text>
                  </div>
                ))}
            </Space>
          </div>
        )}
      </div>
    </Card>
  );
}

export default ProductCard;
