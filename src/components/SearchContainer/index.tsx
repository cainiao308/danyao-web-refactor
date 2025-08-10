import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBox from '@/components/SearchBox';
import qs from 'query-string';
import { Card, Space, Input, Button, Tag, Typography, Message } from '@arco-design/web-react';
import { IconSearch, IconFilter, IconLoading, IconInfoCircle } from '@arco-design/web-react/icon';
import styles from './style/index.module.less';
import { saveSearchHistory, SearchResult } from '@/api/search';

const { Text } = Typography;

export interface SearchContainerProps {
  title: string;
  placeholder?: string;
  suggestions?: string[];
  searchApi: (keyword: string) => Promise<SearchResult<Record<string, unknown>>>;
  onSearch?: (value: string) => void;
  onSearchResult?: (result: SearchResult<Record<string, unknown>>) => void;
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
        console.error('Search API error:', err);
        setError('搜索失败，请重试');
        Message.error('搜索失败，请重试');
        setSearchResults([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    },
    [searchApi, onSearch, onSearchResult, suggestions]
  );

  // 从URL参数获取搜索词并触发搜索
  useEffect(() => {
    const parsed = qs.parseUrl(location.search);
    const { q } = parsed.query;
    if (q && typeof q === 'string') {
      setSearchValue(q);
      performSearch(q);
    } else {
      setSearchResults([]);
      setTotal(0);
      setHasSearched(false);
    }
  }, [location.search, performSearch]);

  const handleSearchSubmit = (value: string) => {
    setSearchValue(value);
    performSearch(value);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleClear = () => {
    setSearchValue('');
    setSearchResults([]);
    setTotal(0);
    setHasSearched(false);
    setError(null);
    // Clear URL parameter
    const newUrl = location.pathname;
    window.history.replaceState({}, '', newUrl);
  };

  const handleRetry = () => {
    if (searchValue) {
      performSearch(searchValue);
    }
  };

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {/* 只在没有搜索结果时显示大搜索框 */}
      {!hasSearched && (
        <div className={styles.searchArea}>
          <SearchBox
            title={title}
            placeholder={placeholder}
            onSearch={handleSearchSubmit}
            suggestions={currentSuggestions}
            initialValue={searchValue}
          />
        </div>
      )}

      {/* 搜索结果区域 */}
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
                  <Button
                    onClick={() => {
                      setHasSearched(false);
                      setSearchResults([]);
                      setTotal(0);
                      setError(null);
                    }}
                    style={{ borderRadius: '8px' }}
                  >
                    返回搜索
                  </Button>
                </Space>

                {!loading && (
                  <div className={styles.resultSummary}>
                    {error ? (
                      <Space>
                        <IconInfoCircle style={{ color: '#f5222d' }} />
                        <Text style={{ color: '#f5222d' }}>加载失败</Text>
                      </Space>
                    ) : (
                      <Space>
                        <IconSearch />
                        <Text>
                          共找到 <Text style={{ fontWeight: 'bold' }}>{total}</Text> 条结果
                        </Text>
                      </Space>
                    )}
                  </div>
                )}

                {searchValue && (
                  <div className={styles.keywordHighlight}>
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
                    </Space>
                  </div>
                )}
              </div>
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
  );
}

export default SearchContainer;
