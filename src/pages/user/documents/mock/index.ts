import Mock from 'mockjs';
import {
  DocumentFormats,
  DocumentTypes,
  ResearchTypes,
  DocumentStatuses,
  DocumentRecord,
} from '../constants';

// 生成模拟文档数据
function generateDocumentData(count: number): DocumentRecord[] {
  const data: DocumentRecord[] = [];

  for (let i = 1; i <= count; i++) {
    data.push({
      id: `DOC${String(i).padStart(4, '0')}`,
      name:
        Mock.Random.pick([
          '产品技术规格说明书',
          '研发项目可行性研究报告',
          '生产工艺流程图',
          '质量控制标准文档',
          '产品测试报告',
          '用户操作手册',
          '维护保养指南',
          '安全操作规程',
          '技术培训材料',
          '项目进度报告',
          '成本分析报告',
          '风险评估报告',
          '环境影响评估',
          '专利技术文档',
          '竞品分析报告',
        ]) + Mock.Random.string('upper', 1, 3),
      format: Mock.Random.pick(DocumentFormats),
      type: Mock.Random.pick(DocumentTypes),
      researchType: Mock.Random.pick(ResearchTypes),
      tags: Mock.Random.shuffle(
        [
          '技术文档',
          '研究报告',
          '产品设计',
          '工艺改进',
          '质量控制',
          '安全评估',
          '性能测试',
          '成本控制',
          '专利技术',
          '竞品分析',
          '用户手册',
          '维护指南',
          '培训材料',
          '标准规范',
          '项目报告',
        ],
        Mock.Random.integer(2, 5)
      ),
      uploader: Mock.Random.pick([
        '张三',
        '李四',
        '王五',
        '赵六',
        '钱七',
        '孙八',
        '周九',
        '吴十',
        '郑十一',
        '王十二',
      ]),
      uploadTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
      status: Mock.Random.pick(DocumentStatuses),
    });
  }

  return data;
}

// 模拟API接口
Mock.mock(new RegExp('/api/user/documents'), 'get', (options: any) => {
  const url = options.url;
  const parsed = new URL(url, 'http://localhost');
  const { searchParams } = parsed;

  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');
  const name = searchParams.get('name');
  const format = searchParams.get('format');
  const type = searchParams.get('type');
  const researchType = searchParams.get('researchType');
  const uploader = searchParams.get('uploader');
  const status = searchParams.get('status');
  const uploadTime = searchParams.get('uploadTime');

  // 生成所有数据
  let allData = generateDocumentData(100);

  // 应用筛选条件
  if (name) {
    allData = allData.filter(item => item.name.includes(name));
  }
  if (format) {
    allData = allData.filter(item => item.format === format);
  }
  if (type) {
    allData = allData.filter(item => item.type === type);
  }
  if (researchType) {
    allData = allData.filter(item => item.researchType === researchType);
  }
  if (uploader) {
    allData = allData.filter(item => item.uploader.includes(uploader));
  }
  if (status) {
    allData = allData.filter(item => item.status === status);
  }
  if (uploadTime) {
    const timeRange = uploadTime.split(',');
    if (timeRange.length === 2) {
      const startTime = new Date(timeRange[0]).getTime();
      const endTime = new Date(timeRange[1]).getTime();
      allData = allData.filter(item => {
        const itemTime = new Date(item.uploadTime).getTime();
        return itemTime >= startTime && itemTime <= endTime;
      });
    }
  }

  // 分页
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const list = allData.slice(start, end);

  return {
    code: 200,
    message: 'success',
    data: {
      list,
      total: allData.length,
      page,
      pageSize,
    },
  };
});

// 模拟预览接口
Mock.mock(new RegExp('/api/user/documents/.*/preview'), 'get', () => {
  return {
    code: 200,
    message: 'success',
    data: {
      url: 'https://example.com/preview/document.pdf',
      filename: 'document.pdf',
    },
  };
});

// 模拟下载接口
Mock.mock(new RegExp('/api/user/documents/.*/download'), 'get', () => {
  return {
    code: 200,
    message: 'success',
    data: {
      url: 'https://example.com/download/document.pdf',
      filename: 'document.pdf',
    },
  };
});
