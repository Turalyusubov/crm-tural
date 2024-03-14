import { Button, Modal, message } from 'antd'
import React, { useEffect } from 'react'
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill'
import styles from '../style.module.scss'
import { ActionModalProps } from '@/shared/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetReportByIdQuery, useUpdateReportMutation } from '@/redux/api/reportsApi';
import { ReportFormScheme, ReportFormType } from '@/validation';
import { objectForModal } from '@/redux/features/modalSlice';

const Update: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen }) => {
    const objectId = useSelector((state: RootState) => state.modal.objectId)
    const { data } = useGetReportByIdQuery(objectId)
    const [updateReport, { isSuccess }] = useUpdateReportMutation()

    useEffect(() => {
        if (isSuccess) {
            message.open({
                type: 'success',
                content: `Report has successfully updated!`,
            })
            setModalOpen(false)
        }
    }, [isSuccess])

    const {
        control,
        handleSubmit,
        reset,
    } = useForm<ReportFormType>({ resolver: zodResolver(ReportFormScheme) });

    const onSubmit: SubmitHandler<ReportFormType> = (data) => {
        updateReport({
            id: objectId,
            data: {
                reportText: data.reportText,
            }
        })
    }

    useEffect(() => {
        if (data) {
            const { reportText } = data;
            reset({ reportText });
        }
    }, [objectId, data, reset]);

    const dispatch = useDispatch()

    return (
        <Modal
            title="Update"
            centered
            open={modalOpen}
            onOk={() => setModalOpen(false)}
            okButtonProps={{ className: styles.primary_btn }}
            onCancel={() => {
                setModalOpen(false)
                dispatch(objectForModal(0))
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <Button className={styles.primary_btn} htmlType='submit'>Create</Button>
            </form>
        </Modal>
    )
}

export default Update