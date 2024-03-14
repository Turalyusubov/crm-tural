import { Button, Modal, message } from 'antd'
import styles from '../style.module.scss'
import { ActionModalProps } from '@/shared/types'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ResetPasswordFormScheme, ResetPasswordFormType } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useResetPasswordMutation } from '@/redux/api/usersApi';
import InputComponent from '@/shared/components/InputComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';
import { objectForModal } from '@/redux/features/modalSlice';

const ResetPassword: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen }) => {
    const objectId = useSelector((state: RootState) => state.modal.objectId)

    const [resetPassword, { isSuccess }] = useResetPasswordMutation()
    useEffect(() => {
        if (isSuccess) {
            message.open({
                type: 'success',
                content: `Password has successfully reseted!`,
            });
            reset()
        }
    }, [isSuccess])
    const {
        control,
        handleSubmit,
        reset
    } = useForm<ResetPasswordFormType>({ resolver: zodResolver(ResetPasswordFormScheme) });

    const onSubmit: SubmitHandler<ResetPasswordFormType> = (data) => {
        resetPassword({
            userId: objectId,
            data: {
                password: data.password,
                newConfirimPassword: data.newConfirimPassword,
            }
        })
        console.log(data);

    }

    const dispatch = useDispatch()

    return (
        <Modal
            title="Create User"
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
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <InputComponent
                            id='password'
                            label='New Password'
                            type='text'
                            placeholder="Enter new password"
                            field={field}
                        />
                    )}
                />
                <Controller
                    name="newConfirimPassword"
                    control={control}
                    render={({ field }) => (
                        <InputComponent
                            id='newConfirimPassword'
                            label='Confirm New Password'
                            type='text'
                            placeholder="Confirm New Password"
                            field={field}
                        />
                    )}
                />
                <Button className={styles.primary_btn} htmlType='submit'>Reset</Button>
            </form>
        </Modal>
    )
}

export default ResetPassword