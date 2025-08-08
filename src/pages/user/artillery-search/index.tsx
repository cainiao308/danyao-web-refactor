import React from 'react';
import SearchContainer from '@/components/SearchContainer';
import ArtilleryResults from '@/components/SearchResults/ArtilleryResults';
import { searchArtillery } from '@/api/search';
import { artillerySuggestions } from '@/config/searchConfigs/artilleryConfig';

function ArtillerySearch() {
  const handleSearch = (value: string) => {
    console.log('Artillery search:', value);
  };

  const handleSearchResult = (result: any) => {
    console.log('Artillery search result:', result);
  };

  return (
    <SearchContainer
      title="火炮检索"
      placeholder="搜索火炮名称、类型、厂商..."
      searchApi={searchArtillery}
      suggestions={artillerySuggestions}
      onSearch={handleSearch}
      onSearchResult={handleSearchResult}
    >
      {props => <ArtilleryResults {...props} />}
    </SearchContainer>
  );
}

export default ArtillerySearch;
