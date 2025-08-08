import { saveSearchHistory } from '@/api/search';
import SearchBox from '@/components/SearchBox';
import { Button, Card, Input, Message, Space, Tag } from '@arco-design/web-react';
import { IconFilter, IconLoading, IconSearch } from '@arco-design/web-react/icon';
import qs from 'query-string';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './style/index.module.less';

export interface SearchResult {
  data: Record<string, unknown>[];
  total: number;
  keyword: string;
  suggestions?: string[];
}

export interface SearchContainerProps {
  title: string;
  placeholder?: string;
  suggestions?: string[];
  searchApi: (keyword: string) => Promise<SearchResult>;
  onSearch?: (value: string) => void;
  onSearchResult?: (result: SearchResult) => void;
  showQuickFilter?: boolean;
  className?: string;
  children: (props: {
    searchResults: Record<string, unknown>[];
    loading: boolean;
    error: string | null;
    total: number;
    hasSearched: boolean;
    onRetry: () => void;
  }) => React.ReactNode;
}

function SearchContainer({
  title,
  placeholder = '请输入搜索内容...',
  suggestions = [],
  searchApi,
  onSearch,
  onSearchResult,
  showQuickFilter = true,
  className,
  children,
}: SearchContainerProps) {
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState(suggestions);

  // 执行搜索
  const performSearch = useCallback(
    async (keyword: string) => {
      if (!keyword.trim()) {
        setSearchResults([]);
        setTotal(0);
        setHasSearched(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      setHasSearched(true);

      try {
        const result = await searchApi(keyword);
        setSearchResults(result.data);
        setTotal(result.total);
        setCurrentSuggestions(result.suggestions || suggestions);

        // 保存搜索历史
        saveSearchHistory(keyword);

        onSearchResult?.(result);
        onSearch?.(keyword);
      } catch (err) {
        console.error('搜索失败:', err);
        setError('搜索失败，请重试');
        setSearchResults([]);
        setTotal(0);
        Message.error('搜索失败，请重试');
      } finally {
        setLoading(false);
      }
    },
    [searchApi, suggestions, onSearch, onSearchResult]
  );

  // 从URL参数获取搜索词
  useEffect(() => {
    const parsed = qs.parseUrl(location.search);
    const { q } = parsed.query;
    if (q && typeof q === 'string') {
      setSearchValue(q);
      performSearch(q);
    }
  }, [location.search, performSearch]);

  const handleSearchSubmit = (value: string) => {
    setSearchValue(value);
    performSearch(value);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    // 实时搜索可以在这里实现，目前只在提交时搜索
  };

  const handleClear = () => {
    setSearchValue('');
    setSearchResults([]);
    setTotal(0);
    setHasSearched(false);
    setError(null);
  };

  const handleRetry = () => {
    if (searchValue) {
      performSearch(searchValue);
    }
  };

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {/* 统一的搜索区域 */}
      <div className={styles.searchArea}>
        <SearchBox
          title={title}
          placeholder={placeholder}
          onSearch={handleSearchSubmit}
          suggestions={currentSuggestions}
          initialValue={searchValue}
        />

        {/* 搜索结果直接显示在搜索框下方 */}
        {hasSearched && (
          <div className={styles.resultsContainer}>
            {showQuickFilter && (
              <Card className={styles.quickFilterCard}>
                <div className={styles.quickFilterContent}>
                  <Space wrap>
                    <Input
                      value={searchValue}
                      onChange={handleSearchChange}
                      onPressEnter={() => handleSearchSubmit(searchValue)}
                      placeholder="修改搜索关键词..."
                      prefix={<IconSearch />}
                      style={{ width: 240, borderRadius: '8px' }}
                      allowClear
                      onClear={handleClear}
                    />
                    <Button
                      type="primary"
                      icon={loading ? <IconLoading /> : <IconFilter />}
                      onClick={() => handleSearchSubmit(searchValue)}
                      loading={loading}
                      style={{ borderRadius: '8px' }}
                    >
                      {loading ? '搜索中...' : '搜索'}
                    </Button>
                    {searchValue && (
                      <Button onClick={handleClear} style={{ borderRadius: '8px' }}>
                        清除
                      </Button>
                    )}
                  </Space>

                  {!loading && (
                    <div className={styles.resultSummary}>
                      {error ? (
                        <Space>
                          <span style={{ color: '#f5222d' }}>搜索失败</span>
                          <Button size="mini" type="text" onClick={handleRetry}>
                            重试
                          </Button>
                        </Space>
                      ) : (
                        <span>找到 {total} 条结果</span>
                      )}
                    </div>
                  )}
                </div>

                {searchValue && !error && (
                  <div className={styles.searchKeywordDisplay}>
                    <Space>
                      <span style={{ color: '#0066cc', fontWeight: 500 }}>搜索关键词：</span>
                      <Tag
                        color="blue"
                        closable
                        onClose={handleClear}
                        style={{ borderRadius: '6px' }}
                      >
                        {searchValue}
                      </Tag>
                      {loading && (
                        <span style={{ color: '#165dff' }}>
                          <IconLoading style={{ marginRight: '4px' }} />
                          搜索中...
                        </span>
                      )}
                    </Space>
                  </div>
                )}
              </Card>
            )}

            {/* 搜索结果内容 */}
            <div className={styles.resultsContent}>
              {children({
                searchResults,
                loading,
                error,
                total,
                hasSearched,
                onRetry: handleRetry,
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchContainer;
