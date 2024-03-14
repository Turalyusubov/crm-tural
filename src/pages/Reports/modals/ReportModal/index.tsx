import { ModalProps } from '@/shared/types';
import View from '../View';
import Update from '../Update';
import Create from '../Create';

const ReportModal: React.FC<ModalProps> = ({ statusType, modalOpen, setModalOpen }) => {

    const status = {
        view:
            <View modalOpen={modalOpen} setModalOpen={setModalOpen} />,
        update:
            <Update modalOpen={modalOpen} setModalOpen={setModalOpen} />,
        create:
            <Create modalOpen={modalOpen} setModalOpen={setModalOpen} />,
    }

    return (statusType !== 'resetPassword' && statusType !== 'delete')
        ? status[statusType] : null
    // return status[statusType]

}

export default ReportModal