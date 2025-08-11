import useLocale from '@/utils/useLocale';
import {
  Button,
  Card,
  Message,
  PaginationProps,
  Space,
  Table,
  Typography,
} from '@arco-design/web-react';
import { IconDownload, IconPlus } from '@arco-design/web-react/icon';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { ArtilleryRecord, getColumns } from './constants';
import SearchForm from './form';
import locale from './locale';
import './mock';
import styles from './style/index.module.less';

const { Title } = Typography;

function ArtilleryList() {
  const t = useLocale(locale);

  const tableCallback = async (record: ArtilleryRecord, type: string) => {
    switch (type) {
      case 'view':
        Message.info(`查看火炮：${record.name}`);
        break;
      case 'edit':
        Message.info(`编辑火炮：${record.name}`);
        break;
      case 'delete':
        Message.warning(`删除火炮：${record.name}`);
        break;
      default:
        break;
    }
  };

  const columns = useMemo(() => getColumns(t, tableCallback), [t]);

  const [data, setData] = useState<ArtilleryRecord[]>([]);
  const [pagination, setPagination] = useState<PaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
  });
  const [loading, setLoading] = useState(true);
  const [formParams, setFormParams] = useState({});

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, JSON.stringify(formParams)]);

  function fetchData() {
    const { current, pageSize } = pagination;
    setLoading(true);
    axios
      .get('/api/weapons/artillery', {
        params: {
          page: current,
          pageSize,
          ...formParams,
        },
      })
      .then(res => {
        setData(res.data.list);
        setPagination({
          ...pagination,
          current,
          pageSize,
          total: res.data.total,
        });
      })
      .catch(() => {
        Message.error('获取火炮数据失败');
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

  const handleAdd = () => {
    Message.info('添加新火炮');
  };

  const handleExport = () => {
    Message.info('导出火炮数据');
  };

  return (
    <div className={styles.container}>
      <Card>
        <Title heading={6}>{t['artillery.title']}</Title>
        <SearchForm onSearch={handleSearch} />
        <div className={styles.toolbar}>
          <div className={styles['toolbar-left']}>
            <Space>
              <Button type="primary" icon={<IconPlus />} onClick={handleAdd}>
                添加火炮
              </Button>
            </Space>
          </div>
          <div className={styles['toolbar-right']}>
            <Button icon={<IconDownload />} onClick={handleExport}>
              导出数据
            </Button>
          </div>
        </div>
        <div className={styles['table-wrapper']}>
          <Table
            rowKey="id"
            loading={loading}
            onChange={onChangeTable}
            pagination={pagination}
            columns={columns}
            data={data}
            scroll={{
              x: 2000,
              y: 600,
            }}
            borderCell
            stripe
          />
        </div>
      </Card>
    </div>
  );
}

export default ArtilleryList;
