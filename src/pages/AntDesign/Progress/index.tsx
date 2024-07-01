import { PageContainer } from '@ant-design/pro-components';
import React, { memo } from 'react';

export default memo(() => {

    const gambar = (
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 50 L1150 150 L1200 50 Z" fill='green' />
        </svg>
    );

    return (
        <PageContainer>
            <div style={{ marginTop: '50px', textAlign: 'center' }}>
                {gambar}
            </div>
        </PageContainer>
    );
});
