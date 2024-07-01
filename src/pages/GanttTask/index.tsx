import React, { memo, useEffect, useState } from 'react';
import { ModalForm, PageContainer, ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Input, Popconfirm, Space, message } from 'antd';
import { FormattedMessage, useIntl } from '@umijs/max';
import { ViewMode, Gantt, Task } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import ProCard from "@ant-design/pro-card";


export default memo(() => {
    const intl = useIntl();

    const [view, setView] = useState(ViewMode.Day);
    const [tasks, setTasks] = useState<Task[]>(initTasks());
    const [isChecked, setIsChecked] = useState(true);

    let locale = localStorage.getItem('umi_locale');

    if (locale !== 'id-ID' && locale !== 'en-US') {
        locale = 'id-ID';
        localStorage.setItem('umi_locale', locale);
    }

    function initTasks(): Task[] {
        const currentDate = new Date();
        return [
            {
                start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
                end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
                name: "Some Project",
                id: "ProjectSample",
                progress: 78,
                type: "project",
                hideChildren: false
            },
            {
                start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
                end: new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    2,
                    12,
                    28
                ),
                name: "Idea",
                id: "Task 0",
                progress: 45,
                type: "task",
                project: "ProjectSample"
            },
            {
                start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
                end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
                name: "Research",
                id: "Task 1",
                progress: 25,
                dependencies: ["Task 0"],
                type: "task",
                project: "ProjectSample"
            },
            {
                start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
                end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
                name: "Discussion with team",
                id: "Task 2",
                progress: 10,
                dependencies: ["Task 1"],
                type: "task",
                project: "ProjectSample"
            },
            {
                start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
                end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9, 0, 0),
                name: "Developing",
                id: "Task 3",
                progress: 2,
                dependencies: ["Task 2"],
                type: "task",
                project: "ProjectSample"
            },
            {
                start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
                end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
                name: "Review",
                id: "Task 4",
                type: "task",
                progress: 70,
                dependencies: ["Task 2"],
                project: "ProjectSample"
            },
            {
                start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
                end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
                name: "Release",
                id: "Task 6",
                progress: currentDate.getMonth(),
                type: "milestone",
                dependencies: ["Task 4"],
                project: "ProjectSample"
            },
            {
                start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
                end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
                name: "Party Time",
                id: "Task 9",
                progress: 0,
                isDisabled: true,
                type: "task"
            }
        ];
    }

    let columnWidth = 60;
    if (view === ViewMode.Month) {
        columnWidth = 300;
    } else if (view === ViewMode.Week) {
        columnWidth = 250;
    }

    const handleTaskDelete = (task: Task) => {
        const conf = window.confirm("Are you sure about " + task.name + " ?");
        if (conf) {
            setTasks(tasks.filter((t) => t.id !== task.id));
        }
        return conf;
    };

    const handleProgressChange = (task: Task) => {
        setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
        console.log("On progress change Id:" + task.id);
    };

    const handleTaskChange = (task: Task) => {
        setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
        console.log("On date change Id:" + task.id);
    };

    const handleDblClick = (task: Task) => {
        alert("On Double Click event Id:" + task.id);
    };

    const handleSelect = (task: Task, isSelected: boolean) => {
        console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
    };

    const handleExpanderClick = (task: Task) => {
        setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
        console.log("On expander click Id:" + task.id);
    };

    return (
        <PageContainer>
            <ProCard
                title={[
                    <ViewSwitcher
                        onViewModeChange={(viewMode: ViewMode) => setView(viewMode)}
                        onViewListChange={setIsChecked}
                        isChecked={isChecked}
                    />
                ]}
            >
                <Gantt
                    todayColor="rgba(66, 66, 63 ,0.2)"
                    fontSize="14px"
                    rowHeight={40}
                    tasks={tasks}
                    viewMode={view}
                    locale={locale}
                    // onDateChange={handleTaskChange}
                    // onDelete={handleTaskDelete}
                    // onProgressChange={handleProgressChange}
                    // onDoubleClick={handleDblClick}
                    // onSelect={handleSelect}
                    onExpanderClick={handleExpanderClick}
                    listCellWidth={isChecked ? "155px" : ""}
                    columnWidth={columnWidth}
                />
            </ProCard>
        </PageContainer>
    );
});


interface ViewSwitcherProps {
    onViewModeChange: (viewMode: ViewMode) => void;
    onViewListChange: (isChecked: boolean) => void;
    isChecked: boolean;
}

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ onViewModeChange, onViewListChange, isChecked }) => {
    return (
        <div>
            <Space>
                <Button onClick={() => onViewModeChange(ViewMode.Day)}><FormattedMessage id={'pages.label.day'} /></Button>
                <Button onClick={() => onViewModeChange(ViewMode.Week)}><FormattedMessage id={'pages.label.week'} /></Button>
                <Button onClick={() => onViewModeChange(ViewMode.Month)}><FormattedMessage id={'pages.label.month'} /></Button>
                <label>
                    <input type="checkbox" checked={isChecked} onChange={(e) => onViewListChange(e.target.checked)} />
                    <FormattedMessage id={'pages.label.show-list'} />
                </label>
            </Space>
        </div>
    );
};
