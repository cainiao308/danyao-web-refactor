import ProductGrid from '@/components/ProductGrid';
import { artilleryData } from '@/config/searchConfigs/artilleryConfig';
import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';

function ArtillerySearch() {
  const history = useHistory();

  // 转换数据格式为ProductCard需要的格式
  const products = useMemo(() => {
    return artilleryData.map((item: any) => ({
      id: item.id,
      name: item.name,
      type: item.type,
      manufacturer: item.manufacturer,
      country: item.country,
      description: `${item.caliber} 火炮，射程 ${item.range}km，${item.movementType}`,
      specifications: {
        口径: item.caliber,
        类型: item.type,
        运动方式: item.movementType,
        初速: item.initialVelocity,
        射程: item.range,
        身管长度: item.barrelLength,
        射角范围: item.elevationRange,
        射向范围: item.traverseRange,
      },
    }));
  }, []);

  // 获取过滤选项
  const filterOptions = useMemo(() => {
    const types = Array.from(new Set(artilleryData.map((item: any) => item.type)));
    const manufacturers = Array.from(new Set(artilleryData.map((item: any) => item.manufacturer)));
    const countries = Array.from(new Set(artilleryData.map((item: any) => item.country)));

    return { types, manufacturers, countries };
  }, []);

  const handleProductClick = (id: string | number) => {
    history.push(`/user/artillery-detail/${id}`);
  };

  return (
    <ProductGrid
      title="火炮列表"
      products={products}
      filterOptions={filterOptions}
      onProductClick={handleProductClick}
      pageSize={12}
    />
  );
}

export default ArtillerySearch;
