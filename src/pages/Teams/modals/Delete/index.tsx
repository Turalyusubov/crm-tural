import { Modal, message } from 'antd'
import styles from '../style.module.scss'
import { ActionModalProps } from '@/shared/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useDeleteTeamMutation } from '@/redux/api/teamsApi'
import { useEffect } from 'react'
import { objectForModal } from '@/redux/features/modalSlice'

const Delete: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen }) => {
    const objectId = useSelector((state: RootState) => state.modal.objectId)
    const [deleteTeam, { isSuccess }] = useDeleteTeamMutation()

    useEffect(() => {
        if (isSuccess)
            message.open({
                type: 'success',
                content: `Team has successfully deleted!`,
            });
    }, [isSuccess])

    const dispatch = useDispatch()

    return (
        <Modal
            title="Are you sure to delete the team?"
            centered
            open={modalOpen}
            onOk={() => {
                setModalOpen(false)
                deleteTeam(objectId)
            }
            }
            okButtonProps={{ className: styles.primary_btn }}
            onCancel={() => {
                setModalOpen(false)
                dispatch(objectForModal(0))
            }}
        />
    )
}

export default Delete