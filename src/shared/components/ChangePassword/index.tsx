import { Button, Modal, message } from 'antd'
import styles from './style.module.scss'
import { ActionModalProps, ChangePasswordFormType } from '@/shared/types'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useChangePasswordMutation } from '@/redux/api/usersApi';
import InputComponent from '../InputComponent';
import { useEffect } from 'react';

const ChangePassword: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen }) => {
    const {
        control,
        handleSubmit,
    } = useForm<ChangePasswordFormType>()

    const [changePassword, { isSuccess }] = useChangePasswordMutation()

    const onSubmit: SubmitHandler<ChangePasswordFormType> = (data) => {
        changePassword(data)
    }

    useEffect(() => {
        if (isSuccess) {
            message.open({
                type: 'success',
                content: `Password has successfully changed!`,
            })
            setModalOpen(false)
        }
    }, [isSuccess])

    return (
        <Modal
            title="Change Password"
            centered
            open={modalOpen}
            onOk={() => setModalOpen(false)}
            onCancel={() => setModalOpen(false)}
            footer={false}
        >
            <form className='modal-form' onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="oldpassword"
                    control={control}
                    render={({ field }) => (
                        <InputComponent
                            id='oldpassword'
                            label='Old Password'
                            type='text'
                            placeholder="Enter old password"
                            field={field}
                        />
                    )}
                />
                <Controller
                    name="newPassword"
                    control={control}
                    render={({ field }) => (
                        <InputComponent
                            id='newPassword'
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
                <Button className={styles.primary_btn} htmlType='submit'>Change Password</Button>
            </form>
        </Modal>
    )
}

export default ChangePassword