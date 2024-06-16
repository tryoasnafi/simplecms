'use client';

import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from '@refinedev/antd';
import { type BaseRecord } from '@refinedev/core';
import { Space, Table } from 'antd';

export default function BlogPostList() {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={'ID'} />
        <Table.Column dataIndex="email" title={'E-Mail'} />
        <Table.Column dataIndex="name" title={'Name'} />
        <Table.Column dataIndex="role" title={'Role'} />
        <Table.Column
          dataIndex={['createdAt']}
          title={'Created at'}
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          title={'Actions'}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
}
