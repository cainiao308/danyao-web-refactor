# 通用搜索组件 (UniversalSearch)

## 概述

`UniversalSearch` 是一个高度可复用的搜索组件，为三个检索页面（国家检索、弹药检索、火炮检索）提供统一的搜索界面和功能。

## 功能特色

### 🔍 **强大的搜索能力**

- **多字段搜索**：支持在多个字段中同时搜索
- **智能匹配**：支持字符串、数字、数组字段的搜索
- **URL 参数支持**：从 URL 参数自动获取搜索关键词
- **搜索建议**：提供智能搜索建议

### 🎨 **完整的用户界面**

- **Google 风格搜索框**：统一的搜索体验
- **快速筛选**：页面内快速筛选功能
- **搜索标签**：显示当前搜索条件
- **响应式设计**：适配各种屏幕尺寸

### 📊 **灵活的表格展示**

- **自定义列配置**：灵活定义表格列
- **排序功能**：支持列排序
- **分页控制**：完整的分页功能
- **自适应宽度**：表格自动适配内容

## 组件接口

### Props

```typescript
interface UniversalSearchProps {
  title: string; // 页面标题
  placeholder?: string; // 搜索框占位符
  suggestions?: string[]; // 搜索建议列表
  data: Record<string, unknown>[]; // 数据源
  columns: SearchColumn[]; // 表格列配置
  searchFields: string[]; // 可搜索的字段
  onSearch?: (value: string) => void; // 搜索回调
  onFilter?: (filteredData: Record<string, unknown>[]) => void; // 筛选回调
  pageSize?: number; // 每页显示条数
  showQuickFilter?: boolean; // 是否显示快速筛选
  className?: string; // 自定义样式类
}
```

### SearchColumn 接口

```typescript
interface SearchColumn {
  title: string; // 列标题
  dataIndex: string; // 数据字段名
  width?: number; // 列宽度
  render?: (value: unknown, record: unknown) => React.ReactNode; // 自定义渲染
  sorter?: (a: unknown, b: unknown) => number; // 排序函数
  ellipsis?: boolean; // 文本省略
}
```

## 使用示例

### 基本用法

```tsx
import UniversalSearch from '@/components/UniversalSearch';
import { myData, myColumns, mySearchFields, mySuggestions } from './config';

function MySearchPage() {
  return (
    <UniversalSearch
      title="我的搜索页面"
      placeholder="搜索内容..."
      data={myData}
      columns={myColumns}
      searchFields={mySearchFields}
      suggestions={mySuggestions}
      pageSize={10}
    />
  );
}
```

### 配置数据结构

#### 1. 数据源 (data)

```typescript
const myData = [
  {
    id: 1,
    name: '产品名称',
    type: '产品类型',
    manufacturer: '制造商',
    country: '国家',
  },
  // ... 更多数据
];
```

#### 2. 列配置 (columns)

```typescript
const myColumns: SearchColumn[] = [
  {
    title: '产品名称',
    dataIndex: 'name',
    width: 200,
    render: value => <Text strong>{value}</Text>,
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: 120,
    render: value => <Tag color="blue">{value}</Tag>,
  },
  // ... 更多列
];
```

#### 3. 搜索字段 (searchFields)

```typescript
const mySearchFields = ['name', 'type', 'manufacturer', 'country'];
```

#### 4. 搜索建议 (suggestions)

```typescript
const mySuggestions = ['建议1', '建议2', '建议3'];
```

## 已实现的页面

### 🌍 国家检索

- **数据源**: `countryData` - 8 个国家的信息
- **搜索字段**: 国家名称、英文名称、地区、产品、厂商
- **特色功能**: 多语言搜索、产品标签展示

### 🚀 弹药检索

- **数据源**: `ammunitionData` - 6 种弹药的详细信息
- **搜索字段**: 名称、简称、类型、制导方式、厂商、国家
- **特色功能**: 技术参数展示、排序功能

### 🎯 火炮检索

- **数据源**: `artilleryData` - 7 种火炮的技术参数
- **搜索字段**: 名称、类型、运动方式、厂商、国家
- **特色功能**: 性能参数对比、彩色标签

## 配置文件结构

```
src/config/searchConfigs/
├── countryConfig.tsx      # 国家检索配置
├── ammunitionConfig.tsx   # 弹药检索配置
└── artilleryConfig.tsx    # 火炮检索配置
```

每个配置文件包含：

- **数据源**: 具体的数据数组
- **列配置**: 表格列定义和渲染函数
- **搜索字段**: 可搜索的字段列表
- **搜索建议**: 智能建议列表

## 核心功能实现

### 🔍 智能搜索算法

```typescript
const filtered = data.filter(item =>
  searchFields.some(field => {
    const fieldValue = item[field];
    if (typeof fieldValue === 'string') {
      return fieldValue.toLowerCase().includes(value.toLowerCase());
    }
    if (typeof fieldValue === 'number') {
      return fieldValue.toString().includes(value);
    }
    if (Array.isArray(fieldValue)) {
      return fieldValue.some(val => val.toString().toLowerCase().includes(value.toLowerCase()));
    }
    return false;
  })
);
```

### 📱 响应式设计

- **桌面端**: 完整功能展示
- **平板端**: 适配中等屏幕
- **移动端**: 垂直布局，简化操作

### 🎨 样式特色

- **现代卡片设计**: 清晰的信息层次
- **渐变背景**: 美观的视觉效果
- **悬停效果**: 良好的交互体验
- **主题一致性**: 与整体系统保持一致

## 扩展性

### 添加新的搜索页面

1. 在 `src/config/searchConfigs/` 创建新的配置文件
2. 定义数据源、列配置、搜索字段
3. 创建新的页面组件使用 `UniversalSearch`
4. 在路由中注册新页面

### 自定义渲染

```typescript
{
  title: '自定义列',
  dataIndex: 'customField',
  render: (value, record) => (
    <Space>
      <Tag color="blue">{value}</Tag>
      <Text type="secondary">{record.additionalInfo}</Text>
    </Space>
  ),
}
```

### 高级搜索功能

- 可扩展为支持高级筛选器
- 可添加日期范围搜索
- 可集成外部 API 搜索

## 性能优化

- **useCallback**: 优化函数引用稳定性
- **合理分页**: 避免一次性渲染大量数据
- **虚拟滚动**: 大数据集的渲染优化
- **懒加载**: 按需加载搜索建议

## 最佳实践

1. **数据结构一致性**: 保持数据字段命名规范
2. **搜索字段选择**: 选择用户最可能搜索的字段
3. **渲染函数优化**: 避免在 render 函数中进行复杂计算
4. **响应式考虑**: 确保在不同设备上的可用性

这个通用搜索组件为军贸产品管理系统提供了统一、高效、美观的搜索体验，大大提升了代码复用性和维护效率。
