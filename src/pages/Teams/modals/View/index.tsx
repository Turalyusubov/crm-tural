import { useGetTeamByIdQuery } from '@/redux/api/teamsApi'
import { objectForModal } from '@/redux/features/modalSlice'
import { RootState } from '@/redux/store'
import { ActionModalProps } from '@/shared/types'
import { Drawer, Flex, Space, Typography } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const View: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen }) => {
    const objectId = useSelector((state: RootState) => state.modal.objectId)
    const { data } = useGetTeamByIdQuery(objectId)

    const dispatch = useDispatch()

    return (
        <Drawer title="Team Info" onClose={() => {
            setModalOpen(false)
            dispatch(objectForModal(0))
        }} open={modalOpen}>
            <Flex vertical>
                <Space>
                    <Typography.Text strong>Team Title:</Typography.Text>
                    <Typography.Text>{data?.name}</Typography.Text>
                </Space>
                <Space>
                    <Typography.Text strong>Employees:</Typography.Text>
                    <Typography.Text>{data?.users && data.users.length > 0 ?
                        data?.users.map(user => `${user.firstName} ${user.lastName}`).join(', ') :
                        'There is no employees in this team'
                    }</Typography.Text>
                </Space>
            </Flex>
        </Drawer>
    )
}

export default View