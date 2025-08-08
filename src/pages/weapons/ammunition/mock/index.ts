import Mock from 'mockjs';
import qs from 'query-string';

// 弹药类型枚举
export const AmmunitionTypes = [
  '反坦克导弹',
  '空对空导弹',
  '空对地导弹',
  '地对空导弹',
  '地对地导弹',
  '巡航导弹',
  '火箭弹',
  '炮弹',
  '鱼雷',
  '深水炸弹',
];

// 制导控制方式枚举
export const GuidanceTypes = [
  '激光制导',
  '红外制导',
  '雷达制导',
  '卫星制导',
  '惯性制导',
  '电视制导',
  '线控制导',
  '无制导',
];

// 威力等级枚举
export const PowerLevels = ['低', '中', '高', '极高'];

// 生成Mock数据
const generateAmmunitionData = () => {
  const data = [];
  for (let i = 1; i <= 100; i++) {
    data.push({
      id: `AMM${String(i).padStart(4, '0')}`,
      name:
        Mock.Random.pick([
          '红箭-12反坦克导弹',
          'AGM-114地狱火导弹',
          'AIM-120先进中程空对空导弹',
          '东风-21中程弹道导弹',
          '战斧巡航导弹',
          'RPG-7火箭推进榴弹',
          '155mm榴弹炮弹',
          'MK48重型鱼雷',
          '飞鱼反舰导弹',
          'SA-2地对空导弹',
        ]) + Mock.Random.string('upper', 1, 3),
      abbreviation: Mock.Random.string('upper', 2, 6),
      caliber: Mock.Random.pick([105, 120, 125, 155, 203, 240, 300, 500, 600, 750]),
      weight: Mock.Random.float(10, 2000, 1, 1),
      length: Mock.Random.integer(500, 8000),
      minRange: Mock.Random.float(0.1, 5, 1, 1),
      maxRange: Mock.Random.float(10, 500, 1, 1),
      accuracy: Mock.Random.integer(1, 100),
      power: Mock.Random.pick(PowerLevels),
      type: Mock.Random.pick(AmmunitionTypes),
      guidance: Mock.Random.pick(GuidanceTypes),
      manufacturer: Mock.Random.pick([
        '中国兵器工业集团',
        '洛克希德·马丁',
        '雷神公司',
        '波音公司',
        '通用动力',
        '诺斯罗普·格鲁曼',
        'MBDA',
        '塔勒斯集团',
        '俄罗斯战术导弹公司',
        '以色列航空航天工业',
      ]),
      country: Mock.Random.pick([
        '中国',
        '美国',
        '俄罗斯',
        '法国',
        '德国',
        '英国',
        '以色列',
        '意大利',
        '瑞典',
        '韩国',
      ]),
      createdTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    });
  }
  return data;
};

const ammunitionData = generateAmmunitionData();

Mock.mock(new RegExp('/api/weapons/ammunition'), params => {
  const { url } = params;
  const parsed = qs.parseUrl(url);
  const { query } = parsed;
  const {
    page = 1,
    pageSize = 10,
    name,
    abbreviation,
    caliber,
    type,
    manufacturer,
    country,
  } = query;

  let filteredData = ammunitionData;

  // 过滤逻辑
  if (name) {
    filteredData = filteredData.filter(item =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  if (abbreviation) {
    filteredData = filteredData.filter(item =>
      item.abbreviation.toLowerCase().includes(abbreviation.toLowerCase())
    );
  }
  if (caliber) {
    filteredData = filteredData.filter(item => item.caliber.toString().includes(caliber));
  }
  if (type && Array.isArray(type)) {
    filteredData = filteredData.filter(item => type.includes(item.type));
  }
  if (manufacturer) {
    filteredData = filteredData.filter(item =>
      item.manufacturer.toLowerCase().includes(manufacturer.toLowerCase())
    );
  }
  if (country) {
    filteredData = filteredData.filter(item =>
      item.country.toLowerCase().includes(country.toLowerCase())
    );
  }

  // 分页
  const total = filteredData.length;
  const start = (page - 1) * pageSize;
  const end = start + parseInt(pageSize, 10);
  const paginatedData = filteredData.slice(start, end);

  return {
    list: paginatedData,
    total,
  };
});
