import { Button } from 'antd';
import styles from './style.module.scss'
import { Link } from 'react-router-dom';
import InputComponent from '@/shared/components/InputComponent';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useLoginUserMutation } from '@/redux/api/authApi';
import { LoginFormType } from '@/shared/types';

const Login = () => {
    const [loginUser] = useLoginUserMutation()

    const {
        control,
        handleSubmit,
    } = useForm<LoginFormType>()

    const onSubmit: SubmitHandler<LoginFormType> = (data) => loginUser(
        {
            mail: data.loginEmail,
            password: data.loginPassword
        }
    )

    return (
        <div className={styles.login_page}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.login_form}>
                <p className={styles.login_head}>Login</p>
                <Controller
                    name="loginEmail"
                    control={control}
                    render={({ field }) => (
                        <InputComponent
                            id='loginEmail'
                            label='Email'
                            type='text'
                            placeholder="Enter your email"
                            field={field}
                        />
                    )}
                />
                <Controller
                    name="loginPassword"
                    control={control}
                    render={({ field }) => (
                        <InputComponent
                            id='loginPassword'
                            label='Password'
                            type='password'
                            placeholder="Enter your password"
                            field={field}
                        />
                    )}
                />
                <div className={styles.login_submit_btn_wrapper}>
                    <Button htmlType='submit' className={styles.login_submit_btn} type="primary">Submit</Button>
                    <div className={styles.login_forgot_password}>
                        <Link to='/forgot-password'>Forgot Password?</Link>
                    </div>
                </div>
            </form>
        </div >
    )
}

export default Login