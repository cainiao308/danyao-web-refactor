import { Card, Image, Space, Tabs, Tag, Typography, Table } from '@arco-design/web-react';
import {
  IconArrowLeft,
  IconImage,
  IconLeftCircle,
  IconVideoCamera,
} from '@arco-design/web-react/icon';
import { useEffect, useRef, useState } from 'react';
import styles from './style/index.module.less';
import { createGraph, data1 } from './test';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export interface ProductDetailProps {
  product: {
    id: string | number;
    name: string;
    type: string;
    manufacturer: string;
    country: string;
    image?: string;
    images?: string[];
    videos?: string[]; // 改为videos数组
    description?: string;
    specifications?: Record<string, any>;
  };
  onBack?: () => void;
  className?: string;
}

function ProductDetail({ product, onBack, className }: ProductDetailProps) {
  const {
    name,
    type,
    manufacturer,
    country,
    image,
    images = [],
    videos = [],
    description,
    specifications,
  } = product;

  // 合并图片数组，如果有单张图片则添加到数组开头
  const allImages = image ? [image, ...images] : images;

  // 生成默认图片
  const defaultImage = (
    <div className={styles.defaultImage}>
      <div className={styles.imageOverlay}>
        <Text className={styles.productInitial}>{name.charAt(0).toUpperCase()}</Text>
      </div>
    </div>
  );

  // 图表相关的状态和引用
  const graphRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [graphReady, setGraphReady] = useState(false);

  // 创建和渲染图表
  const renderGraph = () => {
    if (!containerRef.current) {
      console.log('容器引用不存在，跳过图表创建');
      return;
    }

    try {
      // 如果已存在图表实例，先销毁
      if (graphRef.current) {
        console.log('销毁现有图表实例');
        graphRef.current.destroy();
        graphRef.current = null;
      }

      console.log('开始创建图表...');
      const graph = createGraph(containerRef.current, data1);

      if (graph) {
        graphRef.current = graph;
        setGraphReady(true);
        console.log('图表创建成功，状态已更新');
      } else {
        console.error('图表创建失败');
        setGraphReady(false);
      }
    } catch (error) {
      console.error('创建图表时发生错误:', error);
      setGraphReady(false);
    }
  };

  // 等待容器准备就绪
  const waitForContainer = () => {
    if (containerRef.current) {
      renderGraph();
    } else {
      // 使用 setTimeout 等待 DOM 准备就绪
      setTimeout(waitForContainer, 50);
    }
  };

  // 监听产品数据变化，重新渲染图表
  useEffect(() => {
    if (product && containerRef.current) {
      waitForContainer();
    }
  }, [product]);

  // 组件卸载时清理图表
  useEffect(() => {
    return () => {
      if (graphRef.current) {
        console.log('组件卸载，清理图表实例');
        graphRef.current.destroy();
        graphRef.current = null;
        setGraphReady(false);
      }
    };
  }, []);

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {/* 主要内容区域 - 左右结构 */}
      <div className={styles.mainContent}>
        {/* 左侧内容 - 上下结构 */}
        <div className={styles.leftContent}>
          {/* 底部操作区域 */}
          <div className={styles.bottomActions}>
            <Card className={styles.actionsCard}>
              <div className={styles.productHeader}>
                <div className={styles.productInfo}>
                  <Title heading={2} className={styles.productName}>
                    <IconLeftCircle
                      style={{ marginRight: 20, cursor: 'pointer' }}
                      onClick={onBack}
                    />
                    {name}
                  </Title>
                  <div className={styles.productMeta}>
                    <Space size="medium" wrap>
                      <Tag color="blue" className={styles.typeTag}>
                        类型: {type}
                      </Tag>
                      <Tag color="green" className={styles.manufacturerTag}>
                        厂商: {manufacturer}
                      </Tag>
                      <Tag color="orange" className={styles.countryTag}>
                        国家: {country}
                      </Tag>
                    </Space>
                  </div>
                  {/* 产品描述 */}
                  {description && (
                    <div className={styles.descriptionSection}>
                      <Title heading={4} className={styles.sectionTitle}>
                        产品描述
                      </Title>
                      <Text className={styles.description}>{description}</Text>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
          {/* 上边：产品详情（图片/视频） */}
          <Card className={styles.productDetailCard} title="产品详情">
            <div className={styles.mediaSection}>
              {allImages.length > 0 || videos.length > 0 ? (
                <Tabs defaultActiveTab="images" className={styles.mediaTabs}>
                  {allImages.length > 0 && (
                    <TabPane
                      key="images"
                      title={
                        <span>
                          <IconImage /> 产品图片
                        </span>
                      }
                    >
                      <div className={styles.imageGallery}>
                        <Image.PreviewGroup infinite>
                          {allImages.map((img, index) => (
                            <div key={index} className={styles.imageItem}>
                              <Image
                                src={img}
                                alt={`${name} - 图片${index + 1}`}
                                className={styles.galleryImage}
                                preview={true}
                              />
                            </div>
                          ))}
                        </Image.PreviewGroup>
                      </div>
                    </TabPane>
                  )}
                  {videos.length > 0 && (
                    <TabPane
                      key="video"
                      title={
                        <span>
                          <IconVideoCamera /> 产品视频 ({videos.length})
                        </span>
                      }
                    >
                      <div className={styles.videoContainer}>
                        <div className={styles.videoGrid}>
                          {videos.map((video, index) => (
                            <div
                              key={index}
                              className={styles.videoThumbnail}
                              onClick={() => {
                                // 创建模态框播放视频
                                const modal = document.createElement('div');
                                modal.className = styles.videoModal;
                                modal.innerHTML = `
                                  <div class="${styles.videoModalOverlay}">
                                    <div class="${styles.videoModalContent}">
                                      <button class="${styles.videoModalClose}">&times;</button>
                                      <video 
                                        src="${video}" 
                                        controls 
                                        autoplay
                                        class="${styles.videoModalVideo}"
                                      >
                                        您的浏览器不支持视频播放
                                      </video>
                                    </div>
                                  </div>
                                `;

                                // 关闭模态框
                                const closeBtn = modal.querySelector(`.${styles.videoModalClose}`);
                                const overlay = modal.querySelector(`.${styles.videoModalOverlay}`);

                                closeBtn?.addEventListener('click', () => {
                                  document.body.removeChild(modal);
                                });

                                overlay?.addEventListener('click', e => {
                                  if (e.target === overlay) {
                                    document.body.removeChild(modal);
                                  }
                                });

                                // ESC键关闭
                                const handleEsc = (e: KeyboardEvent) => {
                                  if (e.key === 'Escape') {
                                    document.body.removeChild(modal);
                                    document.removeEventListener('keydown', handleEsc);
                                  }
                                };
                                document.addEventListener('keydown', handleEsc);

                                document.body.appendChild(modal);
                              }}
                            >
                              <div className={styles.videoThumbnailOverlay}>
                                <div className={styles.videoPlayIcon}>▶</div>
                                <div className={styles.videoIndex}>视频 {index + 1}</div>
                              </div>
                              <video
                                src={video}
                                className={styles.videoThumbnailVideo}
                                muted
                                preload="metadata"
                                onLoadedMetadata={e => {
                                  // 设置视频第一帧作为缩略图
                                  const video = e.target as HTMLVideoElement;
                                  video.currentTime = 0.1;
                                }}
                              />
                              <div className={styles.videoThumbnailInfo}>
                                <div className={styles.videoDuration}>点击播放</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabPane>
                  )}
                </Tabs>
              ) : (
                <div className={styles.noMedia}>
                  {defaultImage}
                  <Text className={styles.noMediaText}>暂无产品图片或视频</Text>
                </div>
              )}
            </div>
          </Card>

          {/* 下边：产品参数 */}
          <Card
            className={styles.specificationsCard}
            title={
              <div className={styles.specificationsTitle}>
                <span>技术参数</span>
                {specifications && Object.keys(specifications).length > 0 && (
                  <span className={styles.parameterCount}>
                    ({Object.keys(specifications).length} 项)
                  </span>
                )}
              </div>
            }
          >
            {specifications && Object.keys(specifications).length > 0 ? (
              <Table
                data={Object.entries(specifications).map(([key, value]) => ({
                  key: key,
                  parameter: key,
                  value: value,
                }))}
                columns={[
                  {
                    title: '参数名称',
                    dataIndex: 'parameter',
                    key: 'parameter',
                    width: 200,
                    sorter: (a, b) => a.parameter.localeCompare(b.parameter),
                    render: value => <span className={styles.parameterName}>{value}</span>,
                  },
                  {
                    title: '参数值',
                    dataIndex: 'value',
                    key: 'value',
                    ellipsis: true,
                    tooltip: true,
                    render: value => <span className={styles.parameterValue}>{value}</span>,
                  },
                ]}
                pagination={false}
                className={styles.specificationsTable}
                rowKey="key"
                size="small"
                border={false}
                stripe={true}
                scroll={{ x: 400 }}
              />
            ) : (
              <div className={styles.noSpecs}>
                <Text className={styles.noSpecsText}>暂无技术参数信息</Text>
              </div>
            )}
          </Card>
        </div>

        {/* 右侧内容 - 关联图谱 */}
        <div className={styles.rightContent}>
          <Card className={styles.relationshipCard} title="关联图谱">
            <div className={styles.relationshipPlaceholder}>
              <div
                ref={containerRef}
                style={{
                  width: '100%',
                  height: '600px',
                  border: '1px solid #eee',
                  backgroundColor: '#fafafa',
                  borderRadius: '4px',
                }}
              />
              {!graphReady && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: '#999',
                  }}
                >
                  正在加载关联图谱...
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
