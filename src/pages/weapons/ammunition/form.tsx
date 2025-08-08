import React, { useContext } from 'react';
import { Form, Input, Select, Button, Grid } from '@arco-design/web-react';
import { GlobalContext } from '@/context';
import locale from './locale';
import useLocale from '@/utils/useLocale';
import { IconRefresh, IconSearch } from '@arco-design/web-react/icon';
import { AmmunitionTypes } from './constants';
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
            <Form.Item label="名称" field="name">
              <Input placeholder={t['ammunition.form.name.placeholder']} allowClear />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label={t['ammunition.columns.abbreviation']} field="abbreviation">
              <Input allowClear placeholder={t['ammunition.form.abbreviation.placeholder']} />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label="口径" field="caliber">
              <Input placeholder={t['ammunition.form.caliber.placeholder']} allowClear />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label={t['ammunition.columns.type']} field="type">
              <Select
                placeholder={t['ammunition.form.type.placeholder']}
                options={AmmunitionTypes.map(item => ({
                  label: item,
                  value: item,
                }))}
                mode="multiple"
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label={t['ammunition.columns.manufacturer']} field="manufacturer">
              <Input allowClear placeholder={t['ammunition.form.manufacturer.placeholder']} />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label={t['ammunition.columns.country']} field="country">
              <Input allowClear placeholder={t['ammunition.form.country.placeholder']} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className={styles['right-button']}>
        <Button type="primary" icon={<IconSearch />} onClick={handleSubmit}>
          {t['ammunition.form.search']}
        </Button>
        <Button icon={<IconRefresh />} onClick={handleReset}>
          {t['ammunition.form.reset']}
        </Button>
      </div>
    </div>
  );
}

export default SearchForm;
