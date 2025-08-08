# 武器装备管理功能

## 功能概述

基于现有项目架构，新增了**武器装备**管理模块，包含**弹药列表**和**火炮列表**两个子功能。

## 新增功能

### 1. 弹药列表管理

- **路径**: `/weapons/ammunition`
- **功能**: 弹药信息的查询、展示和管理

#### 字段信息

- 弹药名称 (name)
- 简称 (abbreviation)
- 口径 (caliber) - mm
- 重量 (weight) - kg
- 长度 (length) - mm
- 最小射程 (minRange) - km
- 最大射程 (maxRange) - km
- 精度 (accuracy) - m
- 威力 (power) - 低/中/高/极高
- 类型 (type) - 导弹、火箭弹、炮弹等
- 制导控制方式 (guidance)
- 厂商 (manufacturer)
- 生产国家 (country)

#### 查询过滤

支持通过以下字段过滤：

- 弹药名称
- 简称
- 口径
- 类型
- 厂商
- 生产国家

### 2. 火炮列表管理

- **路径**: `/weapons/artillery`
- **功能**: 火炮信息的查询、展示和管理

#### 字段信息

- 火炮名称 (name)
- 火炮口径 (caliber) - mm
- 火炮类型 (type) - 榴弹炮、加农炮、火箭炮等
- 运动方式 (mobility) - 履带式、轮式、牵引式等
- 火炮初速 (muzzleVelocity) - m/s
- 火炮射程 (range) - km
- 身管长度 (barrelLength) - m
- 射角范围 (elevationRange) - °
- 射向范围 (traverseRange) - °
- 火炮厂商 (manufacturer)
- 国家 (country)

#### 查询过滤

支持通过以下字段过滤：

- 火炮名称
- 火炮口径
- 火炮类型
- 火炮厂商
- 国家

## 技术实现

### 项目结构

```
src/pages/weapons/
├── ammunition/               # 弹药列表
│   ├── index.tsx            # 主页面组件
│   ├── form.tsx             # 搜索表单组件
│   ├── constants.tsx        # 常量和列配置
│   ├── locale/
│   │   └── index.ts         # 国际化文本
│   ├── mock/
│   │   └── index.ts         # Mock数据
│   └── style/
│       └── index.module.less # 样式文件
└── artillery/               # 火炮列表
    ├── index.tsx            # 主页面组件
    ├── form.tsx             # 搜索表单组件
    ├── constants.tsx        # 常量和列配置
    ├── locale/
    │   └── index.ts         # 国际化文本
    ├── mock/
    │   └── index.ts         # Mock数据
    └── style/
        └── index.module.less # 样式文件
```

### 核心特性

#### 1. 菜单集成

- 在主导航中新增**武器装备**菜单项
- 使用雷电图标 (IconThunderbolt)
- 支持中英文切换

#### 2. 数据表格

- 使用 Arco Design Table 组件
- 支持分页、排序、筛选
- 固定列布局，支持水平滚动
- 响应式设计

#### 3. 搜索功能

- 多字段组合查询
- 支持模糊搜索和精确匹配
- 下拉选择和输入框结合
- 一键重置功能

#### 4. Mock 数据

- 生成 100 条仿真数据
- 支持分页和过滤
- 数据类型丰富真实

#### 5. 国际化支持

- 完整的中英文支持
- 字段名称、提示文本等全覆盖
- 与现有国际化系统集成

#### 6. 权限控制

- 基于现有权限系统
- 可配置访问权限
- 支持操作级权限控制

## 界面特性

### 搜索区域

- 折叠式搜索表单
- 支持多条件组合查询
- 搜索和重置按钮

### 数据展示

- 表格形式展示
- 支持列排序
- 数据类型可视化（徽章显示）
- 操作按钮（查看、编辑、删除）

### 工具栏

- 添加按钮
- 导出功能
- 批量操作支持

## API 接口

### 弹药列表

- **GET** `/api/weapons/ammunition`
- 支持分页参数：`page`, `pageSize`
- 支持过滤参数：`name`, `abbreviation`, `caliber`, `type`, `manufacturer`, `country`

### 火炮列表

- **GET** `/api/weapons/artillery`
- 支持分页参数：`page`, `pageSize`
- 支持过滤参数：`name`, `caliber`, `type`, `manufacturer`, `country`

## 使用说明

1. **访问入口**: 登录系统后，在左侧导航栏找到"武器装备"菜单
2. **数据查询**: 使用搜索表单进行条件筛选
3. **数据操作**: 点击操作列的按钮进行查看、编辑、删除
4. **数据导出**: 使用工具栏的导出按钮
5. **新增数据**: 使用工具栏的添加按钮

## 扩展性

该功能模块设计具有良好的扩展性：

1. **字段扩展**: 可轻松添加新的数据字段
2. **功能扩展**: 可增加详情页、编辑表单等
3. **权限扩展**: 可配置更细粒度的权限控制
4. **导出扩展**: 可支持多种导出格式
5. **模块扩展**: 可参照此模式添加更多武器装备类型

## 技术栈一致性

新功能完全遵循项目现有技术栈和架构模式：

- React 17 + TypeScript
- Arco Design UI 组件库
- Redux 状态管理
- React Router 路由
- Less 样式预处理
- Mock.js 数据模拟
- 国际化 i18n 支持

所有代码风格和命名规范与现有项目保持一致。
