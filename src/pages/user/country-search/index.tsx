import CountrySelector from '@/components/CountrySelector';
import { useHistory } from 'react-router-dom';

function CountrySearch() {
  const history = useHistory();

  const handleSearch = (value: string) => {
    console.log('Country search:', value);
  };

  const handleCountrySelect = (country: any) => {
    console.log('Selected country:', country);
    // 跳转到国家详情页面
    history.push(`/user/country-detail/${country.id}`);
  };

  // 如果正在显示搜索结果，使用原来的SearchContainer
  // if (showSearchResults) {
  //   return (
  //     <SearchContainer
  //       title="国家检索"
  //       placeholder="搜索国家、地区、产品..."
  //       searchApi={searchCountries}
  //       suggestions={countrySuggestions}
  //       onSearch={handleSearch}
  //       onSearchResult={handleSearchResult}
  //     >
  //       {props => <CountryResults {...props} />}
  //     </SearchContainer>
  //   );
  // }

  // 否则显示国家选择器
  return (
    <CountrySelector
      title="选择国家或地区"
      onSelect={handleCountrySelect}
      onSearch={handleSearch}
    />
  );
}

export default CountrySearch;
