import { Button, Flex } from "antd"
import { PlusOutlined, FileTextOutlined } from '@ant-design/icons'

import { useState } from "react";
import styles from './style.module.scss'
import ReportTable from "./component/ReportTable";
import View from "./modals/View";
import Update from "./modals/Update";
import Delete from "../Employees/modals/Delete";
import Create from "./modals/Create";
import Filter from "./modals/Filter";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import RenderIf from "@/shared/components/RenderIf";

const Reports = () => {

    const { role } = useSelector((state: RootState) => state.profile.myProfile) || {}
    const [modalOpen, setModalOpen] = useState(false)
    const [status, setStatus] = useState<'view' | 'update' | 'create' | 'delete' | 'resetPassword' | 'filter'>('view')

    const [query, setQuery] = useState()

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
                <Update modalOpen={modalOpen} setModalOpen={setModalOpen} />
            </RenderIf>,
        delete:
            <Delete modalOpen={modalOpen} setModalOpen={setModalOpen} />,
        create:
            <Create modalOpen={modalOpen} setModalOpen={setModalOpen} />,
        filter:
            <Filter setQuery={setQuery} modalOpen={modalOpen} setModalOpen={setModalOpen} />
    }

    return (
        <div>
            <Flex gap={10} style={{ paddingBottom: '20px' }} justify="space-between" align="center">
                <Flex style={{ width: '100%' }} justify="flex-end" gap={10}>
                    {role?.roleName !== 'EMPLOYEE' && <Button>Export <FileTextOutlined /></Button>}
                    {role?.roleName === 'EMPLOYEE' && <Button onClick={handleCreate} className={styles.create_btn} icon={<PlusOutlined />}>Create</Button>}
                    <Button className={styles.filter_btn} onClick={handleFilter}>Filter</Button>
                </Flex>
            </Flex>
            <ReportTable query={query} setQuery={setQuery} setStatus={setStatus} setModalOpen={setModalOpen} />
            {status !== 'resetPassword' ? statusModal[status] : null}
        </div>
    )
}

export default Reports