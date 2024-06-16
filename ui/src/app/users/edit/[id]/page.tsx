'use client';

import { Edit, useForm } from '@refinedev/antd';
import { Form, Input, Select } from 'antd';

export default function BlogPostEdit() {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={'Name'}
          name={['name']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={'E-Mail'}
          name={['email']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item label={'Password'} name={['password']}>
          <Input type="password" />
        </Form.Item>
        <Form.Item
          label={'Role'}
          name={['role']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select Role"
            style={{ width: 300 }}
            options={[
              {
                value: 'writer',
                label: 'Writer',
              },
              {
                value: 'admin',
                label: 'Administrator',
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
}
