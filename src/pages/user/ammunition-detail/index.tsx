import React, { useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Message } from '@arco-design/web-react';
import ProductDetail from '@/components/ProductDetail';
import { ammunitionData } from '@/config/searchConfigs/ammunitionConfig';

interface AmmunitionDetailParams {
  id: string;
}

function AmmunitionDetail() {
  const { id } = useParams<AmmunitionDetailParams>();
  const history = useHistory();

  // 根据ID查找弹药数据
  const ammunitionItem = useMemo(() => {
    return ammunitionData.find((item: any) => item.id.toString() === id);
  }, [id]);

  // 转换数据格式
  const product = useMemo(() => {
    if (!ammunitionItem) return null;

    return {
      id: ammunitionItem.id,
      name: ammunitionItem.name,
      type: ammunitionItem.type,
      manufacturer: ammunitionItem.manufacturer,
      country: ammunitionItem.country,
      // 添加多张图片
      images: [
        'http://119.45.121.216/api/v1/upload/7a6d248b6b017fed90c00ef1a0caf5f4.png',
        'http://119.45.121.216/api/v1/upload/7f682d920dcc54cd4b61706f2942088a.png',
        'http://119.45.121.216/api/v1/upload/b492399e755928ad50875626dd2086cb.jpg',
        'http://119.45.121.216/api/v1/upload/1bd94eb0d97d7a7aa990966b76e4f452.png',
        'http://119.45.121.216/api/v1/upload/c551a3fdf9249df5a0c8823e76133cf0.png',
        'http://119.45.121.216/api/v1/upload/509e2cc010206b178cceb9450abbcb27.jpg',
        'http://119.45.121.216/api/v1/upload/b8e0deb284dafa3772e7c7dc7e7d55d9.jpg',
      ],
      // 添加视频
      videos: [
        'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
        'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
      ],
      description: `${ammunitionItem.caliber} 口径弹药，射程 ${ammunitionItem.minRange}-${ammunitionItem.maxRange}km。${ammunitionItem.name}是一款现代化的${ammunitionItem.type}，具有出色的精度和威力，采用${ammunitionItem.guidance}制导方式，适用于多种作战环境。该弹药采用先进的制导技术，能够在复杂战场环境下保持高精度打击能力，是现代军事装备的重要组成部分。`,
      specifications: {
        口径: ammunitionItem.caliber,
        简称: ammunitionItem.abbreviation,
        重量: ammunitionItem.weight,
        长度: ammunitionItem.length,
        最小射程: ammunitionItem.minRange,
        最大射程: ammunitionItem.maxRange,
        精度: ammunitionItem.accuracy,
        威力: ammunitionItem.power,
        类型: ammunitionItem.type,
        制导方式: ammunitionItem.guidance,
        厂商: ammunitionItem.manufacturer,
        生产国家: ammunitionItem.country,
        弹头重量: `${(ammunitionItem.weight * 0.3).toFixed(1)}kg`,
        装药类型: '高能炸药',
        引信类型: '近炸引信',
        储存条件: '干燥通风',
        保质期: '15年',
      },
    };
  }, [ammunitionItem]);

  const handleBack = () => {
    history.push('/user/ammunition-search');
  };

  // 如果找不到产品数据
  if (!product) {
    Message.error('未找到该弹药信息');
    history.replace('/user/ammunition-search');
    return null;
  }

  return <ProductDetail product={product} onBack={handleBack} />;
}

export default AmmunitionDetail;
