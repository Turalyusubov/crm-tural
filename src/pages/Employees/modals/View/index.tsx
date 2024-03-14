import { useGetUserByIdQuery } from '@/redux/api/usersApi'
import { objectForModal } from '@/redux/features/modalSlice'
import { RootState } from '@/redux/store'
import { ActionModalProps } from '@/shared/types'
import { Drawer, Flex, Space, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

const View: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen }) => {
    const objectId = useSelector((state: RootState) => state.modal.objectId)
    const { data } = useGetUserByIdQuery(objectId)

    const dispatch = useDispatch()

    // useEffect(() => {
    //     if(objectId !== 0) {
    //         getUserById(objectId)
    //     }
    // }, [])

    // return isError && <p>ERROR VAR</p>

    return (
        <Drawer title="Employee Info" onClose={() => {
            setModalOpen(false)
            dispatch(objectForModal(0))
        }} open={modalOpen}>
            <Flex vertical>
                <Space>
                    <Typography.Text strong>Name:</Typography.Text>
                    <Typography.Text>{data?.firstName}</Typography.Text>
                </Space>
                <Space>
                    <Typography.Text strong>Surname:</Typography.Text>
                    <Typography.Text>{data?.lastName}</Typography.Text>
                </Space>
                <Space>
                    <Typography.Text strong>Mail:</Typography.Text>
                    <Typography.Text>{data?.mail}</Typography.Text>
                </Space>
                <Space>
                    <Typography.Text strong>Team:</Typography.Text>
                    <Typography.Text>{data?.team?.teamName || 'No team'}</Typography.Text>
                </Space>
                <Space>
                    <Typography.Text strong>Role:</Typography.Text>
                    <Typography.Text>{data?.role.roleName}</Typography.Text>
                </Space>
                <Space>
                    <Typography.Text strong>Status:</Typography.Text>
                    <Typography.Text>{data?.status}</Typography.Text>
                </Space>
                <Space>
                    <Typography.Text strong>Projects:</Typography.Text>
                </Space>
                <Space>
                    <Typography.Text>
                        {data?.projects.length === 0 ? 'No projects' :
                            data?.projects.map(project => project.projectName).join(', ')
                        }</Typography.Text>
                </Space>
            </Flex>
        </Drawer>
    )
}

export default View