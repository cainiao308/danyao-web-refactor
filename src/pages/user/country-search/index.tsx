import React from 'react';
import SearchContainer from '@/components/SearchContainer';
import CountryResults from '@/components/SearchResults/CountryResults';
import { searchCountries } from '@/api/search';
import { countrySuggestions } from '@/config/searchConfigs/countryConfig';

function CountrySearch() {
  const handleSearch = (value: string) => {
    console.log('Country search:', value);
  };

  const handleSearchResult = (result: any) => {
    console.log('Country search result:', result);
  };

  return (
    <SearchContainer
      title="国家检索"
      placeholder="搜索国家、地区、产品..."
      searchApi={searchCountries}
      suggestions={countrySuggestions}
      onSearch={handleSearch}
      onSearchResult={handleSearchResult}
    >
      {props => <CountryResults {...props} />}
    </SearchContainer>
  );
}

export default CountrySearch;
