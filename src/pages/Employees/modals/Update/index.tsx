import { Button, Modal, Select, message } from 'antd'
import styles from '../style.module.scss'
import { ActionModalProps, RoleType, TeamType } from '@/shared/types'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetUserByIdQuery, useUpdateUserMutation } from '@/redux/api/usersApi';
import { EmployeeFormType, EmployeesFormScheme } from '@/validation';
import { useGetRolesQuery } from '@/redux/api/rolesApi';
import { useGetTeamsQuery } from '@/redux/api/teamsApi';
import InputComponent from '@/shared/components/InputComponent';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { objectForModal } from '@/redux/features/modalSlice';

const Update: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen }) => {
    const objectId = useSelector((state: RootState) => state.modal.objectId)
    const { data } = useGetUserByIdQuery(objectId)

    const {
        control,
        handleSubmit,
        reset,
    } = useForm<EmployeeFormType>({ resolver: zodResolver(EmployeesFormScheme) });

    const [updateUser, { isSuccess }] = useUpdateUserMutation()
    useEffect(() => {
        if (isSuccess) {
            message.open({
                type: 'success',
                content: `User has successfully updated!`,
            })
            setModalOpen(false)
            reset()
        }
    }, [isSuccess])

    const onSubmit: SubmitHandler<EmployeeFormType> = (data) => {
        updateUser({
            id: objectId,
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                mail: data.email,
                roleId: data.roleID,
                teamId: data.teamID
            }
        })
    }

    const { data: rolesData } = useGetRolesQuery()
    const { data: teamsData } = useGetTeamsQuery()

    useEffect(() => {
        if (data) {
            const { firstName, lastName, mail, role, team } = data;
            reset({ firstName, lastName, email: mail, roleID: role.id, teamID: team?.id });
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
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                        <InputComponent
                            id='firstName'
                            label='First Name'
                            type='text'
                            placeholder="Enter first name"
                            field={field}
                        />
                    )}
                />
                <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                        <InputComponent
                            id='lastName'
                            label='Last Name'
                            type='text'
                            placeholder="Enter last name"
                            field={field}
                        />
                    )}
                />
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <InputComponent
                            id='email'
                            label='Email'
                            type='email'
                            placeholder="Enter email"
                            field={field}
                        />
                    )}
                />
                <span>Role</span>
                <Controller
                    name="roleID"
                    control={control}
                    render={({ field }) => (
                        <Select
                            style={{ width: '100%' }}
                            options={rolesData && rolesData
                                .filter((role: RoleType) => !["SUPER_ADMIN"].includes(role.roleName))
                                .map((role: RoleType) => ({
                                    value: role.id,
                                    label: role.roleName,
                                }))
                            }
                            {...field}
                        />
                    )}
                />
                <span>Team</span>
                <Controller
                    name="teamID"
                    control={control}
                    render={({ field }) => (
                        <Select
                            style={{ width: '100%' }}
                            options={teamsData && teamsData
                                .map((team: TeamType) => ({
                                    value: team.id,
                                    label: team.teamName,
                                }))
                            }
                            {...field}
                        />
                    )}
                />
                <Button className={styles.primary_btn} htmlType='submit'>Submit</Button>
            </form>
        </Modal>
    )
}

export default Update