import { getSearchHistory } from '@/api/search';
import { Card, Divider, Input, Tag, Typography } from '@arco-design/web-react';
import { IconClose, IconHistory, IconSearch } from '@arco-design/web-react/icon';
import React, { useEffect, useState } from 'react';
import styles from './style/index.module.less';

const { Title, Text } = Typography;

interface SearchBoxProps {
  title?: string;
  placeholder?: string;
  suggestions?: string[];
  initialValue?: string;
  onSearch?: (value: string) => void;
  onSuggestionClick?: (suggestion: string) => void;
}

function SearchBox({
  title = '军贸产品管理系统',
  placeholder = '请输入搜索内容...',
  suggestions = [],
  initialValue = '',
  onSearch,
  onSuggestionClick,
}: SearchBoxProps) {
  const [searchValue, setSearchValue] = useState(initialValue);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // 加载搜索历史和热门关键词
  useEffect(() => {
    const loadData = async () => {
      try {
        const [history] = await Promise.all([getSearchHistory()]);
        setSearchHistory(history);
      } catch (error) {
        console.error('加载搜索数据失败:', error);
      }
    };
    loadData();
  }, []);

  // 当initialValue变化时更新搜索值
  useEffect(() => {
    setSearchValue(initialValue);
  }, [initialValue]);

  const handleSearch = () => {
    if (searchValue.trim()) {
      onSearch?.(searchValue.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchValue(suggestion);
    setShowSuggestions(false);
    onSearch?.(suggestion);
    onSuggestionClick?.(suggestion);
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleInputBlur = () => {
    // 延迟隐藏，允许点击建议项
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const clearInput = () => {
    setSearchValue('');
    setShowSuggestions(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Title heading={2} className={styles.title}>
          {title}
        </Title>

        <div style={{ position: 'relative' }}>
          <Input
            value={searchValue}
            onChange={setSearchValue}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className={styles.searchInput}
            prefix={<IconSearch className={styles.searchIcon} />}
            suffix={searchValue && <IconClose className={styles.clearIcon} onClick={clearInput} />}
          />

          {/* <Button className={styles.searchButton} onClick={handleSearch}>
            搜索
          </Button>

          <Button className={styles.clearButton} onClick={clearInput}>
            清除
          </Button> */}

          {showSuggestions && (
            <Card className={styles.suggestions}>
              {/* 搜索建议 */}
              {suggestions.length > 0 && (
                <>
                  <div className={styles.suggestionSection}>
                    <Text className={styles.sectionTitle}>
                      <IconSearch className={styles.sectionIcon} />
                      搜索建议
                    </Text>
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={`suggestion-${index}`}
                        className={styles.suggestionItem}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <IconSearch className={styles.suggestionIcon} />
                        {suggestion}
                      </div>
                    ))}
                  </div>
                  <Divider style={{ margin: '8px 0' }} />
                </>
              )}

              {/* 搜索历史 */}
              {searchHistory.length > 0 && (
                <>
                  <div className={styles.suggestionSection}>
                    <Text className={styles.sectionTitle}>
                      <IconHistory className={styles.sectionIcon} />
                      搜索历史
                    </Text>
                    <div className={styles.tagContainer}>
                      {searchHistory.slice(0, 5).map((item, index) => (
                        <Tag
                          key={`history-${index}`}
                          className={styles.historyTag}
                          onClick={() => handleSuggestionClick(item)}
                        >
                          {item}
                        </Tag>
                      ))}
                    </div>
                  </div>
                  <Divider style={{ margin: '8px 0' }} />
                </>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
