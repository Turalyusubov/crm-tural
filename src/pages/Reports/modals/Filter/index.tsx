import { useGetProjectsQuery } from '@/redux/api/projectsApi';
import { useGetUsersQuery } from '@/redux/api/usersApi';
import { RootState } from '@/redux/store';
import { ProjectType, UserApiType } from '@/shared/types';
import { Button, DatePicker, Drawer, Select } from 'antd'
import moment from 'moment';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../style.module.scss'
import { objectForModal } from '@/redux/features/modalSlice';

type ReportFilterFormType = {
    dateRange?: string[];
    userIds?: number | number[];
    projectIds?: number | number[];
}

const Filter: React.FC<any> = ({ setQuery, modalOpen, setModalOpen }) => {
    const {
        control,
        handleSubmit,
    } = useForm<ReportFilterFormType>();

    const onSubmit: SubmitHandler<ReportFilterFormType> = (data) => {
        let fields = [];
        if (Array.isArray(data.userIds)) {
            data.userIds?.forEach((userId) => {
                fields.push(`userIds=${userId}`);
            });
        }
        if (Array.isArray(data.dateRange) && data.dateRange.length >= 2) {
            const startDateFormatted = moment(data?.dateRange?.[0]).format("YYYY-MM-DD");
            const endDateFormatted = moment(data?.dateRange?.[1]).format("YYYY-MM-DD");

            fields.push(`startDate=${startDateFormatted}`);
            fields.push(`endDate=${endDateFormatted}`);
        }

        if (Array.isArray(data.projectIds)) {
            data.projectIds.forEach((projectId) => {
                fields.push(`projectIds=${projectId}`);
            });
        }
        setQuery(fields.join("&"));
    };

    const { data: projectsData } = useGetProjectsQuery()
    const { data: usersData } = useGetUsersQuery('')
    const { role } = useSelector((state: RootState) => state.profile.myProfile) || {}

    const dispatch = useDispatch()

    return (
        <Drawer title="Filter" onClose={() => {
            setModalOpen(false)
            dispatch(objectForModal(0))
        }} open={modalOpen}>
            <form className='modal-form' onSubmit={handleSubmit(onSubmit)}>
                <span>Project Name</span>
                <Controller
                    name="projectIds"
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
                {role?.roleName !== 'EMPLOYEE' &&
                    <span>Employees</span>}
                {role?.roleName !== 'EMPLOYEE' &&
                    <Controller
                        name="userIds"
                        control={control}
                        render={({ field }) => (
                            <Select
                                mode='multiple'
                                style={{ width: '100%' }}
                                options={usersData && usersData
                                    .content.map((user: UserApiType) => ({
                                        value: user.id,
                                        label: `${user.firstName} ${user.lastName}`,
                                    }))
                                }
                                {...field}
                            />
                        )}
                    />}
                <span>Start Date</span>
                <Controller
                    name="dateRange"
                    control={control}
                    render={({ field: { onChange, onBlur } }) => (
                        <DatePicker.RangePicker onChange={onChange} onBlur={onBlur} size="large" />
                    )}
                />
                <Button className={styles.primary_btn} htmlType='submit'>Submit</Button>
            </form>
        </Drawer>
    )
}

export default Filter