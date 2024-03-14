import ActionButton from '@/shared/components/ActionButton';
import { ProjectType } from '@/shared/types';
import { Space, Table, TableColumnsType } from 'antd'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useGetProjectsQuery } from '@/redux/api/projectsApi';
import { useMemo, useState } from 'react';

const ProjectTable: React.FC<any> = ({ setStatus, setModalOpen, query, setQuery }) => {
    const { role } = useSelector((state: RootState) => state.profile.myProfile) || {}
    const { data: projectsData } = useGetProjectsQuery(query)
    const [pagination, _setPagination] = useState({ pageNumber: 1, pageSize: 7 });

    const handleTableChange = (pagination: any) => {
        const queryParams = new URLSearchParams(query);

        queryParams.set('pageNumber', pagination.current.toString());
        queryParams.set('pageSize', pagination.pageSize.toString());
        const updatedQuery = `${queryParams.toString()}`;

        setQuery(updatedQuery);
    };

    type ProjectTableType = {
        key: number;
        project: string;
    }
    const columns: TableColumnsType<ProjectTableType> = [
        {
            title: 'Project',
            dataIndex: 'project',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <ActionButton
                        objectId={record.key}
                        setStatus={setStatus}
                        setModalOpen={setModalOpen}
                        title='View'
                        icon={<EyeOutlined />}
                        type="view_button" />
                    {role?.roleName !== 'HEAD' &&
                        <ActionButton
                            objectId={record.key}
                            setStatus={setStatus}
                            setModalOpen={setModalOpen}
                            title='Update'
                            icon={<EditOutlined />}
                            type="update_button" />}
                </Space>
            ),
        },
    ];

    const data: ProjectTableType[] = useMemo(() => {
        return projectsData?.content?.map((project: ProjectType) => ({
            key: project.id,
            project: project.projectName || ''
        })) || []
    }, [projectsData])
    return (
        <Table
            pagination={{
                ...pagination,
                total: projectsData?.totalElements
            }}
            onChange={handleTableChange}
            bordered
            columns={columns}
            dataSource={data} />

    )
}

export default ProjectTable