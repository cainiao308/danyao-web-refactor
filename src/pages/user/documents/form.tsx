import { Button, DatePicker, Form, Grid, Input, Select } from '@arco-design/web-react';
import { IconRefresh, IconSearch } from '@arco-design/web-react/icon';
import { DocumentFormats, DocumentStatuses, DocumentTypes, ResearchTypes } from './constants';
import styles from './style/index.module.less';
const { Row, Col } = Grid;

const { RangePicker } = DatePicker;

interface SearchFormProps {
  onSearch: (params: Record<string, any>) => void;
  onReset: () => void;
}

function SearchForm({ onSearch, onReset }: SearchFormProps) {
  const [form] = Form.useForm();

  const handleSearch = () => {
    const values = form.getFields();
    onSearch(values);
  };

  const handleReset = () => {
    form.resetFields();
    onReset();
  };

  return (
    <div className={styles['search-form-wrapper']}>
      <Form
        form={form}
        labelAlign="left"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        className={styles['search-form']}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item field="name" label="文档名称">
              <Input placeholder="请输入文档名称" allowClear />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item field="format" label="文档格式">
              <Select placeholder="请选择文档格式" allowClear>
                {DocumentFormats.map(format => (
                  <Select.Option key={format} value={format}>
                    {format}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item field="type" label="文档类型">
              <Select placeholder="请选择文档类型" allowClear>
                {DocumentTypes.map(type => (
                  <Select.Option key={type} value={type}>
                    {type}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item field="researchType" label="科研类型">
              <Select placeholder="请选择科研类型" allowClear>
                {ResearchTypes.map(type => (
                  <Select.Option key={type} value={type}>
                    {type}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item field="uploader" label="上传人">
              <Input placeholder="请输入上传人姓名" allowClear />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item field="status" label="文档状态">
              <Select placeholder="请选择文档状态" allowClear>
                {DocumentStatuses.map(status => (
                  <Select.Option key={status} value={status}>
                    {status}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item field="uploadTime" label="上传时间">
              <RangePicker placeholder={['开始时间', '结束时间']} style={{ width: 240 }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className={styles['right-button']}>
        <Button type="primary" icon={<IconSearch />} onClick={handleSearch}>
          搜索
        </Button>
        <Button icon={<IconRefresh />} onClick={handleReset}>
          重置
        </Button>
      </div>
    </div>
  );
}

export default SearchForm;
