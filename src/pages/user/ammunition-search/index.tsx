import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Message } from '@arco-design/web-react';
import ProductGrid from '@/components/ProductGrid';
import { ammunitionData } from '@/config/searchConfigs/ammunitionConfig';

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
      description: `${item.caliber} 口径弹药，射程 ${item.minRange}-${item.maxRange}km`,
      specifications: {
        口径: item.caliber,
        重量: item.weight,
        长度: item.length,
        最小射程: item.minRange,
        最大射程: item.maxRange,
        精度: item.accuracy,
        威力: item.power,
        制导方式: item.guidanceControl,
      },
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
