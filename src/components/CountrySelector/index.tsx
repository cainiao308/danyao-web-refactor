import { Button, Input, Grid, Tag, Typography, Empty } from '@arco-design/web-react';
import { IconSearch } from '@arco-design/web-react/icon';
import { useMemo, useState } from 'react';
import { countryData } from '@/config/searchConfigs/countryConfig';
import styles from './style/index.module.less';

const { Title, Text } = Typography;
const { Row, Col } = Grid;

// 洲际信息
const continents = {
  asia: { name: '亚洲', nameEn: 'Asia' },
  europe: { name: '欧洲', nameEn: 'Europe' },
  america: { name: '美洲', nameEn: 'America' },
  africa: { name: '非洲', nameEn: 'Africa' },
  oceania: { name: '大洋洲', nameEn: 'Oceania' },
};

// 将countryData转换为CountrySelector需要的格式
console.log('原始countryData:', countryData);

const countries = countryData.map(country => ({
  id: country.id,
  code: country.nameEn.substring(0, 2).toUpperCase(), // 从英文名生成代码
  name: country.name,
  nameEn: country.nameEn,
  continent:
    country.region === '亚洲'
      ? 'asia'
      : country.region === '欧洲'
      ? 'europe'
      : country.region === '北美洲'
      ? 'america'
      : country.region === '南美洲'
      ? 'america'
      : country.region === '非洲'
      ? 'africa'
      : country.region === '大洋洲'
      ? 'oceania'
      : 'asia',
  flag: '🏳️', // 默认国旗，可以根据需要添加更多
  // 添加装备数量信息
  artilleryCount: country.artilleries ? country.artilleries.length : 0,
  ammunitionCount: country.ammunitions ? country.ammunitions.length : 0,
  totalEquipment:
    (country.artilleries ? country.artilleries.length : 0) +
    (country.ammunitions ? country.ammunitions.length : 0),
}));

console.log('转换后的countries:', countries);

