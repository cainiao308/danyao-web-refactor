import { ammunitionData } from '@/config/searchConfigs/ammunitionConfig';
import { artilleryData } from '@/config/searchConfigs/artilleryConfig';
import { countryData } from '@/config/searchConfigs/countryConfig';
import { Card, Grid, Message, Tabs, Tag, Typography } from '@arco-design/web-react';
import { IconFire } from '@arco-design/web-react/icon';
import { useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from './style/index.module.less';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Row, Col } = Grid;

interface CountryDetailParams {
  id: string;
}

interface ProductItem {
  id: number;
  name: string;
  type: string;
  country: string;
  category: 'artillery' | 'ammunition';
  manufacturer: string;
  description?: string;
  specifications?: Record<string, any>;
}

function CountryDetail() {
  const { id } = useParams<CountryDetailParams>();
  const history = useHistory();

  // 根据ID查找国家数据
  const countryItem = useMemo(() => {
    return countryData.find((item: any) => item.id.toString() === id);
  }, [id]);

  // 获取该国家的火炮产品 - 使用新的关联数据
  const artilleryProducts = useMemo(() => {
    if (!countryItem || !countryItem.artilleries) return [];
    return countryItem.artilleries.map((item: any) => ({
      id: item.id,
      name: item.name,
      type: item.type,
      country: countryItem.name,
      category: 'artillery' as const,
      manufacturer: item.manufacturer,
      description: `${item.caliber}mm ${item.type}，${item.mobility}，射程 ${item.range}km。${item.name}是一款现代化的${item.type}，具有出色的性能和可靠性。`,
      specifications: {
        火炮名称: item.name,
        火炮口径: item.caliber,
        火炮类型: item.type,
        运动方式: item.mobility,
        火炮射程: item.range,
        火炮厂商: item.manufacturer,
        国家: countryItem.name,
        ...(item.muzzleVelocity && { 火炮初速: `${item.muzzleVelocity}m/s` }),
        ...(item.barrelLength && { 身管长度: `${item.barrelLength}m` }),
        ...(item.elevationRange && { 射角范围: item.elevationRange }),
        ...(item.traverseRange && { 射向范围: item.traverseRange }),
        ...(item.quantity && { 装备数量: item.quantity }),
        ...(item.ammunition && { 配套弹药: item.ammunition }),
      },
    }));
  }, [countryItem]);

  // 获取该国家的弹药产品 - 使用新的关联数据
  const ammunitionProducts = useMemo(() => {
    if (!countryItem || !countryItem.ammunitions) return [];
    return countryItem.ammunitions.map((item: any) => ({
      id: item.id,
      name: item.name,
      type: item.type,
      country: countryItem.name,
      category: 'ammunition' as const,
      manufacturer: item.manufacturer,
      description: `${item.caliber}mm ${item.type}，${item.guidance}制导。${item.name}是一款高性能的${item.type}，具有出色的精度和威力。`,
      specifications: {
        弹药名称: item.name,
        简称: item.abbreviation,
        口径: item.caliber,
        类型: item.type,
        制导方式: item.guidance,
        厂商: item.manufacturer,
        生产国家: countryItem.name,
        ...(item.weight && { 重量: `${item.weight}kg` }),
        ...(item.length && { 长度: `${item.length}mm` }),
        ...(item.minRange && { 最小射程: `${item.minRange}km` }),
        ...(item.maxRange && { 最大射程: `${item.maxRange}km` }),
        ...(item.accuracy && { 精度: `${item.accuracy}m` }),
        ...(item.power && { 威力: item.power }),
      },
    }));
  }, [countryItem]);

  // 生成国家简介
  const generateCountryDescription = (country: any) => {
    const descriptions: { [key: string]: string } = {
      阿联酋:
        '1、概况\n阿联酋的武装力量共计6.3万人，包括陆军（4.4万人）、海军（0.25万人）、空军（0.4万人），总统卫队（1.2万人）。部队在海湾合作委员会所有国家中是训练最好、能力最强的。阿联酋执行多元化外交政策，拥有一个法国基地和一支小规模韩国驻军，同时与中国保持良好关系，但美国仍然是该国主要的防务合作伙伴。\n2、主要作战威胁\n由于霍尔木兹海峡领土争端等原因，阿联酋的主要作战假想敌为伊朗，其积极参与了也门冲突，2015年起，阿联酋开始对伊朗支持的胡塞武装作战，消耗大量财力物力，对国内经济发展造成影响的同时，也损害了阿联酋的国际形象，同时胡塞武装通过无人机频繁袭击阿联酋本土，因此在2019年底，阿联酋从也门临时首都亚丁撤出了主力作战部队，将控制权移交给了沙特部队。在此之后，阿联酋仅间接参与对胡塞武装作战。在巴以冲突方面，阿联酋支持巴勒斯坦，反对以色列，但态度较为温和，仅在外交舆论方面谴责以色列，并未直接参与。2020年8月，阿联酋同以色列达成《亚伯拉罕协议》，成为第3个与以色列建立正式关系的阿拉伯国家，体现了其多元自主的外交策略。\n3、国防工业\n该国最大的军工企业为EDGE集团，据其官方网站信息及防务展宣传，该公司已与具备制式迫弹生产研制能力以及陆地、空中无人装备的部分研制能力。EDGE公司自2019成立以来，收入和投资组合规模实现了显着增长，但除了向阿联酋武装部队销售之外，国际社会仍然普遍对这种增长的可持续性存在疑问。',
      中国: '中国是世界上最大的发展中国家，拥有完整的工业体系和强大的国防科技实力。在军事装备领域，中国在火炮、弹药、导弹等武器系统方面取得了显著成就，形成了具有自主知识产权的装备体系。',
      美国: '美国是全球军事技术最先进的国家之一，拥有世界领先的国防工业基础。在火炮系统、精确制导弹药、防空系统等领域处于世界领先地位，其装备以高精度、高可靠性著称。',
      俄罗斯:
        '俄罗斯继承了苏联强大的军事工业基础，在重型武器系统方面具有传统优势。其火炮、导弹技术在世界上享有盛誉，特别是在大口径火炮和远程打击武器方面表现突出。',
      德国: '德国以其精密制造工艺和先进技术闻名于世，在军事装备领域也不例外。德国的火炮系统以高精度、高机动性和先进火控系统著称，代表了欧洲军事技术的最高水平。',
      法国: '法国在军事装备领域具有独特的优势，其装备设计注重实用性和创新性。在火炮、导弹等武器系统方面，法国产品以高机动性、高精度和良好的适应性著称。',
      英国: '英国拥有悠久的军事工业传统，在火炮、装甲车辆等装备领域具有丰富经验。英国装备以可靠性高、维护性好著称，在多个国际冲突中证明了其有效性。',
      以色列:
        '以色列虽然国土面积小，但在军事技术方面具有世界级水平。其装备以创新性强、适应性强著称，在火炮、导弹、防空系统等领域都有突出表现。',
      韩国: '韩国在军事装备领域发展迅速，通过技术引进和自主创新，在火炮、装甲车辆等装备方面取得了显著进步，其产品在国际市场上具有一定竞争力。',
    };

    return (
      descriptions[country.name] ||
      `${country.name}是一个重要的军事装备生产国，在火炮、弹药等武器系统方面具有丰富的研发和生产经验。`
    );
  };

  // 处理产品点击
  const handleProductClick = (product: ProductItem) => {
    if (product.category === 'artillery') {
      history.push(`/user/artillery-detail/${product.id}`);
    } else if (product.category === 'ammunition') {
      history.push(`/user/ammunition-detail/${product.id}`);
    }
  };

  // 如果找不到国家数据
  if (!countryItem) {
    Message.error('未找到该国家信息');
    history.replace('/user/country-search');
    return null;
  }

  return (
    <div className={styles.container}>
      {/* 主要内容 */}
      <div className={styles.mainContent}>
        {/* 左侧内容 */}
        <div className={styles.leftContent}>
          {/* 国家基本信息 */}
          <Card className={styles.countryInfoCard}>
            <div className={styles.countryHeader}>
              {/* <div className={styles.flagContainer}>
                <Image
                  src={getFlagUrl(countryItem.name)}
                  alt={`${countryItem.name}国旗`}
                  className={styles.countryFlag}
                  error="https://via.placeholder.com/120x80?text=国旗"
                />
              </div> */}
              <div className={styles.countryBasicInfo}>
                <Title heading={1} className={styles.countryName}>
                  {countryItem.name}
                </Title>
                <Paragraph className={styles.countryDescription}>
                  {generateCountryDescription(countryItem)}
                </Paragraph>
                <div className={styles.countryMeta}>
                  <Tag color="blue" className={styles.regionTag}>
                    {countryItem.region}
                  </Tag>
                  <Tag color="green" className={styles.productsCountTag}>
                    {artilleryProducts.length + ammunitionProducts.length} 个产品
                  </Tag>
                </div>
              </div>
            </div>
          </Card>

          {/* 关联产品 - 使用Tab形式 */}
          <Card className={styles.productsCard} title="关联产品">
            <Tabs defaultActiveTab="artillery" className={styles.productTabs} type="rounded">
              <TabPane
                key="artillery"
                title={
                  <span>
                    <IconFire /> 火炮系统 ({artilleryProducts.length})
                  </span>
                }
              >
                {artilleryProducts.length > 0 ? (
                  <div className={styles.productGrid}>
                    {artilleryProducts.map(product => (
                      <div
                        key={product.id}
                        className={styles.productCard}
                        onClick={() => handleProductClick(product)}
                      >
                        <div className={styles.productHeader}>
                          <div className={styles.productIcon}>🔥</div>
                          <div className={styles.productInfo}>
                            <div className={styles.productName}>{product.name}</div>
                            <div className={styles.productType}>{product.type}</div>
                            <div className={styles.productManufacturer}>{product.manufacturer}</div>
                          </div>
                        </div>
                        <div className={styles.productDescription}>{product.description}</div>
                        <div className={styles.productSpecs}>
                          {product.specifications && (
                            <Row gutter={[8, 8]}>
                              {Object.entries(product.specifications)
                                .slice(0, 4)
                                .map(([key, value]) => (
                                  <Col key={key} span={12}>
                                    <div className={styles.specItem}>
                                      <span className={styles.specLabel}>{key}:</span>
                                      <span className={styles.specValue}>{value}</span>
                                    </div>
                                  </Col>
                                ))}
                            </Row>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noProducts}>
                    <Text className={styles.noProductsText}>暂无火炮产品信息</Text>
                  </div>
                )}
              </TabPane>

              <TabPane
                key="ammunition"
                title={
                  <span>
                    <IconFire /> 弹药系统 ({ammunitionProducts.length})
                  </span>
                }
              >
                {ammunitionProducts.length > 0 ? (
                  <div className={styles.productGrid}>
                    {ammunitionProducts.map(product => (
                      <div
                        key={product.id}
                        className={styles.productCard}
                        onClick={() => handleProductClick(product)}
                      >
                        <div className={styles.productHeader}>
                          <div className={styles.productIcon}>💥</div>
                          <div className={styles.productInfo}>
                            <div className={styles.productName}>{product.name}</div>
                            <div className={styles.productType}>{product.type}</div>
                            <div className={styles.productManufacturer}>{product.manufacturer}</div>
                          </div>
                        </div>
                        <div className={styles.productDescription}>{product.description}</div>
                        <div className={styles.productSpecs}>
                          {product.specifications && (
                            <Row gutter={[8, 8]}>
                              {Object.entries(product.specifications)
                                .slice(0, 4)
                                .map(([key, value]) => (
                                  <Col key={key} span={12}>
                                    <div className={styles.specItem}>
                                      <span className={styles.specLabel}>{key}:</span>
                                      <span className={styles.specValue}>{value}</span>
                                    </div>
                                  </Col>
                                ))}
                            </Row>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noProducts}>
                    <Text className={styles.noProductsText}>暂无弹药产品信息</Text>
                  </div>
                )}
              </TabPane>
            </Tabs>
          </Card>
        </div>

        {/* 右侧内容 */}
        <div className={styles.rightContent}>
          {/* 制造商信息 */}
          <Card className={styles.manufacturersCard} title="主要制造商">
            {countryItem.manufacturers.length > 0 ? (
              <div className={styles.manufacturersList}>
                {countryItem.manufacturers.map((manufacturer, index) => (
                  <div key={index} className={styles.manufacturerItem}>
                    <div className={styles.manufacturerIcon}>🏭</div>
                    <div className={styles.manufacturerName}>{manufacturer}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noManufacturers}>
                <Text className={styles.noManufacturersText}>暂无制造商信息</Text>
              </div>
            )}
          </Card>

          {/* 地区信息 */}
          <Card className={styles.regionCard} title="地区信息">
            <div className={styles.regionInfo}>
              <div className={styles.regionIcon}>🌍</div>
              <div className={styles.regionDetails}>
                <div className={styles.regionName}>{countryItem.region}</div>
                <div className={styles.regionDescription}>
                  {countryItem.region === '亚洲' &&
                    '亚洲是世界上最大的大陆，拥有丰富的自然资源和多样化的文化。'}
                  {countryItem.region === '欧洲' &&
                    '欧洲是工业革命的发源地，拥有先进的科技和制造业基础。'}
                  {countryItem.region === '北美洲' && '北美洲拥有发达的科技产业和强大的经济实力。'}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CountryDetail;
