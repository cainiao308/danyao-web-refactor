import ProductGrid from '@/components/ProductGrid';
import { ammunitionData } from '@/config/searchConfigs/ammunitionConfig';
import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';

function AmmunitionSearch() {
  const history = useHistory();

  // 转换数据格式为ProductCard需要的格式
  const products = useMemo(() => {
    return ammunitionData.map((item: any) => ({
      id: item.id,
      name: item.name,
      type: item.type,
      manufacturer: item.manufacturer,
      country: item.country,
      description: `${item.caliber}mm ${item.type}，射程 ${item.minRange}-${item.maxRange}km，${
        item.guidance
      }制导。${
        item.compatibleArtillery && item.compatibleArtillery.length > 0
          ? `兼容${item.compatibleArtillery.length}种火炮。`
          : ''
      }`,
      specifications: {
        口径: item.caliber,
        重量: item.weight,
        长度: item.length,
        最小射程: item.minRange,
        最大射程: item.maxRange,
        精度: item.accuracy,
        威力: item.power,
        制导方式: item.guidance,
        ...(item.compatibleArtillery &&
          item.compatibleArtillery.length > 0 && {
            兼容火炮: `${item.compatibleArtillery.length}种`,
          }),
      },
      // 添加兼容火炮信息
      relatedInfo:
        item.compatibleArtillery && item.compatibleArtillery.length > 0
          ? {
              title: '兼容火炮',
              items: item.compatibleArtillery.map((artillery: any) => ({
                name: artillery.name,
                type: artillery.type,
                caliber: artillery.caliber,
                country: artillery.country,
              })),
            }
          : undefined,
    }));
  }, []);

  // 获取过滤选项
  const filterOptions = useMemo(() => {
    const types = Array.from(new Set(ammunitionData.map((item: any) => item.type)));
    const manufacturers = Array.from(new Set(ammunitionData.map((item: any) => item.manufacturer)));
    const countries = Array.from(new Set(ammunitionData.map((item: any) => item.country)));

    return { types, manufacturers, countries };
  }, []);

  const handleProductClick = (id: string | number) => {
    history.push(`/user/ammunition-detail/${id}`);
  };

  return (
    <ProductGrid
      title="弹药列表"
      products={products}
      filterOptions={filterOptions}
      onProductClick={handleProductClick}
      pageSize={12}
    />
  );
}

export default AmmunitionSearch;
