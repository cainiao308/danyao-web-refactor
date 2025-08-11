import React from 'react';
import { Form, Input, Select, DatePicker, Button, Space } from '@arco-design/web-react';
import { DocumentFormats, DocumentTypes, ResearchTypes, DocumentStatuses } from './constants';

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
    <Form form={form} layout="inline" style={{ marginBottom: 16 }}>
      <Form.Item field="name" label="文档名称">
        <Input placeholder="请输入文档名称" allowClear />
      </Form.Item>

      <Form.Item field="format" label="文档格式">
        <Select placeholder="请选择文档格式" allowClear style={{ width: 120 }}>
          {DocumentFormats.map(format => (
            <Select.Option key={format} value={format}>
              {format}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item field="type" label="文档类型">
        <Select placeholder="请选择文档类型" allowClear style={{ width: 120 }}>
          {DocumentTypes.map(type => (
            <Select.Option key={type} value={type}>
              {type}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item field="researchType" label="科研类型">
        <Select placeholder="请选择科研类型" allowClear style={{ width: 120 }}>
          {ResearchTypes.map(type => (
            <Select.Option key={type} value={type}>
              {type}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item field="uploader" label="上传人">
        <Input placeholder="请输入上传人姓名" allowClear />
      </Form.Item>

      <Form.Item field="status" label="文档状态">
        <Select placeholder="请选择文档状态" allowClear style={{ width: 120 }}>
          {DocumentStatuses.map(status => (
            <Select.Option key={status} value={status}>
              {status}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item field="uploadTime" label="上传时间">
        <RangePicker placeholder={['开始时间', '结束时间']} style={{ width: 240 }} />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" onClick={handleSearch}>
            搜索
          </Button>
          <Button onClick={handleReset}>重置</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default SearchForm;
