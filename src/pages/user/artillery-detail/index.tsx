import ProductDetail from '@/components/ProductDetail';
import { artilleryData } from '@/config/searchConfigs/artilleryConfig';
import { useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';

interface ArtilleryDetailParams {
  id: string;
}

function ArtilleryDetail() {
  const { id } = useParams<ArtilleryDetailParams>();
  const history = useHistory();

  // 根据ID查找火炮数据
  const artilleryItem = useMemo(() => {
    return artilleryData.find((item: any) => item.id.toString() === id);
  }, [id]);

  // 转换数据格式
  const product = useMemo(() => {
    if (!artilleryItem) return null;

    // 获取兼容弹药信息
    const compatibleAmmo = artilleryItem.compatibleAmmunition || [];

    return {
      id: artilleryItem.id,
      name: artilleryItem.name,
      type: artilleryItem.type,
      manufacturer: artilleryItem.manufacturer,
      country: artilleryItem.country,
      // 添加多张图片
      images: [
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop&sat=-100',
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop&hue=180',
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop&blur=2',
      ],
      // 添加视频
      videos: [
        'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      ],
      description: `${artilleryItem.caliber}mm ${artilleryItem.type}，射程 ${
        artilleryItem.range
      }km，${artilleryItem.mobility}。${artilleryItem.name}是一款现代化的${
        artilleryItem.type
      }，具有${artilleryItem.muzzleVelocity}m/s的初速和${
        artilleryItem.barrelLength
      }m的身管长度，射角范围${artilleryItem.elevationRange}，射向范围${
        artilleryItem.traverseRange
      }。该火炮采用先进的火控系统和精确制导技术，能够在各种复杂战场环境下提供强大的火力支援，是现代陆军装备体系中的重要组成部分。${
        compatibleAmmo.length > 0
          ? `该火炮兼容${compatibleAmmo.length}种弹药类型，包括${compatibleAmmo
              .map(ammo => ammo.name)
              .join('、')}等。`
          : ''
      }`,
      specifications: {
        火炮名称: artilleryItem.name,
        火炮口径: artilleryItem.caliber,
        火炮类型: artilleryItem.type,
        运动方式: artilleryItem.mobility,
        火炮初速: artilleryItem.muzzleVelocity,
        火炮射程: artilleryItem.range,
        身管长度: artilleryItem.barrelLength,
        射角范围: artilleryItem.elevationRange,
        射向范围: artilleryItem.traverseRange,
        火炮厂商: artilleryItem.manufacturer,
        国家: artilleryItem.country,
        弹道类型: '高抛弹道',
        装填方式: '半自动',
        瞄准系统: '数字化火控',
        防护等级: 'NATO STANAG 4569',
        机动速度: '60km/h',
        战斗重量: '未知',
        ...(compatibleAmmo.length > 0 && { 兼容弹药: `${compatibleAmmo.length}种` }),
      },
      // 添加兼容弹药信息
      relatedProducts:
        compatibleAmmo.length > 0
          ? {
              title: '兼容弹药',
              items: compatibleAmmo.map(ammo => ({
                id: ammo.id,
                name: ammo.name,
                type: 'ammunition',
                description: `${ammo.caliber}mm ${ammo.type}，${ammo.guidance}制导`,
                specifications: {
                  弹药名称: ammo.name,
                  口径: ammo.caliber,
                  类型: ammo.type,
                  制导方式: ammo.guidance,
                },
              })),
            }
          : undefined,
    };
  }, [artilleryItem]);

  const handleBack = () => {
    history.push('/user/artillery-search');
  };

  // 处理关联产品点击
  const handleRelatedProductClick = (product: { id: number; type: string }) => {
    if (product.type === 'artillery') {
      history.push(`/user/artillery-detail/${product.id}`);
    } else if (product.type === 'ammunition') {
      history.push(`/user/ammunition-detail/${product.id}`);
    }
  };

  // 如果找不到产品数据
  if (!product) {
    history.replace('/user/artillery-search');
    return null;
  }

  return (
    <ProductDetail
      product={product}
      onBack={handleBack}
      onRelatedProductClick={handleRelatedProductClick}
    />
  );
}

export default ArtilleryDetail;
