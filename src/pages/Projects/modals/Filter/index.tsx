import InputComponent from '@/shared/components/InputComponent';
import { ProjectFilterFormType } from '@/shared/types';
import { Button, Drawer } from 'antd'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import styles from '../style.module.scss'
import { useDispatch } from 'react-redux';
import { objectForModal } from '@/redux/features/modalSlice';

const Filter: React.FC<any> = ({ modalOpen, setModalOpen, setQuery }) => {
    const {
        control,
        handleSubmit,
    } = useForm<ProjectFilterFormType>();

    const onSubmit: SubmitHandler<ProjectFilterFormType> = (data) => {
        setQuery((data.name.length > 0 ? `name=${data.name}&` : '') + 'page=1&size=10')
    }

    const dispatch = useDispatch()

    return (
        <Drawer title="Filter" onClose={() => {
            setModalOpen(false)
            dispatch(objectForModal(0))
        }} open={modalOpen}>
            <form className='modal-form' onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <InputComponent
                            id='name'
                            label='Project Name'
                            type='text'
                            placeholder="Enter project name"
                            field={field}
                        />
                    )}
                />
                <Button className={styles.primary_btn} htmlType='submit'>Submit</Button>
            </form>
        </Drawer>
    )
}

export default Filter