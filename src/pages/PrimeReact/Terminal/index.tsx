import { PageContainer } from '@ant-design/pro-components';
import React, { memo, useEffect } from 'react';
import { Terminal } from 'primereact/terminal';
import { TerminalService } from 'primereact/terminalservice';

export default memo(() => {
    const commandHandler = (text: string) => {
        let response: any;
        let argsIndex: number = text.indexOf(' ');
        let command: string = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

        switch (command) {
            case 'date':
                response = 'Today is ' + new Date().toDateString();
                break;

            case 'greet':
                response = 'Hola ' + text.substring(argsIndex + 1) + '!';
                break;

            case 'random':
                response = Math.floor(Math.random() * 100).toString();
                break;

            case 'm.dash':
                window.open('http://192.168.99.28:8000/welcome', '_blank');
                response = 'Dashboard menu opened!';
                break;

            case 'm.admin':
                window.open('http://192.168.99.28:8000/admin/sub-page', '_blank');
                response = 'Admin menu opened!';
                break;

            case 'clear':
                response = null;
                break;

            default:
                response = 'Unknown command: ' + command;
                break;
        }

        if (response)
            TerminalService.emit('response', response);
        else
            TerminalService.emit('clear');
    };

    useEffect(() => {
        TerminalService.on('command', commandHandler);

        return () => {
            TerminalService.off('command', commandHandler);
        };
    }, []);
    return (
        <PageContainer>
            <div style={{ height: '40vh', display: 'flex', flexDirection: 'column' }}>
                <Terminal
                    style={{
                        backgroundColor: '#000000',
                        color: '#00FF00',
                        fontFamily: 'Consolas, monospace',
                        padding: '10px',
                        flex: 1,
                        overflow: 'auto'
                    }}
                    welcomeMessage="Welcome to Elx"
                    prompt="Elx$"
                    pt={{
                        root: { className: 'bg-black text-green-500 border-round' },
                        prompt: { className: 'text-green-500 mr-2' },
                        command: { className: 'text-green-500' },
                        response: { className: 'text-green-500' }
                    }}
                />
            </div>
        </PageContainer>
    )
})

