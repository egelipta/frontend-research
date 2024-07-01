import { memo, useState } from 'react';
import { DrawerForm, PageContainer } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { FlowView, FlowViewNode, SelectType, useEdgesState, useNodesState, FlowViewEdge } from '@ant-design/pro-flow';
import './styles.css';

export default memo(() => {
    const intl = useIntl();
    const [selectedEdge, setSelectedEdge] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [nodes, setNodes, onNodesChange] = useNodesState([
        {
            id: 'node1',
            data: {
                title: 'Node 1',
                logo: 'https://mdn.alipayobjects.com/huamei_ntgeqc/afts/img/A*kgyiRKi04eUAAAAAAAAAAAAADvuvAQ/original',
                description: '1_API',
            },
        },
        {
            id: 'node2',
            data: {
                title: 'Node 2',
                logo: 'https://mdn.alipayobjects.com/huamei_ntgeqc/afts/img/A*kgyiRKi04eUAAAAAAAAAAAAADvuvAQ/original',
                description: '2_API',
            },
        },
        {
            id: 'node3',
            data: {
                title: 'Node 3',
                logo: 'https://mdn.alipayobjects.com/huamei_ntgeqc/afts/img/A*kgyiRKi04eUAAAAAAAAAAAAADvuvAQ/original',
                description: '3_API',
            },
        },
    ]);

    const [edges, setEdges, onEdgesChange] = useEdgesState([
        {
            id: 'node1-node2',
            source: 'node1',
            target: 'node2',
            type: 'smoothstep',
            animated: true,
            label: 'Kabel 1'
        },
        {
            id: 'node1-node3',
            source: 'node1',
            target: 'node3',
            type: 'smoothstep',
            animated: true,
            label: 'Kabel 2'
        },
    ]);


    const handleHighlight = (node: FlowViewNode) => {
        nodes.forEach((_node) => {
            if (_node.id === node.id) {
                _node.select = SelectType.SELECT;
            }
        });
        setNodes(nodes);
        setEdges(
            edges.map((edge: FlowViewEdge) => {
                if (edge.source === node.id || edge.target === node.id) {
                    edge.select = SelectType.SELECT;
                }
                return {
                    ...edge,
                };
            }),
        );
    };

    const handleUnHighlight = () => {
        setNodes(
            nodes.map((_node) => {
                _node.select = SelectType.DEFAULT;
                return _node;
            }),
        );
        setEdges(
            edges.map((edge: FlowViewEdge) => {
                edge.select = SelectType.DEFAULT;
                return edge;
            }),
        );
    };

    const handleEdgeClick = (e: any, edge: any) => {
        setSelectedEdge(edge);
        setModalVisible(true);
    };

    return (
        <PageContainer>
            <div className='container'>
                <FlowView
                    nodes={nodes}
                    edges={edges}
                    miniMap={true}
                    background={false}
                    onEdgesChange={onEdgesChange}
                    onNodesChange={onNodesChange}
                    onNodeDragStart={(_e, node: any) => handleHighlight(node)}
                    onNodeClick={(_e, node: any) => handleHighlight(node)}
                    onPaneClick={handleUnHighlight}
                    onEdgeClick={(e, edge) => handleEdgeClick(e, edge)}
                />
            </div>
            {/* <FormattedMessage id="pages.table.title" /> */}
            {selectedEdge && (
                <DrawerForm
                    submitter={false}
                    width={500}
                    open={modalVisible}
                    onOpenChange={setModalVisible}
                >
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus fugit ut vitae nam omnis expedita fugiat consequuntur doloribus consequatur nostrum accusantium saepe amet commodi ex tempora odit, autem aperiam molestiae?
                </DrawerForm>
            )}
        </PageContainer>
    );
});
