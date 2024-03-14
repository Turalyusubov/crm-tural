import { ModalProps } from '@/shared/types'
import View from '../View'
import Update from '../Update'
import Delete from '../Delete'
import Create from '../Create'


const ProjectModal: React.FC<ModalProps> = ({ statusType, modalOpen, setModalOpen }) => {
    const status = {
        view:
            <View modalOpen={modalOpen} setModalOpen={setModalOpen} />,
        update:
            <Update modalOpen={modalOpen} setModalOpen={setModalOpen} />,
        delete:
            <Delete modalOpen={modalOpen} setModalOpen={setModalOpen} />,
        create:
            <Create modalOpen={modalOpen} setModalOpen={setModalOpen} />,
    }
    return statusType !== 'resetPassword'
        ? status[statusType] : null
    // return status[statusType]

}

export default ProjectModal