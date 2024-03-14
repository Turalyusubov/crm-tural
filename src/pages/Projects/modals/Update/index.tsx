import { Button, Modal, Select, message } from 'antd'
import styles from '../style.module.scss'
import { ActionModalProps } from '@/shared/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useGetUsersForSelectQuery } from '@/redux/api/usersApi'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import InputComponent from '@/shared/components/InputComponent'
import { useGetProjectByIdQuery, useUpdateProjectMutation } from '@/redux/api/projectsApi'
import { ProjectFormScheme, ProjectFormType } from '@/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { objectForModal } from '@/redux/features/modalSlice'

const Update: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen }) => {
    const objectId = useSelector((state: RootState) => state.modal.objectId)
    const { data } = useGetProjectByIdQuery(objectId)
    const { data: userData } = useGetUsersForSelectQuery()
    const [updateProject, { isSuccess }] = useUpdateProjectMutation()

    useEffect(() => {
        if (isSuccess) {
            message.open({
                type: 'success',
                content: `Project has successfully updated!`,
            })
            setModalOpen(false)
        }
    }, [isSuccess])

    const {
        control,
        handleSubmit,
        reset,
    } = useForm<ProjectFormType>({ resolver: zodResolver(ProjectFormScheme) })

    const onSubmit: SubmitHandler<ProjectFormType> = (data) => {
        updateProject({
            id: objectId,
            data: {
                projectName: data.projectName,
                userIds: data.employees
            }
        });
    }

    useEffect(() => {
        if (data) {
            const { projectName, users } = data;
            reset({ projectName, employees: users?.map((user: any) => user.id) });
        }
    }, [objectId, data, reset]);

    const dispatch = useDispatch()

    return (
        <Modal
            title="Update"
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
                <Button className={styles.primary_btn} htmlType='submit'>Update</Button>
            </form>
        </Modal>
    )
}

export default Update