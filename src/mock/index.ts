import Mock from 'mockjs';
import { isSSR } from '@/utils/is';

import './user';
import './message-box';
import '../pages/weapons/ammunition/mock';
import '../pages/weapons/artillery/mock';

if (!isSSR) {
  Mock.setup({
    timeout: '500-1500',
  });
}
