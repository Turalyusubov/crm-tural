import { Button, Flex } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react';
import styles from './style.module.scss'
import EmployeeTable from './component/EmployeeTable';
import View from './modals/View';
import Update from './modals/Update';
import Delete from './modals/Delete';
import Create from './modals/Create';
import Filter from './modals/Filter';
import ResetPassword from './modals/ResetPassword';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import RenderIf from '@/shared/components/RenderIf';


const Employees = () => {
    const { role } = useSelector((state: RootState) => state.profile.myProfile) || {}
    const [modalOpen, setModalOpen] = useState(false)
    const [status, setStatus] = useState<'view' | 'delete' | 'update' | 'create' | 'resetPassword' | 'filter'>('view')

    const [query, setQuery] = useState('')

    const handleCreate = () => {
        setModalOpen(true)
        setStatus('create')
    }

    const handleFilter = () => {
        setModalOpen(true)
        setStatus('filter')

    }

    const statusModal = {
        view:
            <RenderIf condition={modalOpen}>
                <View modalOpen={modalOpen} setModalOpen={setModalOpen} />
            </RenderIf>,
        update:
            <RenderIf condition={modalOpen}>
                <Update modalOpen={modalOpen} setModalOpen={setModalOpen} />,
            </RenderIf>,
        delete:
            <Delete modalOpen={modalOpen} setModalOpen={setModalOpen} />,
        create:
            <Create modalOpen={modalOpen} setModalOpen={setModalOpen} />,
        filter:
            <Filter setQuery={setQuery} modalOpen={modalOpen} setModalOpen={setModalOpen} />,
        resetPassword:
            <ResetPassword modalOpen={modalOpen} setModalOpen={setModalOpen} />
    }

    return (
        <>
            <Flex gap={10} style={{ paddingBottom: '20px', width: '100%' }} justify="end" align="center">
                {role?.roleName !== 'HEAD' && <Button className={styles.create_btn} onClick={handleCreate} icon={<PlusOutlined />}>Create</Button>}
                <Button className={styles.filter_btn} onClick={handleFilter}>Filter</Button>
            </Flex>
            <EmployeeTable query={query} setQuery={setQuery} setStatus={setStatus} setModalOpen={setModalOpen} />
            {/* <RenderIf condition={modalOpen}> */}
            {statusModal[status]}
            {/* </RenderIf> */}
        </>
    )
}

export default Employees