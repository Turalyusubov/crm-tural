import { Modal } from 'antd'
import styles from '../style.module.scss'
import { ActionModalProps } from '@/shared/types'
import { useDispatch } from 'react-redux'
import { objectForModal } from '@/redux/features/modalSlice'

const Delete: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen }) => {
    const dispatch = useDispatch()

    return (
        <Modal
            title="Are you sure to delete the prject?"
            centered
            open={modalOpen}
            onOk={() => setModalOpen(false)}
            okButtonProps={{ className: styles.primary_btn }}
            onCancel={() => {
                setModalOpen(false)
                dispatch(objectForModal(0))
            }}
        />
    )
}

export default Delete