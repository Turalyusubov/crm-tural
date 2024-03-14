import ActionButton from '@/shared/components/ActionButton';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import { TableProps, TeamTableType } from '@/shared/types';
import { Space, Table, TableColumnsType } from 'antd'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useGetTeamsQuery } from '@/redux/api/teamsApi';
import { useMemo } from 'react';

const TeamTable: React.FC<TableProps> = ({ setStatus, setModalOpen }) => {
    const { role } = useSelector((state: RootState) => state.profile.myProfile) || {}
    const { data: teamsData } = useGetTeamsQuery()

    const columns: TableColumnsType<TeamTableType> = [
        {
            title: 'Team',
            dataIndex: 'team',
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
                            title='Delete'
                            icon={<DeleteOutlined />}
                            type="delete_button" />}
                </Space>
            ),
        },
    ];

    const data: TeamTableType[] = useMemo(() => {
        return teamsData?.map((team) => ({
            key: team.id,
            team: team.teamName || ''
        })) || []
    }, [teamsData])

    return (
        <Table bordered columns={columns} dataSource={data} />
    )
}

export default TeamTable