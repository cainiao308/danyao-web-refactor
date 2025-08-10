import { countryData } from '@/config/searchConfigs/countryConfig';
import { ammunitionData } from '@/config/searchConfigs/ammunitionConfig';
import { artilleryData } from '@/config/searchConfigs/artilleryConfig';

// 模拟API延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 搜索结果接口类型
export interface SearchResult<T = Record<string, unknown>> {
  data: T[];
  total: number;
  keyword: string;
  suggestions?: string[];
}

// 通用搜索函数
async function searchData<T extends Record<string, unknown>>(
  data: T[],
  keyword: string,
  searchFields: string[],
  pageSize = 50
): Promise<SearchResult<T>> {
  // 模拟网络延迟
  await delay(800 + Math.random() * 700); // 800-1500ms

  if (!keyword.trim()) {
    return {
      data: data.slice(0, pageSize),
      total: data.length,
      keyword: '',
      suggestions: [],
    };
  }

  // 执行搜索
  const filteredData = data.filter(item =>
    searchFields.some(field => {
      const fieldValue = item[field];
      if (typeof fieldValue === 'string') {
        return fieldValue.toLowerCase().includes(keyword.toLowerCase());
      }
      if (typeof fieldValue === 'number') {
        return fieldValue.toString().includes(keyword);
      }
      if (Array.isArray(fieldValue)) {
        return fieldValue.some(val => val.toString().toLowerCase().includes(keyword.toLowerCase()));
      }
      return false;
    })
  );

  // 生成搜索建议
  const suggestions = generateSuggestions(data, keyword, searchFields);

  return {
    data: filteredData.slice(0, pageSize),
    total: filteredData.length,
    keyword,
    suggestions,
  };
}

// 生成搜索建议
function generateSuggestions<T extends Record<string, unknown>>(
  data: T[],
  keyword: string,
  searchFields: string[]
): string[] {
  const suggestions = new Set<string>();

  data.forEach(item => {
    searchFields.forEach(field => {
      const fieldValue = item[field];
      if (typeof fieldValue === 'string') {
        const words = fieldValue.split(/\s+/);
        words.forEach(word => {
          if (word.toLowerCase().includes(keyword.toLowerCase()) && word.length > keyword.length) {
            suggestions.add(word);
          }
        });
      }
    });
  });

  return Array.from(suggestions).slice(0, 5);
}

// 国家搜索API
export async function searchCountries(
  keyword: string
): Promise<SearchResult<Record<string, unknown>>> {
  return searchData(
    countryData,
    keyword,
    ['name', 'nameEn', 'region', 'products', 'manufacturers'],
    20
  );
}

// 弹药搜索API
export async function searchAmmunition(
  keyword: string
): Promise<SearchResult<Record<string, unknown>>> {
  return searchData(
    ammunitionData,
    keyword,
    ['name', 'abbreviation', 'caliber', 'type', 'manufacturer', 'country'],
    30
  );
}

// 火炮搜索API
export async function searchArtillery(
  keyword: string
): Promise<SearchResult<Record<string, unknown>>> {
  return searchData(
    artilleryData,
    keyword,
    ['name', 'caliber', 'type', 'manufacturer', 'country'],
    25
  );
}

// 统一搜索API（可搜索所有类型）
export async function searchAll(keyword: string): Promise<{
  countries: SearchResult;
  ammunition: SearchResult;
  artillery: SearchResult;
}> {
  const [countries, ammunition, artillery] = await Promise.all([
    searchCountries(keyword),
    searchAmmunition(keyword),
    searchArtillery(keyword),
  ]);

  return { countries, ammunition, artillery };
}

// 获取热门搜索关键词
export async function getHotKeywords(): Promise<string[]> {
  await delay(300);
  return [
    '美国',
    '俄罗斯',
    '中国',
    '德国',
    '法国',
    '榴弹炮',
    '导弹',
    '火箭炮',
    '迫击炮',
    '155mm',
    '120mm',
    '105mm',
  ];
}

// 获取搜索历史
export async function getSearchHistory(): Promise<string[]> {
  await delay(200);
  const history = localStorage.getItem('search_history');
  return history ? JSON.parse(history) : [];
}

// 保存搜索历史
export function saveSearchHistory(keyword: string): void {
  if (!keyword.trim()) return;

  const history = JSON.parse(localStorage.getItem('search_history') || '[]');
  const newHistory = [keyword, ...history.filter((h: string) => h !== keyword)].slice(0, 10);
  localStorage.setItem('search_history', JSON.stringify(newHistory));
}
