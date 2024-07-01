import { memo } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Row, Space } from 'antd';
import { MeterGroup } from 'primereact/metergroup';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default memo(() => {
    const datas = [
        { label: 'Apps', color: '#34d399', value: 16, icon: 'pi pi-table' },
        { label: 'Messages', color: '#fbbf24', value: 8, icon: 'pi pi-inbox' },
        { label: 'Media', color: '#60a5fa', value: 24, icon: 'pi pi-image' },
        { label: 'System', color: '#c084fc', value: 10, icon: 'pi pi-cog' }
    ];

    return (
        <PageContainer>
            <Row gutter={[5, 5]}>
                {datas.map((item, _index) => (
                    <Col key={_index} xxl={6} xs={24}>
                        <Card
                            hoverable
                        >
                            <Space align="baseline" style={{ justifyContent: 'space-between', width: '100%' }}>
                                <div>
                                    {item.label}<br />
                                    {item.value}%
                                </div>
                                <i className={item.icon} style={{ color: item.color }} />
                            </Space>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row style={{ marginTop: 25 }}>
                <Col xxl={24}>
                    <MeterGroup values={datas} />
                </Col>
            </Row>
        </PageContainer>
    );
});
