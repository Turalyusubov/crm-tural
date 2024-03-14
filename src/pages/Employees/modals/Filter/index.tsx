import { useGetProjectsQuery } from '@/redux/api/projectsApi';
import { useGetTeamsQuery } from '@/redux/api/teamsApi';
import InputComponent from '@/shared/components/InputComponent';
import { ProjectType, TeamType } from '@/shared/types';
import { EmployeeFilterFormType } from '@/validation';
import { Button, Drawer, Select } from 'antd'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import styles from '../style.module.scss'
import { useDispatch } from 'react-redux';
import { objectForModal } from '@/redux/features/modalSlice';

const Filter: React.FC<any> = ({ modalOpen, setModalOpen, setQuery }) => {
    const {
        control,
        handleSubmit,
    } = useForm<EmployeeFilterFormType>();

    const onSubmit: SubmitHandler<EmployeeFilterFormType> = (data) => {
        let fields = []
        for (const key in data) {
            const value = data[key as keyof EmployeeFilterFormType]
            if ((typeof value === 'string' && value) || typeof value === 'number') {
                fields.push(`${key}=${value}`)
            } else if (typeof value !== 'string' || typeof value !== 'number') {
                const array = data[key as keyof EmployeeFilterFormType] as number[]
                array && fields.push(array.map(id => `${key}=${id}`).join('&'))
            }
        }
        setQuery(fields.join("&"))
    }

    const { data: projectsData } = useGetProjectsQuery()
    const { data: teamsData } = useGetTeamsQuery()

    const dispatch = useDispatch()

    return (
        <Drawer title="Filter" onClose={() => {
            setModalOpen(false)
            dispatch(objectForModal(0))
        }} open={modalOpen}>
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
                <span>Status</span>
                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <Select
                            style={{ width: '100%' }}
                            options={[
                                {
                                    value: 'ACTIVE',
                                    label: 'ACTIVE',
                                },
                                {
                                    value: 'INACTIVE',
                                    label: 'INACTIVE',
                                }
                            ]}
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
                            mode='multiple'
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
                <span>Project</span>
                <Controller
                    name="projectID"
                    control={control}
                    render={({ field }) => (
                        <Select
                            mode='multiple'
                            style={{ width: '100%' }}
                            options={projectsData && projectsData
                                .content.map((project: ProjectType) => ({
                                    value: project.id,
                                    label: project.projectName,
                                }))
                            }
                            {...field}
                        />
                    )}
                />
                <Button className={styles.primary_btn} htmlType='submit'>Submit</Button>
            </form>
        </Drawer>
    )
}

export default Filter