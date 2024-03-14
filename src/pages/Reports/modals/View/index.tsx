import { useGetReportByIdQuery } from '@/redux/api/reportsApi'
import { objectForModal } from '@/redux/features/modalSlice'
import { RootState } from '@/redux/store'
import { ActionModalProps } from '@/shared/types'
import { Drawer, Flex, Space, Typography } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const View: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen }) => {
    const objectId = useSelector((state: RootState) => state.modal.objectId)
    const { data } = useGetReportByIdQuery(objectId)

    console.log("objectId", objectId);

    function formatDateString(dateString: string) {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    const dispatch = useDispatch()

    return (
        <Drawer title="Report Info" onClose={() => {
            setModalOpen(false)
            dispatch(objectForModal(0))
        }} open={modalOpen}>
            <Flex vertical>
                <Space>
                    <Typography.Text strong>Employee:</Typography.Text>
                    <Typography.Text>{data?.firstName} {data?.lastName}</Typography.Text>
                </Space>
                <Space>
                    <Typography.Text strong>Project Title:</Typography.Text>
                    <Typography.Text>{data?.project?.projectName}</Typography.Text>
                </Space>
                <Space>
                    <Typography.Text strong>Created Date:</Typography.Text>
                    <Typography.Text>{formatDateString(data?.localDateTime)}</Typography.Text>
                </Space>
                <Space>
                    <Typography.Text strong>Report Text:</Typography.Text>
                </Space>
                <Space>
                    <div dangerouslySetInnerHTML={{ __html: data?.reportText }} />
                </Space>
            </Flex>
        </Drawer>
    )
}

export default View