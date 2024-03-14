import { Tooltip } from 'antd'
import styles from './style.module.scss'
import { ActionButtonProps } from '@/shared/types'
import { useDispatch } from 'react-redux'
import { objectForModal } from '@/redux/features/modalSlice'

const ActionButton: React.FC<ActionButtonProps> = ({ icon, type, title, setModalOpen, setStatus, objectId }) => {

    const status = {
        View: 'view',
        Update: 'update',
        Delete: 'delete',
        Reset_Password: 'resetPassword'
    }

    const dispatch = useDispatch()

    return (
        <Tooltip placement="top" title={title}>
            <span onClick={() => {
                setModalOpen(true)
                objectId && dispatch(objectForModal(objectId))
                setStatus(status[title])
            }} className={styles[type]}>
                {icon}
            </span>
        </Tooltip>
    )
}

export default ActionButton