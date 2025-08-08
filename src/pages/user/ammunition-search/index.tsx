import React from 'react';
import SearchContainer from '@/components/SearchContainer';
import AmmunitionResults from '@/components/SearchResults/AmmunitionResults';
import { searchAmmunition } from '@/api/search';
import { ammunitionSuggestions } from '@/config/searchConfigs/ammunitionConfig';

function AmmunitionSearch() {
  const handleSearch = (value: string) => {
    console.log('Ammunition search:', value);
  };

  const handleSearchResult = (result: any) => {
    console.log('Ammunition search result:', result);
  };

  return (
    <SearchContainer
      title="弹药检索"
      placeholder="搜索弹药名称、类型、厂商..."
      searchApi={searchAmmunition}
      suggestions={ammunitionSuggestions}
      onSearch={handleSearch}
      onSearchResult={handleSearchResult}
    >
      {props => <AmmunitionResults {...props} />}
    </SearchContainer>
  );
}

export default AmmunitionSearch;
