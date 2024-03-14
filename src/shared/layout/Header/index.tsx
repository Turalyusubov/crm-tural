import { Button, Dropdown, MenuProps, Tooltip, Typography } from 'antd';
import { LockOutlined } from '@ant-design/icons'
import { Header } from 'antd/es/layout/layout'
import Logo from '../../media/imgs/crocusoft-logo.png'
import { useLocation } from 'react-router-dom';
import styles from './style.module.scss'
import ChangePassword from '@/shared/components/ChangePassword';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { themeToggle } from '@/redux/features/themeSlice';
import { useState } from 'react';
import { setAuthState } from '@/redux/features/authSlice';
import { myProfile } from '@/redux/features/profileSlice';
import { SunFilled, MoonFilled } from '@ant-design/icons';


const AppHeader = () => {
    const location = useLocation()?.pathname

    const pageTitle = {
        '/reports': 'Daily Reports',
        '/teams': 'Teams',
        '/employees': 'Employees',
        '/projects': 'Projects'
    }

    const items: MenuProps['items'] = [
        {
            label: <Button onClick={() => {
                dispatch(setAuthState({
                    id: null,
                    access_token: '',
                    refresh_token: '',
                }))
                dispatch(myProfile({ myProfile: null }))
            }
            }>Logout</Button>,
            key: '0',
        },
    ];

    const { theme } = useSelector((state: RootState) => state.theme)
    const { firstName, lastName, role } = useSelector((state: RootState) => state.profile.myProfile) || {}
    const dispatch = useDispatch()

    const [modalOpen, setModalOpen] = useState(false)

    return (
        <>
            <Header className={styles.header}>
                <div className={styles.left_header}>
                    <div className={styles.demo_logo_vertical}>
                        <img src={Logo} alt="crocusoft_logo" />
                    </div>
                    <p>{((location === '/teams' || location === '/projects' || location === '/employees' || location === '/reports')) && pageTitle[location]}</p>
                </div>
                <div className={styles.header_user}>
                    <Dropdown placement="bottom" arrow menu={{ items }} trigger={['click']}>
                        <Typography className={styles.userName}>{`${firstName} ${lastName}`} | {role?.roleName}</Typography>
                    </Dropdown>
                    <Tooltip placement="bottom" title='Change Password' >
                        <LockOutlined onClick={() => setModalOpen(true)} className={styles.reset_password} />
                    </Tooltip>
                    <Tooltip placement="bottom" title='Toggle Theme' >
                        <button className={styles.theme_btn} onClick={() => dispatch(themeToggle())}>{theme === 'light' ? <MoonFilled /> : <SunFilled />}</button>
                    </Tooltip>
                </div>
            </Header>
            <ChangePassword modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </>
    )
}

export default AppHeader