// 为一些主要国家添加特定的国旗
const flagMap: Record<string, string> = {
  // 亚洲
  中国: '🇨🇳',
  美国: '🇺🇸',
  俄罗斯: '🇷🇺',
  德国: '🇩🇪',
  法国: '🇫🇷',
  英国: '🇬🇧',
  以色列: '🇮🇱',
  韩国: '🇰🇷',
  阿联酋: '🇦🇪',
  日本: '🇯🇵',
  印度: '🇮🇳',
  新加坡: '🇸🇬',
  泰国: '🇹🇭',
  印度尼西亚: '🇮🇩',
  马来西亚: '🇲🇾',
  越南: '🇻🇳',
  菲律宾: '🇵🇭',
  孟加拉国: '🇧🇩',
  巴基斯坦: '🇵🇰',
  土耳其: '🇹🇷',
  沙特阿拉伯: '🇸🇦',
  伊朗: '🇮🇷',
  伊拉克: '🇮🇶',
  斯里兰卡: '🇱🇰',
  缅甸: '🇲🇲',
  柬埔寨: '🇰🇭',
  老挝: '🇱🇦',
  蒙古: '🇲🇳',
  尼泊尔: '🇳🇵',
  不丹: '🇧🇹',
  马尔代夫: '🇲🇻',
  约旦: '🇯🇴',
  黎巴嫩: '🇱🇧',
  叙利亚: '🇸🇾',
  也门: '🇾🇪',
  阿曼: '🇴🇲',
  卡塔尔: '🇶🇦',
  科威特: '🇰🇼',
  巴林: '🇧🇭',
  塞浦路斯: '🇨🇾',
  亚美尼亚: '🇦🇲',
  阿塞拜疆: '🇦🇿',
  格鲁吉亚: '🇬🇪',
  吉尔吉斯斯坦: '🇰🇬',
  塔吉克斯坦: '🇹🇯',
  土库曼斯坦: '🇹🇲',
  乌兹别克斯坦: '🇺🇿',
  哈萨克斯坦: '🇰🇿',

  // 欧洲
  荷兰: '🇳🇱',
  瑞士: '🇨🇭',
  瑞典: '🇸🇪',
  挪威: '🇳🇴',
  丹麦: '🇩🇰',
  芬兰: '🇫🇮',
  波兰: '🇵🇱',
  捷克: '🇨🇿',
  奥地利: '🇦🇹',
  比利时: '🇧🇪',
  爱尔兰: '🇮🇪',
  葡萄牙: '🇵🇹',
  希腊: '🇬🇷',
  匈牙利: '🇭🇺',
  罗马尼亚: '🇷🇴',
  保加利亚: '🇧🇬',
  克罗地亚: '🇭🇷',
  斯洛文尼亚: '🇸🇮',
  斯洛伐克: '🇸🇰',
  立陶宛: '🇱🇹',
  拉脱维亚: '🇱🇻',
  爱沙尼亚: '🇪🇪',
  卢森堡: '🇱🇺',
  马耳他: '🇲🇹',
  冰岛: '🇮🇸',
  阿尔巴尼亚: '🇦🇱',
  北马其顿: '🇲🇰',
  塞尔维亚: '🇷🇸',
  黑山: '🇲🇪',
  波斯尼亚和黑塞哥维那: '🇧🇦',
  摩尔多瓦: '🇲🇩',
  乌克兰: '🇺🇦',
  白俄罗斯: '🇧🇾',

  // 美洲
  加拿大: '🇨🇦',
  墨西哥: '🇲🇽',
  巴西: '🇧🇷',
  阿根廷: '🇦🇷',
  智利: '🇨🇱',
  哥伦比亚: '🇨🇴',
  秘鲁: '🇵🇪',
  委内瑞拉: '🇻🇪',
  乌拉圭: '🇺🇾',
  厄瓜多尔: '🇪🇨',
  玻利维亚: '🇧🇴',
  巴拉圭: '🇵🇾',
  危地马拉: '🇬🇹',
  洪都拉斯: '🇭🇳',
  萨尔瓦多: '🇸🇻',
  尼加拉瓜: '🇳🇮',
  哥斯达黎加: '🇨🇷',
  巴拿马: '🇵🇦',
  古巴: '🇨🇺',
  牙买加: '🇯🇲',
  海地: '🇭🇹',
  多米尼加: '🇩🇴',

  // 非洲
  南非: '🇿🇦',
  埃及: '🇪🇬',
  尼日利亚: '🇳🇬',
  埃塞俄比亚: '🇪🇹',
  肯尼亚: '🇰🇪',
  坦桑尼亚: '🇹🇿',
  乌干达: '🇺🇬',
  加纳: '🇬🇭',
  科特迪瓦: '🇨🇮',
  塞内加尔: '🇸🇳',
  马里: '🇲🇱',
  马达加斯加: '🇲🇬',
  毛里求斯: '🇲🇺',
  塞舌尔: '🇸🇨',
  科摩罗: '🇰🇲',
  吉布提: '🇩🇯',
  索马里: '🇸🇴',
  厄立特里亚: '🇪🇷',
  卢旺达: '🇷🇼',
  布隆迪: '🇧🇮',
  中非共和国: '🇨🇫',
  刚果共和国: '🇨🇬',
  刚果民主共和国: '🇨🇩',
  加蓬: '🇬🇦',
  赤道几内亚: '🇬🇶',
  喀麦隆: '🇨🇲',
  圣多美和普林西比: '🇸🇹',
  佛得角: '🇨🇻',
  冈比亚: '🇬🇲',
  几内亚比绍: '🇬🇼',
  几内亚: '🇬🇳',
  塞拉利昂: '🇸🇱',
  利比里亚: '🇱🇷',
  多哥: '🇹🇬',
  贝宁: '🇧🇯',
  南苏丹: '🇸🇸',

  // 大洋洲
  澳大利亚: '🇦🇺',
  新西兰: '🇳🇿',
  斐济: '🇫🇯',
  巴布亚新几内亚: '🇵🇬',
  新喀里多尼亚: '🇳🇨',
  法属波利尼西亚: '🇵🇫',
  瓦努阿图: '🇻🇺',
  所罗门群岛: '🇸🇧',
  汤加: '🇹🇴',
  萨摩亚: '🇼🇸',
  基里巴斯: '🇰🇮',
  图瓦卢: '🇹🇻',
  瑙鲁: '🇳🇷',
  帕劳: '🇵🇼',
  马绍尔群岛: '🇲🇭',
  密克罗尼西亚: '🇫🇲',
};

