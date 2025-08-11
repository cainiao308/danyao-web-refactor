import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  Card,
  PaginationProps,
  Button,
  Typography,
  Message,
  Modal,
  Pagination,
  Drawer,
} from '@arco-design/web-react';
import { IconDownload, IconUpload } from '@arco-design/web-react/icon';
import axios from 'axios';
import useLocale from '@/utils/useLocale';
import SearchForm from './form';
import locale from './locale';
import styles from './style/index.module.less';
import './mock';
import { getColumns, DocumentRecord } from './constants';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import '@cyntler/react-doc-viewer/dist/index.css';

const { Title, Paragraph } = Typography;

function Documents() {
  const t = useLocale(locale);
  const [previewVisible, setPreviewVisible] = useState(false);

  const tableCallback = async (record: DocumentRecord, type: string) => {
    switch (type) {
      case 'preview':
        // 简单地打开预览模态框
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
        width={700}
        title={<span>Basic Information </span>}
        visible={previewVisible}
        onOk={() => {
          setPreviewVisible(false);
        }}
        onCancel={() => {
          setPreviewVisible(false);
        }}
      >
        <DocViewer
          pluginRenderers={DocViewerRenderers}
          documents={[
            {
              uri: 'https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf',
            },
          ]}
          config={{
            pdfZoom: {
              defaultZoom: 1,
              zoomJump: 0.1,
            },
            pdfVerticalScrollByDefault: true,
            header: {
              disableHeader: true,
              disableFileName: false,
              retainURLParams: false,
            },
          }}
          // style={{ height: 500 }}
        />
      </Drawer>
      {/* <Modal
        visible={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        footer={null}
        title="文档预览"
      >
       
      </Modal> */}

      {/* <DocxView /> */}
    </div>
  );
}

export default Documents;
