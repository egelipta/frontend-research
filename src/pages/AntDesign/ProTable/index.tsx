import { memo, useState } from 'react';
import { ModalForm, PageContainer, ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Input, Popconfirm, Space, message } from 'antd';
import { FormattedMessage, useIntl } from '@umijs/max';

export default memo(() => {
    const intl = useIntl();

    const [searchText, setSearchText] = useState('');
    const [modalVisit, setModalVisit] = useState(false);


    const dataTable = [
        { id: 1, name: 'Name1', value: 5, status: 'Normal' },
        { id: 2, name: 'Name2', value: 10, status: 'High' },
        { id: 3, name: 'Name3', value: 3, status: 'Low' },
        { id: 4, name: 'Name4', value: 8, status: 'Normal' },
        { id: 5, name: 'Name5', value: 7, status: 'Normal' },
        { id: 6, name: 'Name6', value: 15, status: 'High' },
        { id: 7, name: 'Name7', value: 2, status: 'Low' },
        { id: 8, name: 'Name8', value: 6, status: 'Normal' },
        { id: 9, name: 'Name9', value: 12, status: 'High' },
        { id: 10, name: 'Name10', value: 4, status: 'Normal' },
        { id: 11, name: 'Name11', value: 9, status: 'Normal' },
        { id: 12, name: 'Name12', value: 1, status: 'Low' },
        { id: 13, name: 'Name13', value: 14, status: 'High' },
        { id: 14, name: 'Name14', value: 11, status: 'High' },
        { id: 15, name: 'Name15', value: 13, status: 'High' },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Nilai',
            dataIndex: 'value',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: <FormattedMessage id="pages.action.optionTitle" />,
            width: 180,
            key: 'option',
            valueType: 'option',
            render: () => [
                <Button type="dashed" size='small'>
                    <FormattedMessage id="pages.action.update" />
                </Button>,
                <Popconfirm
                    title={intl.formatMessage({ id: 'pages.popConfirm.title' })}
                    description={intl.formatMessage({ id: 'pages.popConfirm.description' })}
                    // onConfirm={confirm}
                    // onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger size='small'><FormattedMessage id="pages.action.delete" /></Button>
                </Popconfirm>,
            ],
        },
    ];

    const filteredData = dataTable.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.value.toString().includes(searchText) ||
        item.status.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <PageContainer>
            <ProTable
                defaultSize='small'
                headerTitle={[<b><i><FormattedMessage id="pages.table.title" /></i></b>]}
                search={false}
                columns={columns}
                dataSource={filteredData}
                toolBarRender={() => [
                    <Space>
                        <Input.Search
                            placeholder={intl.formatMessage({ id: 'pages.search.placeholder' })}
                            allowClear
                            enterButton
                            // value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <Button
                            type="primary"
                            onClick={() => {
                                setModalVisit(true);
                            }}
                        >
                            + <FormattedMessage id="pages.button.add" />
                        </Button>
                    </Space>
                ]}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '25', '50', '100'],
                }}
            />

            <ModalForm
                title={intl.formatMessage({ id: 'pages.button.add' })}
                open={modalVisit}
                onFinish={async () => {
                    message.success('Berhasil...');
                    return true;
                }}
                onOpenChange={setModalVisit}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dolorem voluptate aliquid id eum cum. Esse temporibus voluptate voluptatibus doloremque, aperiam, fuga earum repellendus nihil ad, quod minima dolorum impedit.
            </ModalForm>
        </PageContainer>
    );
});
