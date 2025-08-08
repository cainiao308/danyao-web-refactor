# Prettier 保存时自动格式化配置

## 已完成的配置

### 1. VSCode 设置 (`.vscode/settings.json`)

```json
{
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.formatOnType": true,
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "prettier.requireConfig": true,
  "typescript.preferences.importModuleSpecifier": "relative",
  "javascript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": false,
  "javascript.suggest.autoImports": false,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### 2. Prettier 配置 (`.prettierrc`)

```json
{
  "semi": true,
  "singleQuote": true,
  "jsxSingleQuote": false,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

### 3. ESLint 配置 (`.eslintrc`)

```json
{
  "root": true,
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true,
    "jest": true
  },
  "parser": "@typescript-eslint/parser",
  "extends": [
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "settings": {
    "react": {
      "version": "17.0"
    }
  },
  "plugins": ["react", "babel", "@typescript-eslint/eslint-plugin"],
  "rules": {
    "react/display-name": 0,
    "react/prop-types": 0,
    "react/react-in-jsx-scope": "off"
  }
}
```

## 需要安装的 VSCode 扩展

请在 VSCode 中安装以下扩展：

1. **Prettier - Code formatter** (esbenp.prettier-vscode)

   - 这是主要的 Prettier 格式化扩展
   - 提供保存时自动格式化功能

2. **ESLint** (dbaeumer.vscode-eslint)

   - 用于代码质量检查
   - 与 Prettier 配合使用

## 功能说明

- ✅ **保存时自动格式化**: 按 `Ctrl+S` (或 `Cmd+S`) 保存文件时会自动格式化
- ✅ **粘贴时自动格式化**: 粘贴代码时会自动格式化
- ✅ **输入时自动格式化**: 输入代码时会自动格式化
- ✅ **保存时运行 ESLint**: 保存时会自动修复 ESLint 问题
- ✅ **React 17 JSX 支持**: 支持 React 17 的新 JSX 转换，无需显式引入 React
- ✅ **自动修复缩进**: 保存时自动修复所有缩进问题

## 重要说明

### React 17 JSX 转换

本项目使用 React 17，支持新的 JSX 转换，**不需要显式引入 React**：

```typescript
// ✅ 正确 - React 17 不需要显式引入 React
import { useState } from 'react';

function Component() {
  return <div>Hello</div>;
}

// ❌ 不需要 - 旧版本需要
import React from 'react';
```

### 自动缩进修复

Prettier 会在保存时自动修复所有缩进问题，包括：

- 错误的缩进级别
- 不一致的空格使用
- JSX 标签的缩进
- 函数和对象的缩进

## 测试自动格式化功能

### 方法一：在 VSCode 中测试

1. 打开任意 `.ts` 或 `.tsx` 文件
2. 故意写一些格式不规范的代码，例如：

```typescript
function TestComponent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>测试</h1>
      <button onClick={() => setCount(count + 1)}>点击</button>
    </div>
  );
}
```

3. 按 `Ctrl+S` (或 `Cmd+S`) 保存
4. 观察代码是否自动格式化为：

```typescript
function TestComponent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>测试</h1>
      <button onClick={() => setCount(count + 1)}>点击</button>
    </div>
  );
}
```

### 方法二：命令行测试

```bash
# 检查格式化状态
npx prettier --check "src/**/*.{ts,tsx,js,jsx}"

# 手动格式化所有文件
npx prettier --write "src/**/*.{ts,tsx,js,jsx}"
```

## 手动格式化命令

如果自动格式化不工作，可以使用以下命令手动格式化：

```bash
# 格式化单个文件
npx prettier --write "src/components/NavBar/index.tsx"

# 格式化所有 TypeScript/JavaScript 文件
npx prettier --write "src/**/*.{ts,tsx,js,jsx}"

# 检查格式化状态
npx prettier --check "src/**/*.{ts,tsx,js,jsx}"
```

## 故障排除

如果保存时格式化不工作：

1. 确保安装了正确的 VSCode 扩展
2. 重启 VSCode
3. 检查文件类型是否正确识别
4. 确认 `.prettierrc` 配置文件存在
5. 如果遇到 React 相关错误，确认 ESLint 配置中的 React 版本设置正确

## 常见问题解决

### 问题：'React' must be in scope when using JSX

**解决方案**：已禁用 `react/react-in-jsx-scope` 规则，因为 React 17 支持新的 JSX 转换。

### 问题：缩进不正确

**解决方案**：Prettier 会自动修复缩进问题，确保使用正确的缩进格式。

### 问题：保存时没有自动格式化

**解决方案**：

1. 确认安装了 Prettier 扩展
2. 检查文件类型是否正确识别为 TypeScript/JavaScript
3. 重启 VSCode
4. 确认 `.vscode/settings.json` 中的配置正确
