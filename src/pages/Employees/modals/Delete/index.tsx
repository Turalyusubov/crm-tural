import { Modal, message } from 'antd'
import styles from '../style.module.scss'
import { ActionModalProps } from '@/shared/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useDeleteUserMutation } from '@/redux/api/usersApi'
import { useEffect } from 'react'
import { objectForModal } from '@/redux/features/modalSlice'

const Delete: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen }) => {
    const objectId = useSelector((state: RootState) => state.modal.objectId)
    const [deleteUser, { isSuccess }] = useDeleteUserMutation()

    useEffect(() => {
        if (isSuccess) {
            message.open({
                type: 'success',
                content: `User has successfully deleted!`,
            });
        }
    }, [isSuccess])

    const dispatch = useDispatch()

    return (
        <Modal
            title="Are you sure to delete the user?"
            centered
            open={modalOpen}
            onOk={() => {
                setModalOpen(false)
                deleteUser(objectId)
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