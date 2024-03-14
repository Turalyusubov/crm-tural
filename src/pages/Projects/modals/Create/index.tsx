import { Button, Modal, Select, message } from 'antd'
import styles from '../style.module.scss'
import { ActionModalProps } from '@/shared/types'
import { useCreateProjectMutation } from '@/redux/api/projectsApi'
import { useGetUsersForSelectQuery } from '@/redux/api/usersApi'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ProjectFormType } from '@/validation'
import InputComponent from '@/shared/components/InputComponent'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { objectForModal } from '@/redux/features/modalSlice'

const Create: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen }) => {
    const { data: userData } = useGetUsersForSelectQuery()
    const [createProject, { isSuccess }] = useCreateProjectMutation()

    useEffect(() => {
        if (isSuccess) {
            message.open({
                type: 'success',
                content: `Project has successfully created!`,
            })
            setModalOpen(false)
        }
    }, [isSuccess])

    const {
        control,
        handleSubmit,
    } = useForm<ProjectFormType>()

    const onSubmit: SubmitHandler<ProjectFormType> = (data) => {
        createProject({
            projectName: data.projectName,
            userIds: data.employees
        });
    }

    const dispatch = useDispatch()

    return (
        <Modal
            title="Create Project"
            centered
            open={modalOpen}
            onOk={() => setModalOpen(false)}
            onCancel={() => {
                setModalOpen(false)
                dispatch(objectForModal(0))
            }}
            footer={false}
        >
            <form className='modal-form' onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="projectName"
                    control={control}
                    render={({ field }) => (
                        <InputComponent
                            id='projectName'
                            label='Project Name'
                            type='text'
                            placeholder="Enter project name you want to create"
                            field={field}
                        />
                    )}
                />
                <span>Employees</span>
                <Controller
                    name="employees"
                    control={control}
                    render={({ field }) => (
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            options={userData && userData
                                .map((user: { id: number, fullName: string, mail: string }) => ({
                                    value: user.id,
                                    label: user.fullName,
                                }))
                            }
                            {...field}
                        />
                    )}
                />
                <Button className={styles.primary_btn} htmlType='submit'>Create</Button>
            </form>
        </Modal>
    )
}

export default Create