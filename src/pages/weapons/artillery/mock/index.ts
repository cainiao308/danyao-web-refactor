import Mock from 'mockjs';
import qs from 'query-string';

// 火炮类型枚举
export const ArtilleryTypes = [
  '榴弹炮',
  '加农炮',
  '火箭炮',
  '迫击炮',
  '高射炮',
  '反坦克炮',
  '自行火炮',
  '牵引火炮',
  '海军舰炮',
  '坦克炮',
];

// 运动方式枚举
export const MobilityTypes = [
  '履带式',
  '轮式',
  '牵引式',
  '固定式',
  '铁路式',
  '舰载式',
  '自行式',
  '便携式',
];

// 生成Mock数据
const generateArtilleryData = () => {
  const data = [];
  for (let i = 1; i <= 100; i++) {
    data.push({
      id: `ART${String(i).padStart(4, '0')}`,
      name:
        Mock.Random.pick([
          'PLZ-05自行榴弹炮',
          'M777超轻型榴弹炮',
          'PzH 2000自行榴弹炮',
          'CAESAR自行榴弹炮',
          'M109帕拉丁自行榴弹炮',
          'K9雷鸣自行榴弹炮',
          '2S19姆斯塔河自行榴弹炮',
          'FH77火炮系统',
          'M198榴弹炮',
          '卡秋莎火箭炮',
        ]) + Mock.Random.string('upper', 1, 2),
      caliber: Mock.Random.pick([105, 120, 122, 125, 130, 152, 155, 175, 203, 240]),
      type: Mock.Random.pick(ArtilleryTypes),
      mobility: Mock.Random.pick(MobilityTypes),
      muzzleVelocity: Mock.Random.integer(400, 1200),
      range: Mock.Random.float(10, 70, 1, 1),
      barrelLength: Mock.Random.float(4, 15, 1, 1),
      elevationRange: `${Mock.Random.integer(-5, 5)}° ~ ${Mock.Random.integer(45, 85)}°`,
      traverseRange: `${Mock.Random.integer(-180, -90)}° ~ ${Mock.Random.integer(90, 180)}°`,
      manufacturer: Mock.Random.pick([
        '中国北方工业公司',
        '中国兵器工业集团',
        '美国通用动力',
        '美国BAE系统',
        '德国莱茵金属',
        '德国克劳斯-玛菲',
        '法国奈克斯特',
        '俄罗斯乌拉尔机车厂',
        '韩国韩华系统',
        '以色列埃尔比特',
      ]),
      country: Mock.Random.pick([
        '中国',
        '美国',
        '德国',
        '法国',
        '俄罗斯',
        '韩国',
        '以色列',
        '英国',
        '意大利',
        '瑞典',
      ]),
      createdTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    });
  }
  return data;
};

const artilleryData = generateArtilleryData();

Mock.mock(new RegExp('/api/weapons/artillery'), params => {
  const { url } = params;
  const parsed = qs.parseUrl(url);
  const { query } = parsed;
  const { page = 1, pageSize = 10, name, caliber, type, manufacturer, country } = query;

  let filteredData = artilleryData;

  // 过滤逻辑
  if (name) {
    filteredData = filteredData.filter(item =>
      item.name.toLowerCase().includes(name.toLowerCase())
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
