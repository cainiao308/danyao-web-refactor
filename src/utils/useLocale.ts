import defaultLocale from '../locale';

function useLocale(locale = null) {
  const lang = 'zh-CN';

  return (locale || defaultLocale)[lang] || {};
}

export default useLocale;
