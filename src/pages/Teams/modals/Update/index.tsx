import { Button, Modal, Select, message } from 'antd'
import styles from '../style.module.scss'
import { ActionModalProps } from '@/shared/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useGetTeamByIdQuery, useUpdateTeamMutation } from '@/redux/api/teamsApi'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import InputComponent from '@/shared/components/InputComponent'
import { UpdateTeamFormScheme, UpdateTeamFormType } from '@/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useGetUsersForSelectQuery } from '@/redux/api/usersApi'
import { objectForModal } from '@/redux/features/modalSlice'

const Update: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen }) => {
    const objectId = useSelector((state: RootState) => state.modal.objectId)
    const { data } = useGetTeamByIdQuery(objectId)
    const { data: userData } = useGetUsersForSelectQuery()
    const [updateTeam, { isSuccess }] = useUpdateTeamMutation()

    useEffect(() => {
        if (isSuccess) {
            message.open({
                type: 'success',
                content: `Team has successfully updated!`,
            })
            setModalOpen(false)
        }
    }, [isSuccess])

    const {
        control,
        handleSubmit,
        reset,
    } = useForm<UpdateTeamFormType>({ resolver: zodResolver(UpdateTeamFormScheme) });

    const onSubmit: SubmitHandler<UpdateTeamFormType> = (data) => {
        updateTeam({ id: objectId, data })
    }

    useEffect(() => {
        if (data) {
            const { name: teamName, users } = data;
            reset({ teamName, employees: users?.map((user: any) => user.id) });
        }
    }, [objectId, data, reset]);

    const dispatch = useDispatch()

    return (
        <Modal
            title="Update Team"
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
                    name="teamName"
                    control={control}
                    render={({ field }) => (
                        <InputComponent
                            id='teamName'
                            label='Team Name'
                            type='text'
                            placeholder="New Team Name"
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