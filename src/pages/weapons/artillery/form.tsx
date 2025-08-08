import React, { useContext } from 'react';
import { Form, Input, Select, Button, Grid } from '@arco-design/web-react';
import { GlobalContext } from '@/context';
import locale from './locale';
import useLocale from '@/utils/useLocale';
import { IconRefresh, IconSearch } from '@arco-design/web-react/icon';
import { ArtilleryTypes } from './constants';
import styles from './style/index.module.less';

const { Row, Col } = Grid;
const { useForm } = Form;

interface SearchFormProps {
  onSearch: (values: Record<string, string | string[]>) => void;
}

function SearchForm(props: SearchFormProps) {
  const { lang } = useContext(GlobalContext);
  const t = useLocale(locale);
  const [form] = useForm();

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    props.onSearch(values);
  };

  const handleReset = () => {
    form.resetFields();
    props.onSearch({});
  };

  const colSpan = lang === 'zh-CN' ? 8 : 12;

  return (
    <div className={styles['search-form-wrapper']}>
      <Form
        form={form}
        className={styles['search-form']}
        labelAlign="left"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
      >
        <Row gutter={24}>
          <Col span={colSpan}>
            <Form.Item label={t['artillery.columns.name']} field="name">
              <Input placeholder={t['artillery.form.name.placeholder']} allowClear />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label={t['artillery.columns.caliber']} field="caliber">
              <Input allowClear placeholder={t['artillery.form.caliber.placeholder']} />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label={t['artillery.columns.type']} field="type">
              <Select
                placeholder={t['artillery.form.type.placeholder']}
                options={ArtilleryTypes.map(item => ({
                  label: item,
                  value: item,
                }))}
                mode="multiple"
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label={t['artillery.columns.manufacturer']} field="manufacturer">
              <Input allowClear placeholder={t['artillery.form.manufacturer.placeholder']} />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label={t['artillery.columns.country']} field="country">
              <Input allowClear placeholder={t['artillery.form.country.placeholder']} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className={styles['right-button']}>
        <Button type="primary" icon={<IconSearch />} onClick={handleSubmit}>
          {t['artillery.form.search']}
        </Button>
        <Button icon={<IconRefresh />} onClick={handleReset}>
          {t['artillery.form.reset']}
        </Button>
      </div>
    </div>
  );
}

export default SearchForm;
