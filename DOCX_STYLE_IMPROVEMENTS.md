# DOCX 样式改进说明

## 问题描述

使用 mammoth 转换 DOCX 文件后，文档的样式与原文不一致，包括：

- 标题样式丢失
- 表格样式不完整
- 列表样式缺失
- 段落格式不正确
- 字体和颜色信息丢失

## 解决方案

### 1. 改进 mammoth 配置

- 添加完整的 `styleMap` 配置，映射各种样式名称到 HTML 元素
- 启用 `includeDefaultStyleMap` 和 `includeEmbeddedStyleMap`
- 设置 `preserveEmptyParagraphs: true` 保持文档结构
- 添加 `idPrefix` 避免样式冲突

### 2. 样式映射规则

```typescript
styleMap: [
  // 标题样式
  "p[style-name='Heading 1'] => h1:fresh",
  "p[style-name='Heading 2'] => h2:fresh",

  // 段落样式
  "p[style-name='Normal'] => p:fresh",
  "p[style-name='Body Text'] => p.body-text:fresh",

  // 表格样式
  'table => table.table:fresh',
  "table[style-name='Table Grid'] => table.table-grid:fresh",

  // 列表样式
  "p[style-name='List Bullet'] => li.bullet:fresh",
  "p[style-name='List Number'] => li.number:fresh",
];
```

### 3. 后处理 HTML

- 为表格添加样式类
- 为列表添加样式类
- 为段落添加样式类
- 保持原始文档结构

### 4. CSS 样式定义

创建了完整的 CSS 样式来匹配原始文档外观：

#### 基础样式

- 字体：Times New Roman + SimSun
- 行高：1.5
- 颜色：黑色
- 背景：白色

#### 标题样式

- H1：24px，蓝色下划线
- H2：20px，灰色下划线
- H3-H6：递减字体大小

#### 段落样式

- 两端对齐
- 首行缩进 2em
- 行高 1.8

#### 表格样式

- 黑色边框
- 表头灰色背景
- 单元格内边距

#### 列表样式

- 自定义项目符号
- 多级缩进支持
- 有序列表编号

### 5. 调试功能

- 显示转换过程中的警告信息
- 帮助诊断样式问题
- 查看转换后的 HTML 结构

## 使用方法

1. 确保已安装 mammoth 依赖：

```bash
npm install mammoth
```

2. 导入样式文件：

```typescript
import styles from './style/index.module.less';
```

3. 使用改进的转换函数：

```typescript
const result = await mammoth.convertToHtml({
  arrayBuffer,
  styleMap: [...],
  includeDefaultStyleMap: true,
  includeEmbeddedStyleMap: true
});
```

4. 应用样式类：

```typescript
<div className={styles.docxContent} dangerouslySetInnerHTML={{ __html: html }} />
```

## 注意事项

1. **样式名称匹配**：确保 DOCX 文档中的样式名称与 styleMap 中的名称一致
2. **字体支持**：某些特殊字体可能无法完全还原
3. **复杂布局**：复杂的表格布局可能需要额外调整
4. **图片处理**：图片样式和位置可能需要手动调整

## 进一步优化建议

1. **动态样式检测**：根据文档内容动态生成样式映射
2. **主题支持**：支持多种文档主题样式
3. **响应式设计**：优化移动端显示效果
4. **打印样式**：优化打印输出效果
5. **可访问性**：添加 ARIA 标签和键盘导航支持

## 测试建议

1. 使用不同类型的 DOCX 文档测试
2. 检查各种样式元素的显示效果
3. 验证表格和列表的格式
4. 测试不同浏览器的兼容性
5. 检查打印效果
