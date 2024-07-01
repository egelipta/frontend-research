import { PageContainer } from '@ant-design/pro-components';
import React, { memo, useState } from 'react';

import { Editor } from "primereact/editor";

export default memo(() => {
    const [text, setText] = useState<string>('');
    return (
        <PageContainer>
            <Editor value={text} onTextChange={(e) => setText(e.htmlValue ?? '')} style={{ height: '320px' }} />
        </PageContainer>
    )
})

