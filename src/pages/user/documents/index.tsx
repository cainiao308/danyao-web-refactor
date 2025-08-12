import useLocale from '@/utils/useLocale';
import {
  Button,
  Card,
  Drawer,
  Message,
  Modal,
  Pagination,
  PaginationProps,
  Table,
  Typography,
} from '@arco-design/web-react';
import { IconDownload, IconUpload } from '@arco-design/web-react/icon';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import '@cyntler/react-doc-viewer/dist/index.css';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { DocumentRecord, getColumns } from './constants';
import SearchForm from './form';
import locale from './locale';
import './mock';
import styles from './style/index.module.less';
// 导入文档文件
import vulcano76 from '../../../public/Vulcano 76.pdf';
import patriaNemo from '../../../public/2_patria-nemo-brochure-lowres.pdf';
import milner from '../../../public/4_Milner.pdf';
import baeExcalibur from '../../../public/bae_pdf_excalibur.pdf';
import docx from '../../../public/Procedure.docx';
// 添加mammoth导入
import mammoth from 'mammoth';

const { Title, Paragraph } = Typography;

function Documents() {
  const t = useLocale(locale);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [currentPreviewDoc, setCurrentPreviewDoc] = useState<DocumentRecord | null>(null);

  // 添加状态管理DOCX HTML内容
  const [docxHtml, setDocxHtml] = useState<string>('');
  const [isConverting, setIsConverting] = useState(false);

  // 添加DOCX转换函数
  const convertDocxToHtml = async (docxUrl: string): Promise<string> => {
    try {
      const response = await fetch(docxUrl);
      const arrayBuffer = await response.arrayBuffer();

      // 使用更完整的mammoth配置选项
      const result = await mammoth.convertToHtml(
        {
          arrayBuffer,
        },
        {
          styleMap: [
            // 标题样式映射
            "p[style-name='Heading 1'] => h1:fresh",
            "p[style-name='Heading 2'] => h2:fresh",
            "p[style-name='Heading 3'] => h3:fresh",
            "p[style-name='Heading 4'] => h4:fresh",
            "p[style-name='Heading 5'] => h5:fresh",
            "p[style-name='Heading 6'] => h6:fresh",
            "p[style-name='Title'] => h1.title:fresh",
            "p[style-name='Subtitle'] => h2.subtitle:fresh",
            "p[style-name='Heading'] => h1:fresh",
            "p[style-name='Subheading'] => h2:fresh",

            // 段落样式映射
            "p[style-name='Normal'] => p:fresh",
            "p[style-name='Body Text'] => p.body-text:fresh",
            "p[style-name='Quote'] => blockquote:fresh",
            "p[style-name='Intense Quote'] => blockquote.intense:fresh",
            "p[style-name='List Paragraph'] => li:fresh",
            "p[style-name='Caption'] => p.caption:fresh",
            "p[style-name='Footer'] => p.footer:fresh",
            "p[style-name='Header'] => p.header:fresh",

            // 文本样式映射
            "r[style-name='Strong'] => strong",
            "r[style-name='Emphasis'] => em",
            "r[style-name='Code'] => code",
            "r[style-name='Bold'] => strong",
            "r[style-name='Italic'] => em",
            "r[style-name='Underline'] => u",
            "r[style-name='Strike'] => del",
            "r[style-name='Superscript'] => sup",
            "r[style-name='Subscript'] => sub",

            // 表格样式映射
            'table => table.table:fresh',
            'tr => tr:fresh',
            'td => td:fresh',
            'th => th:fresh',
            "table[style-name='Table Grid'] => table.table-grid:fresh",
            "table[style-name='Table Simple 1'] => table.table-simple:fresh",

            // 列表样式映射
            "p[style-name='List Bullet'] => li.bullet:fresh",
            "p[style-name='List Number'] => li.number:fresh",
            "p[style-name='List 2'] => li.level-2:fresh",
            "p[style-name='List 3'] => li.level-3:fresh",

            // 特殊样式映射
            "p[style-name='TOC 1'] => p.toc-1:fresh",
            "p[style-name='TOC 2'] => p.toc-2:fresh",
            "p[style-name='TOC 3'] => p.toc-3:fresh",
            "p[style-name='Footnote Text'] => p.footnote:fresh",
            "p[style-name='Header'] => p.header:fresh",
            "p[style-name='Footer'] => p.footer:fresh",
          ],
          ignoreEmptyParagraphs: false,
          includeDefaultStyleMap: true,
          includeEmbeddedStyleMap: true,
          idPrefix: 'docx-',
          transformDocument: document => {
            // 保持原始文档结构
            return document;
          },
        }
      );

      // 后处理HTML以添加更多样式类
      let processedHtml = result.value;

      // 为表格添加样式类
      processedHtml = processedHtml.replace(/<table>/g, '<table class="table table-bordered">');

      // 为列表添加样式类
      processedHtml = processedHtml.replace(/<ul>/g, '<ul class="list-unstyled">');

      processedHtml = processedHtml.replace(/<ol>/g, '<ol class="list-ordered">');

      // 为段落添加样式类
      processedHtml = processedHtml.replace(/<p>/g, '<p class="paragraph">');

      return processedHtml;
    } catch (error) {
      console.error('DOCX转换错误:', error);
      return '<p>无法转换DOCX文件</p>';
    }
  };

  // 添加useEffect来处理DOCX文件转换
  useEffect(() => {
    if (currentPreviewDoc && currentPreviewDoc.name.toLowerCase().endsWith('.docx')) {
      setIsConverting(true);
      setDocxHtml('');

      convertDocxToHtml(getDocumentFile(currentPreviewDoc.name))
        .then(html => {
          setDocxHtml(html);
        })
        .catch(error => {
          console.error('DOCX转换失败:', error);
          setDocxHtml('<p>转换失败，请尝试下载文件</p>');
        })
        .finally(() => {
          setIsConverting(false);
        });
    }
  }, [currentPreviewDoc]);

  const tableCallback = async (record: DocumentRecord, type: string) => {
    switch (type) {
      case 'preview':
        // 设置当前预览文档并打开预览模态框
        setCurrentPreviewDoc(record);
        setPreviewVisible(true);
        break;
      case 'download':
        try {
          const response = await axios.get(`/api/user/documents/${record.id}/download`);
          if (response.data.code === 200) {
            // 在实际项目中，这里可以触发文件下载
            const link = document.createElement('a');
            link.href = response.data.data.url;
            link.download = response.data.data.filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            Message.success(t['documents.download.success']);
          }
        } catch (error) {
          Message.error(t['documents.download.error']);
        }
        break;
      default:
        break;
    }
  };

  const columns = useMemo(() => getColumns(t, tableCallback), [t]);

  const [data, setData] = useState<DocumentRecord[]>([]);
  const [pagination, setPagination] = useState<PaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
  });
  const [loading, setLoading] = useState(true);
  const [formParams, setFormParams] = useState<Record<string, any>>({});

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, JSON.stringify(formParams)]);

  function fetchData() {
    const { current, pageSize } = pagination;
    setLoading(true);

    // 处理日期范围参数
    const params = { ...formParams };
    if (params.uploadTime && Array.isArray(params.uploadTime)) {
      params.uploadTime = params.uploadTime
        .map((date: any) => (date ? date.format('YYYY-MM-DD') : null))
        .filter(Boolean);
    }

    axios
      .get('/api/user/documents', {
        params: {
          page: current,
          pageSize,
          ...params,
        },
      })
      .then(res => {
        if (res.data.code === 200) {
          setData(res.data.data.list);
          setPagination({
            ...pagination,
            current,
            pageSize,
            total: res.data.data.total,
          });
        } else {
          Message.error(res.data.message || '获取数据失败');
        }
      })
      .catch(() => {
        Message.error(t['documents.fetch.error']);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onChangeTable({ current, pageSize }: PaginationProps) {
    setPagination({
      ...pagination,
      current,
      pageSize,
    });
  }

  function handleSearch(params: Record<string, any>) {
    setFormParams(params);
    setPagination({ ...pagination, current: 1 });
  }

  function handleReset() {
    setFormParams({});
    setPagination({ ...pagination, current: 1 });
  }

  const handleUpload = () => {
    Modal.info({
      title: '上传文档',
      content: '文档上传功能开发中，敬请期待！',
    });
  };

  const handleExport = () => {
    Modal.info({
      title: '导出数据',
      content: '数据导出功能开发中，敬请期待！',
    });
  };

  // 根据文档名称获取对应的文件
  const getDocumentFile = (docName: string) => {
    switch (docName) {
      case 'Vulcano 76.pdf':
        return vulcano76;
      case '2_patria-nemo-brochure-lowres.pdf':
        return patriaNemo;
      case '4_Milner.pdf':
        return milner;
      case 'bae_pdf_excalibur.pdf':
        return baeExcalibur;
      case '1_120ER Loading Test Procedure  EN.docx':
        // 返回文件路径
        return docx;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title heading={2} className={styles.title}>
          {t['documents.title']}
        </Title>
        <Paragraph className={styles.description}>{t['documents.description']}</Paragraph>
      </div>

      <Card className={styles.tableCard}>
        <SearchForm onSearch={handleSearch} onReset={handleReset} />
        <div className={styles.tableHeader}>
          <div className={styles.left}>
            <Typography.Text type="secondary">共 {pagination.total || 0} 条记录</Typography.Text>
          </div>
          <div className={styles.right}>
            <Button type="primary" icon={<IconUpload />} onClick={handleUpload}>
              {t['documents.upload']}
            </Button>
            <Button icon={<IconDownload />} onClick={handleExport}>
              {t['documents.export']}
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          data={data}
          loading={loading}
          // border={false}
          // stripe={true}
          rowKey="id"
          scroll={{ x: 1200 }}
          pagination={false}
        />

        <div className={styles.pagination}>
          <Pagination
            {...pagination}
            onChange={(pageNumber, pageSize) => onChangeTable({ current: pageNumber, pageSize })}
            showTotal
            showJumper
            sizeCanChange
          />
        </div>
      </Card>

      {/* 文档预览模态框 */}
      <Drawer
        width={800}
        title={
          <span>{currentPreviewDoc ? `文档预览 - ${currentPreviewDoc.name}` : '文档预览'}</span>
        }
        visible={previewVisible}
        onOk={() => {
          setPreviewVisible(false);
          setCurrentPreviewDoc(null);
        }}
        onCancel={() => {
          setPreviewVisible(false);
          setCurrentPreviewDoc(null);
        }}
        footer={null}
      >
        {currentPreviewDoc && getDocumentFile(currentPreviewDoc.name) ? (
          currentPreviewDoc.name.toLowerCase().endsWith('.docx') ? (
            // DOCX文件使用mammoth转换预览
            <div style={{ padding: '20px', overflow: 'auto' }}>
              {isConverting ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                  <p>正在转换DOCX文件...</p>
                </div>
              ) : docxHtml ? (
                <>
                  <div
                    dangerouslySetInnerHTML={{ __html: docxHtml }}
                    style={{
                      fontFamily: 'Arial, sans-serif',
                      lineHeight: '1.6',
                      color: '#333',
                    }}
                    className={styles.docxContent}
                  />
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                  <p>无法预览DOCX文件</p>
                  <Button
                    type="primary"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = getDocumentFile(currentPreviewDoc.name);
                      link.download = currentPreviewDoc.name;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    下载文档
                  </Button>
                </div>
              )}
            </div>
          ) : (
            // PDF文件使用DocViewer
            <DocViewer
              pluginRenderers={DocViewerRenderers}
              documents={[
                {
                  uri: getDocumentFile(currentPreviewDoc.name),
                  fileName: currentPreviewDoc.name,
                },
              ]}
              config={{
                pdfZoom: { defaultZoom: 1, zoomJump: 0.1 },
                pdfVerticalScrollByDefault: true,
                header: {
                  disableHeader: true,
                  disableFileName: false,
                  retainURLParams: false,
                },
              }}
              style={{ height: '100%' }}
            />
          )
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '200px',
              color: '#999',
            }}
          >
            无法预览该文档
          </div>
        )}
      </Drawer>
    </div>
  );
}

export default Documents;
