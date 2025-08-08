import React, { useState, useEffect, useCallback } from 'react';
import { Card, Typography, Table, Space, Input, Button, Tag } from '@arco-design/web-react';
import { IconSearch, IconFilter } from '@arco-design/web-react/icon';
import { useLocation } from 'react-router-dom';
import SearchBox from '@/components/SearchBox';
import qs from 'query-string';
import styles from './style/index.module.less';

const { Title } = Typography;

export interface SearchColumn {
  title: string;
  dataIndex: string;
  width?: number;
  render?: (value: unknown, record: unknown) => React.ReactNode;
  sorter?: (a: unknown, b: unknown) => number;
  ellipsis?: boolean;
}

export interface UniversalSearchProps {
  title: string;
  placeholder?: string;
  suggestions?: string[];
  data: Record<string, unknown>[];
  columns: SearchColumn[];
  searchFields: string[]; // 可搜索的字段
  onSearch?: (value: string) => void;
  onFilter?: (filteredData: Record<string, unknown>[]) => void;
  pageSize?: number;
  showQuickFilter?: boolean;
  className?: string;
}

function UniversalSearch({
  title,
  placeholder = '请输入搜索内容...',
  suggestions = [],
  data = [],
  columns = [],
  searchFields = [],
  onSearch,
  onFilter,
  pageSize = 10,
  showQuickFilter = true,
  className,
}: UniversalSearchProps) {
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleFilter = useCallback(
    (value: string) => {
      if (!value.trim()) {
        setFilteredData(data);
        onFilter?.(data);
        return;
      }

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
            return fieldValue.some(val =>
              val.toString().toLowerCase().includes(value.toLowerCase())
            );
          }
          return false;
        })
      );

      setFilteredData(filtered);
      onFilter?.(filtered);
    },
    [data, searchFields, onFilter]
  );

  // 从URL参数获取搜索词
  useEffect(() => {
    const parsed = qs.parseUrl(location.search);
    const { q } = parsed.query;
    if (q && typeof q === 'string') {
      setSearchValue(q);
      handleFilter(q);
    } else {
      setFilteredData(data);
    }
  }, [location.search, data, handleFilter]);

  // 当外部数据变化时更新过滤结果
  useEffect(() => {
    if (searchValue) {
      handleFilter(searchValue);
    } else {
      setFilteredData(data);
    }
  }, [data, searchValue, handleFilter]);

  const handleSearchSubmit = (value: string) => {
    setSearchValue(value);
    handleFilter(value);
    onSearch?.(value);
  };

  const handleQuickFilter = () => {
    handleFilter(searchValue);
  };

  const clearSearch = () => {
    setSearchValue('');
    setFilteredData(data);
    onFilter?.(data);
  };

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <SearchBox
        title={title}
        placeholder={placeholder}
        onSearch={handleSearchSubmit}
        suggestions={suggestions}
      />

      <div className={styles.contentWrapper}>
        <Card className={styles.resultCard}>
          <div className={styles.resultHeader}>
            <Title heading={5} style={{ margin: 0 }}>
              搜索结果 ({filteredData.length}条记录)
            </Title>

            {showQuickFilter && (
              <Space>
                <Input
                  value={searchValue}
                  onChange={setSearchValue}
                  onPressEnter={handleQuickFilter}
                  placeholder="快速筛选..."
                  prefix={<IconSearch />}
                  style={{ width: 200 }}
                  allowClear
                  onClear={clearSearch}
                />
                <Button type="primary" icon={<IconFilter />} onClick={handleQuickFilter}>
                  筛选
                </Button>
                {searchValue && <Button onClick={clearSearch}>清除</Button>}
              </Space>
            )}
          </div>

          {searchValue && (
            <div className={styles.searchInfo}>
              <Space>
                <span>当前搜索：</span>
                <Tag color="blue" closable onClose={clearSearch}>
                  {searchValue}
                </Tag>
              </Space>
            </div>
          )}

          <Table
            columns={columns}
            data={filteredData}
            pagination={{
              pageSize,
              showTotal: true,
              showJumper: true,
              sizeCanChange: true,
            }}
            rowKey="id"
            borderCell
            scroll={{ x: 1000 }}
            className={styles.resultTable}
          />
        </Card>
      </div>
    </div>
  );
}

export default UniversalSearch;
