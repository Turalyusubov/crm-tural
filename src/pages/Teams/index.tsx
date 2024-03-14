import { Button, Flex } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react';
import styles from './style.module.scss'
import TeamTable from './component/TeamTable';
import View from './modals/View';
import Update from './modals/Update';
import Delete from './modals/Delete';
import Create from './modals/Create';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import RenderIf from '@/shared/components/RenderIf';

const Teams = () => {
    const { role } = useSelector((state: RootState) => state.profile.myProfile) || {}
    const [modalOpen, setModalOpen] = useState(false)
    const [status, setStatus] = useState<'view' | 'update' | 'create' | 'delete' | 'resetPassword'>('view')

    const handleCreate = () => {
        setModalOpen(true)
        setStatus('create')
    }

    const statusModal = {
        view:
            <RenderIf condition={modalOpen}>
                <View modalOpen={modalOpen} setModalOpen={setModalOpen} />
            </RenderIf>,
        update:
            <RenderIf condition={modalOpen}>
                <Update modalOpen={modalOpen} setModalOpen={setModalOpen} />
            </RenderIf>,
        delete:
            <Delete modalOpen={modalOpen} setModalOpen={setModalOpen} />,
        create:
            <Create modalOpen={modalOpen} setModalOpen={setModalOpen} />,
    }

    return (
        <>
            <Flex gap={10} style={{ paddingBottom: '20px' }} justify="end" align="center">
                {role?.roleName !== 'HEAD' &&
                    <Button
                        className={styles.create_btn}
                        onClick={handleCreate}
                        icon={<PlusOutlined />}>Create</Button>}
            </Flex>
            <TeamTable setStatus={setStatus} setModalOpen={setModalOpen} />
            {status !== 'resetPassword' ? statusModal[status] : null}
        </>
    )
}


export default Teams