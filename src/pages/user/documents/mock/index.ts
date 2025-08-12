import Mock from 'mockjs';
import {
  DocumentFormats,
  DocumentTypes,
  ResearchTypes,
  DocumentStatuses,
  DocumentRecord,
} from '../constants';

// 生成模拟文档数据
function generateDocumentData(): DocumentRecord[] {
  const data: DocumentRecord[] = [
    {
      id: 'DOC0001',
      name: 'Vulcano 76.pdf',
      format: 'PDF',
      type: '技术文档',
      researchType: '武器装备',
      tags: ['技术文档', '火炮系统', '意大利'],
      uploader: '技术部',
      uploadTime: '2024-01-15 10:30:00',
      status: '已审核',
      fileSize: '424KB',
    },
    {
      id: 'DOC0002',
      name: '2_patria-nemo-brochure-lowres.pdf',
      format: 'PDF',
      type: '产品手册',
      researchType: '武器装备',
      tags: ['产品手册', '迫击炮', '芬兰'],
      uploader: '产品部',
      uploadTime: '2024-12-14 14:20:00',
      status: '已审核',
      fileSize: '246KB',
    },
    {
      id: 'DOC0003',
      name: '4_Milner.pdf',
      format: 'PDF',
      type: '研究报告',
      researchType: '军事技术',
      tags: ['研究报告', '军事技术', '英国'],
      uploader: '研究部',
      uploadTime: '2024-12-13 09:15:00',
      status: '已审核',
      fileSize: '1.4MB',
    },
    {
      id: 'DOC0004',
      name: 'bae_pdf_excalibur.pdf',
      format: 'PDF',
      type: '技术文档',
      researchType: '武器装备',
      tags: ['技术文档', '精确制导', '美国'],
      uploader: '技术部',
      uploadTime: '2024-12-12 16:45:00',
      status: '已审核',
      fileSize: '126KB',
    },
    {
      id: 'DOC0005',
      name: '1_120ER Loading Test Procedure  EN.docx',
      format: 'DOCX',
      type: '操作手册',
      researchType: '武器装备',
      tags: ['操作手册', '测试程序', '英文'],
      uploader: '培训部',
      uploadTime: '2024-12-11 11:30:00',
      status: '已审核',
      fileSize: '31KB',
    },
  ];

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
  let allData = generateDocumentData();

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