// 更新国旗
countries.forEach(country => {
  if (flagMap[country.name]) {
    country.flag = flagMap[country.name];
  } else {
    // 如果没有找到国旗，使用默认的
    console.log(`未找到 ${country.name} 的国旗，使用默认国旗`);
  }
});

// 调试：检查哪些国家没有国旗
console.log(
  '国家列表：',
  countries.map(c => ({ name: c.name, flag: c.flag }))
);

interface Country {
  id: number;
  code: string;
  name: string;
  nameEn: string;
  continent: string;
  flag: string;
  artilleryCount: number;
  ammunitionCount: number;
  totalEquipment: number;
}

interface CountrySelectorProps {
  onSelect?: (country: Country) => void;
  onSearch?: (value: string) => void;
  title?: string;
}

function CountrySelector({ onSelect, onSearch, title = '选择国家' }: CountrySelectorProps) {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  // 过滤国家
  const filteredCountries = useMemo(() => {
    if (!searchValue) return countries;

    const keyword = searchValue.toLowerCase();
    return countries.filter(
      country =>
        country.name.toLowerCase().includes(keyword) ||
        country.nameEn.toLowerCase().includes(keyword) ||
        country.code.toLowerCase().includes(keyword)
    );
  }, [searchValue]);

  // 按洲分组
  const groupedCountries = useMemo(() => {
    const groups: Record<string, Country[]> = {};

    filteredCountries.forEach(country => {
      if (!groups[country.continent]) {
        groups[country.continent] = [];
      }
      groups[country.continent].push(country);
    });

    return groups;
  }, [filteredCountries]);

  const handleCountryClick = (country: Country) => {
    console.log('🚀 ~ handleCountryClick ~ country:', country);
    setSelectedCountry(country);
    onSelect?.(country);
  };

  return (
    <div className={styles.container}>
      {/* 标题 */}
      <div className={styles.header}>
        <Title heading={2} className={styles.title}>
          {title}
        </Title>
      </div>

      {/* 搜索框 */}
      <div className={styles.searchSection}>
        <Input
          value={searchValue}
          onChange={setSearchValue}
          placeholder="搜索国家名称或代码..."
          prefix={<IconSearch />}
          size="large"
          style={{ width: 600, borderRadius: '8px', height: 48 }}
          allowClear
          onPressEnter={() => {
            if (searchValue.trim() && onSearch) {
              onSearch(searchValue.trim());
            }
          }}
        />
      </div>

      {/* 国家列表 */}
      <div className={styles.countryList}>
        {Object.entries(groupedCountries).map(([continentCode, countryList]) => (
          <>
            <div className={styles.continentHeader}>
              <Title heading={5} className={styles.continentTitle}>
                {continents[continentCode as keyof typeof continents]?.name}
                <Text className={styles.continentTitleEn}>
                  {continents[continentCode as keyof typeof continents]?.nameEn}
                </Text>
              </Title>
              <Tag color="blue" className={styles.countTag}>
                {countryList.length} 个国家
              </Tag>
            </div>

            <Row gutter={[16, 16]} className={styles.countryGrid}>
              {countryList.map(country => (
                <Col key={country.code} xs={12} sm={8} md={6} lg={4} xl={3}>
                  <div
                    className={`${styles.countryItem} ${
                      selectedCountry?.code === country.code ? styles.selected : ''
                    }`}
                    onClick={() => handleCountryClick(country)}
                  >
                    <div className={styles.flagSection}>
                      <span className={styles.flag}>{country.flag}</span>
                    </div>
                    <div className={styles.nameSection}>
                      <div className={styles.countryName}>{country.name}</div>
                      <div className={styles.countryNameEn}>{country.nameEn}</div>
                      <div className={styles.countryCode}>{country.code}</div>
                      {country.totalEquipment > 0 && (
                        <div className={styles.equipmentInfo}>
                          <span className={styles.equipmentCount}>
                            🔥 {country.artilleryCount} 火炮
                          </span>
                          <span className={styles.equipmentCount}>
                            💥 {country.ammunitionCount} 弹药
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </>
        ))}
      </div>

      {/* 搜索无结果 */}
      {searchValue && filteredCountries.length === 0 && <Empty />}
    </div>
  );
}

export default CountrySelector;
