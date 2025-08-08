# 搜索架构设计 - 复用搜索逻辑，自定义结果展示

## 设计理念

基于您的需求，我重新设计了搜索架构：**搜索逻辑完全复用，结果展示高度定制化**。这样既保证了搜索功能的一致性，又允许每种搜索结果有不同的展示形式。

## 架构组件

### 🔍 SearchContainer (搜索容器)

**位置**: `src/components/SearchContainer/`
**职责**: 统一的搜索逻辑和状态管理

```tsx
// 使用 Render Props 模式提供灵活性
<SearchContainer title="搜索标题" data={data} searchFields={searchFields} suggestions={suggestions}>
  {props => <CustomResults {...props} />}
</SearchContainer>
```

**核心功能**:

- ✅ 统一的搜索逻辑
- ✅ URL 参数处理
- ✅ 搜索状态管理
- ✅ 数据过滤算法
- ✅ Render Props 支持自定义结果展示

### 📊 SearchResults (结果展示组件)

**位置**: `src/components/SearchResults/`
**职责**: 不同类型的搜索结果展示

#### 1. CountryResults - 国家检索结果

- **展示特色**: 简洁的表格布局
- **特殊功能**: 多语言显示，产品标签
- **分页设置**: 8 条/页

#### 2. AmmunitionResults - 弹药检索结果

- **展示特色**: 数据统计卡片 + 详细表格
- **特殊功能**: 类型分布统计，平均射程计算
- **统计信息**: 总数量、涉及国家、平均射程、类型分布

#### 3. ArtilleryResults - 火炮检索结果

- **展示特色**: 统计概览 + 双视图模式 (表格/卡片)
- **特殊功能**: 火炮性能统计，卡片视图切换
- **统计信息**: 自行榴弹炮数、牵引榴弹炮数、最大射程、平均口径
- **视图模式**: 表格视图 / 卡片视图

## 代码对比

### 之前的方案 (UniversalSearch)

```tsx
// 搜索逻辑 + 结果展示 耦合在一起
<UniversalSearch
  title="弹药检索"
  data={data}
  columns={columns} // 固定的表格展示
  searchFields={searchFields}
/>
```

**问题**: 结果展示形式固定，难以定制

### 现在的方案 (SearchContainer + CustomResults)

```tsx
// 搜索逻辑与结果展示分离
<SearchContainer title="弹药检索" data={data} searchFields={searchFields}>
  {props => <AmmunitionResults {...props} />} // 自定义结果展示
</SearchContainer>
```

**优势**: 搜索逻辑复用，结果展示完全自定义

## 接口设计

### SearchContainer Props

```typescript
interface SearchContainerProps {
  title: string;
  placeholder?: string;
  suggestions?: string[];
  data: Record<string, unknown>[];
  searchFields: string[];
  onSearch?: (value: string) => void;
  onFilter?: (filteredData: Record<string, unknown>[]) => void;
  children: (props: {
    searchValue: string;
    filteredData: Record<string, unknown>[];
    onSearchChange: (value: string) => void;
    onClear: () => void;
  }) => React.ReactNode;
  className?: string;
}
```

### Results Component Props

```typescript
interface ResultsProps {
  searchValue: string; // 当前搜索值
  filteredData: Record<string, unknown>[]; // 过滤后的数据
  onSearchChange: (value: string) => void; // 修改搜索值
  onClear: () => void; // 清除搜索
}
```

## 展示形式对比

| 特性         | 国家检索   | 弹药检索        | 火炮检索          |
| ------------ | ---------- | --------------- | ----------------- |
| **基础布局** | 简单表格   | 统计卡片 + 表格 | 统计概览 + 双视图 |
| **统计信息** | 无         | ✅ 类型分布统计 | ✅ 性能参数统计   |
| **特殊展示** | 多语言标签 | 平均射程计算    | 卡片/表格切换     |
| **交互功能** | 基础筛选   | 数据分析展示    | 视图模式切换      |

## 核心优势

### 🔄 完美的关注点分离

- **SearchContainer**: 专注搜索逻辑
- **Results 组件**: 专注展示逻辑
- **配置文件**: 专注数据定义

### 🎨 高度的展示自定义

- **国家检索**: 简洁实用的表格
- **弹药检索**: 丰富的数据统计
- **火炮检索**: 多样的视图模式

### 🔧 强大的扩展性

```tsx
// 添加新的搜索页面非常简单
<SearchContainer {...searchProps}>{props => <NewCustomResults {...props} />}</SearchContainer>
```

### ♻️ 代码复用最大化

- 搜索逻辑: 100%复用
- URL 处理: 100%复用
- 状态管理: 100%复用
- 结果展示: 0%复用 (完全自定义)

## 实际效果

### 1. 国家检索

```tsx
// 简洁的表格展示
<CountryResults>- 国家名称 (中英文) - 地区标签 - 产品展示 - 厂商信息</CountryResults>
```

### 2. 弹药检索

```tsx
// 统计信息 + 详细表格
<AmmunitionResults>
  - 📊 数据统计卡片 * 总数量、涉及国家 * 平均射程、类型分布 - 📋 详细数据表格 * 技术参数展示 *
  排序功能
</AmmunitionResults>
```

### 3. 火炮检索

```tsx
// 性能统计 + 双视图
<ArtilleryResults>
  - 📈 统计概览 * 自行/牵引榴弹炮数量 * 最大射程、平均口径 - 🔄 双视图模式 * 表格视图: 详细参数 *
  卡片视图: 可视化展示
</ArtilleryResults>
```

## 文件组织

```
src/
├── components/
│   ├── SearchContainer/           # 搜索容器 (复用)
│   │   ├── index.tsx
│   │   └── style/
│   └── SearchResults/             # 结果展示 (自定义)
│       ├── CountryResults/        # 国家检索结果
│       ├── AmmunitionResults/     # 弹药检索结果
│       └── ArtilleryResults/      # 火炮检索结果
├── config/searchConfigs/          # 数据配置
│   ├── countryConfig.tsx
│   ├── ammunitionConfig.tsx
│   └── artilleryConfig.tsx
└── pages/user/                   # 页面组装
    ├── country-search/
    ├── ammunition-search/
    └── artillery-search/
```

## 使用示例

### 创建新的搜索页面

```tsx
// 1. 创建结果展示组件
function MyCustomResults({ searchValue, filteredData, onSearchChange, onClear }) {
  return (
    <div>
      {/* 完全自定义的展示逻辑 */}
      <MySpecialVisualization data={filteredData} />
      <MyCustomTable data={filteredData} />
    </div>
  );
}

// 2. 组装搜索页面
function MySearchPage() {
  return (
    <SearchContainer title="我的搜索" data={myData} searchFields={mySearchFields}>
      {props => <MyCustomResults {...props} />}
    </SearchContainer>
  );
}
```

## 总结

这个新架构完美实现了您的需求：

- ✅ **搜索功能完全复用**: 一套搜索逻辑，三处使用
- ✅ **结果展示完全自定义**: 每种搜索都有独特的展示形式
- ✅ **高度的扩展性**: 添加新搜索页面极其简单
- ✅ **优秀的维护性**: 关注点分离，职责清晰

搜索的核心逻辑被完美复用，而每种搜索结果都能展现出最适合的形式，真正做到了"一套搜索，多样展示"！
