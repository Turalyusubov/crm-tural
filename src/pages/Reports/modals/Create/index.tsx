import { Button, Modal, Select, message } from 'antd'
import React, { useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import styles from '../style.module.scss'
import { ActionModalProps } from '@/shared/types';
import { useCreateReportMutation } from '@/redux/api/reportsApi';
import { useGetEmployeeProjectsQuery } from '@/redux/api/projectsApi';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ReportFormScheme, ReportFormType } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { objectForModal } from '@/redux/features/modalSlice';

const Create: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen }) => {
    const { data: projectsData } = useGetEmployeeProjectsQuery()
    const [createReport, { isSuccess }] = useCreateReportMutation()
    console.log(projectsData);


    useEffect(() => {
        if (isSuccess) {
            message.open({
                type: 'success',
                content: `Report has successfully created!`,
            })
            setModalOpen(false)
        }
    }, [isSuccess])

    const {
        control,
        handleSubmit,
    } = useForm<ReportFormType>({ resolver: zodResolver(ReportFormScheme) })

    const onSubmit: SubmitHandler<ReportFormType> = (data) => {
        createReport(data);
    }

    const dispatch = useDispatch()

    return (
        <Modal
            title="Create Report"
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
                <span>Projects</span>
                <Controller
                    name="projectId"
                    control={control}
                    render={({ field }) => (
                        <Select
                            style={{ width: '100%' }}
                            options={projectsData && projectsData
                                ?.map((project: { id: number, projectName: string }) => ({
                                    value: project.id,
                                    label: project.projectName,
                                }))
                            }
                            {...field}
                        />
                    )}
                />
                <span>Report Text</span>
                <Controller
                    name="reportText"
                    control={control}
                    render={({ field }) => (
                        <ReactQuill
                            className={styles.report_rich_text_editor}
                            theme="snow"
                            {...field}
                        />
                    )}
                />
                <Button style={{ marginTop: '.5rem' }} className={styles.primary_btn} htmlType='submit'>Create</Button>
            </form>
        </Modal>
    )
}

export default Create