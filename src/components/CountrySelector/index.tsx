import { Empty, Grid, Input, Tag, Typography } from '@arco-design/web-react';
import { IconSearch } from '@arco-design/web-react/icon';
import { useMemo, useState } from 'react';
import styles from './style/index.module.less';

const { Title, Text } = Typography;
const { Row, Col } = Grid;

// 国家数据接口
interface Country {
  code: string;
  name: string;
  nameEn: string;
  continent: string;
  flag: string;
  id?: string;
}

// 洲数据
const continents = {
  asia: { name: '亚洲', nameEn: 'Asia' },
  europe: { name: '欧洲', nameEn: 'Europe' },
  america: { name: '美洲', nameEn: 'America' },
  africa: { name: '非洲', nameEn: 'Africa' },
  oceania: { name: '大洋洲', nameEn: 'Oceania' },
};

// 模拟国家数据
const countries: Country[] = [
  // 亚洲
  { code: 'CN', name: '中国', nameEn: 'China', continent: 'asia', flag: '🇨🇳', id: '1' },
  { code: 'JP', name: '日本', nameEn: 'Japan', continent: 'asia', flag: '🇯🇵' },
  { code: 'KR', name: '韩国', nameEn: 'South Korea', continent: 'asia', flag: '🇰🇷' },
  { code: 'IN', name: '印度', nameEn: 'India', continent: 'asia', flag: '🇮🇳' },
  { code: 'SG', name: '新加坡', nameEn: 'Singapore', continent: 'asia', flag: '🇸🇬' },
  { code: 'TH', name: '泰国', nameEn: 'Thailand', continent: 'asia', flag: '🇹🇭' },
  { code: 'ID', name: '印度尼西亚', nameEn: 'Indonesia', continent: 'asia', flag: '🇮🇩' },
  { code: 'MY', name: '马来西亚', nameEn: 'Malaysia', continent: 'asia', flag: '🇲🇾' },

  // 欧洲
  { code: 'US', name: '美国', nameEn: 'United States', continent: 'america', flag: '🇺🇸' },
  { code: 'GB', name: '英国', nameEn: 'United Kingdom', continent: 'europe', flag: '🇬🇧' },
  { code: 'DE', name: '德国', nameEn: 'Germany', continent: 'europe', flag: '🇩🇪' },
  { code: 'FR', name: '法国', nameEn: 'France', continent: 'europe', flag: '🇫🇷' },
  { code: 'IT', name: '意大利', nameEn: 'Italy', continent: 'europe', flag: '🇮🇹' },
  { code: 'ES', name: '西班牙', nameEn: 'Spain', continent: 'europe', flag: '🇪🇸' },
  { code: 'RU', name: '俄罗斯', nameEn: 'Russia', continent: 'europe', flag: '🇷🇺' },
  { code: 'NL', name: '荷兰', nameEn: 'Netherlands', continent: 'europe', flag: '🇳🇱' },
  { code: 'CH', name: '瑞士', nameEn: 'Switzerland', continent: 'europe', flag: '🇨🇭' },
  { code: 'SE', name: '瑞典', nameEn: 'Sweden', continent: 'europe', flag: '🇸🇪' },

  // 美洲
  { code: 'CA', name: '加拿大', nameEn: 'Canada', continent: 'america', flag: '🇨🇦' },
  { code: 'MX', name: '墨西哥', nameEn: 'Mexico', continent: 'america', flag: '🇲🇽' },
  { code: 'BR', name: '巴西', nameEn: 'Brazil', continent: 'america', flag: '🇧🇷' },
  { code: 'AR', name: '阿根廷', nameEn: 'Argentina', continent: 'america', flag: '🇦🇷' },

  // 非洲
  { code: 'ZA', name: '南非', nameEn: 'South Africa', continent: 'africa', flag: '🇿🇦' },
  { code: 'EG', name: '埃及', nameEn: 'Egypt', continent: 'africa', flag: '🇪🇬' },
  { code: 'NG', name: '尼日利亚', nameEn: 'Nigeria', continent: 'africa', flag: '🇳🇬' },

  // 大洋洲
  { code: 'AU', name: '澳大利亚', nameEn: 'Australia', continent: 'oceania', flag: '🇦🇺' },
  { code: 'NZ', name: '新西兰', nameEn: 'New Zealand', continent: 'oceania', flag: '🇳🇿' },
];

interface CountrySelectorProps {
  onSelect?: (country: Country) => void;
  onSearch?: (keyword: string) => void;
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
