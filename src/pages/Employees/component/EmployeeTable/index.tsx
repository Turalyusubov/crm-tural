import ActionButton from '@/shared/components/ActionButton';
import { Space, Table, TableColumnsType, Tag } from 'antd'
import { EditOutlined, DeleteOutlined, EyeOutlined, LockOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useGetUsersQuery, useToggleStatusMutation } from '@/redux/api/usersApi';
import { useMemo, useState } from 'react';
import { EmployeeTableType, UserApiType } from '@/shared/types';

const EmployeeTable: React.FC<any> = ({ setStatus, setModalOpen, query, setQuery }) => {
    const { role } = useSelector((state: RootState) => state.profile.myProfile) || {}
    const { data: employeesData } = useGetUsersQuery(query)
    const [toggleStatus] = useToggleStatusMutation()
    const [pagination, _setPagination] = useState({ pageNumber: 1, pageSize: 7 });

    const handleStatusToggle = (id: number, text: string) => {
        const newStatus = text === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
        toggleStatus({
            userId: id,
            status: newStatus
        })
    }
    const handleTableChange = (pagination: any) => {
        const queryParams = new URLSearchParams(query);

        queryParams.set('pageNumber', pagination.current.toString());
        queryParams.set('pageSize', pagination.pageSize.toString());
        const updatedQuery = `${queryParams.toString()}`;

        setQuery(updatedQuery);
    };

    const columns: TableColumnsType<EmployeeTableType> = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
        },
        {
            title: 'Mail',
            dataIndex: 'mail',
        },
        {
            title: 'Team',
            dataIndex: 'team',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (text, record) => (
                <Tag style={{ cursor: 'pointer' }} onClick={() => handleStatusToggle(record.key, text)} color={text === 'ACTIVE' ? 'green' : 'red'}>
                    {text}
                </Tag>
            ),
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
                    {role?.roleName !== 'HEAD' &&
                        <ActionButton
                            objectId={record.key}
                            setStatus={setStatus}
                            setModalOpen={setModalOpen}
                            title='Reset_Password'
                            icon={<LockOutlined />}
                            type="reset_button" />}
                    {role?.roleName !== 'HEAD' &&
                        <ActionButton
                            objectId={record.key}
                            setStatus={setStatus}
                            setModalOpen={setModalOpen}
                            title='Delete'
                            icon={<DeleteOutlined />}
                            type="delete_button" />}
                </Space>
            ),
        }
    ];

    const data: EmployeeTableType[] = useMemo(() => {
        return employeesData?.content.map((employee: UserApiType) => ({
            key: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            mail: employee.mail,
            team: employee?.team?.teamName || 'No team',
            role: employee.role.roleName,
            status: employee.status
        })) || []
    }, [employeesData])

    return (
        <Table
            bordered
            pagination={{
                ...pagination,
                total: employeesData?.totalElements
            }}
            onChange={handleTableChange}
            columns={columns}
            dataSource={data} />

    )
}

export default EmployeeTable