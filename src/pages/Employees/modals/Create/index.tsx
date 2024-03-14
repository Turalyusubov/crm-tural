import { Button, Modal, Select, message } from 'antd'
import styles from '../style.module.scss'
import { ActionModalProps, RoleType, TeamType } from '@/shared/types'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { EmployeeFormType, EmployeesFormScheme } from '@/validation'
import { zodResolver } from "@hookform/resolvers/zod";
import InputComponent from '@/shared/components/InputComponent'
import { useGetRolesQuery } from '@/redux/api/rolesApi'
import { useGetTeamsQuery } from '@/redux/api/teamsApi'
import { useCreateUserMutation } from '@/redux/api/usersApi'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { objectForModal } from '@/redux/features/modalSlice'

const Create: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen }) => {
    const {
        control,
        handleSubmit,
        reset
    } = useForm<EmployeeFormType>({ resolver: zodResolver(EmployeesFormScheme) });

    const [createUser, { isSuccess }] = useCreateUserMutation()

    const onSubmit: SubmitHandler<EmployeeFormType> = (data) => {
        const selectedRole = rolesData?.filter(role => role.id === data.roleID)
        createUser({
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
            role: selectedRole && selectedRole[0],
            mail: data.email,
            teamId: data.teamID || null
        })
    }

    const { data: rolesData } = useGetRolesQuery()
    const { data: teamsData } = useGetTeamsQuery()

    useEffect(() => {
        if (isSuccess) {
            message.open({
                type: 'success',
                content: `User has successfully created!`,
            })
            reset()
            setModalOpen(false)
        }

    }, [isSuccess])

    const dispatch = useDispatch()

    return (
        <Modal
            title="Create User"
            centered
            open={modalOpen}
            onOk={() => setModalOpen(false)}
            okButtonProps={{ className: styles.primary_btn }}
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
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <InputComponent
                            id='password'
                            label='Password'
                            type='password'
                            placeholder="Enter password"
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

export default Create

