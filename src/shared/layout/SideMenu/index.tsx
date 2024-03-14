import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { UserOutlined, TeamOutlined, FundProjectionScreenOutlined, ProjectOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import styles from './style.module.scss'
import { useState } from 'react';

const SideMenu = () => {
    const { pathname } = useLocation()
    const [collapsed, setCollapsed] = useState(false);

    const getScreenWidth = () => {
        const width = Object.keys((window || {}).length) && window.innerWidth;
        return width;
    };

    return (
        <Sider
            collapsed={collapsed}
            theme='light'
            width={320}
            className={styles.sidemenu}
            breakpoint="lg"
            collapsedWidth="0"
            onCollapse={(value) => {
                setCollapsed(value)
            }}
        >
            <Menu mode="inline"
                defaultSelectedKeys={[pathname]}
                onSelect={() => { getScreenWidth() < 992 && setCollapsed(true) }}
                items={
                    [
                        {
                            key: '/employees',  // enum
                            icon: <UserOutlined className={styles.sidemenu_item_icon} />,
                            label: <Link to='/employees'>Employees</Link>,
                            className: `${styles.menu_item} ${pathname === '/employees' ? styles.active_module : ''}`
                        },
                        {
                            key: '/teams',
                            icon: <TeamOutlined className={styles.sidemenu_item_icon} />,
                            label: <Link to='/teams'>Teams</Link>,
                            className: `${styles.menu_item} ${pathname === '/teams' ? styles.active_module : ''}`
                        },
                        {
                            key: '/projects',
                            icon: <FundProjectionScreenOutlined className={styles.sidemenu_item_icon} />,
                            label: <Link to='/projects'>Projects</Link>,
                            className: `${styles.menu_item} ${pathname === '/projects' ? styles.active_module : ''}`
                        },
                        {
                            key: '/reports',
                            icon: <ProjectOutlined className={styles.sidemenu_item_icon} />,
                            label: <Link to='/reports'>Daily Reports</Link>,
                            className: `${styles.menu_item} ${pathname === '/reports' ? styles.active_module : ''}`
                        },
                    ]
                } />
        </Sider>
    )
}

export default SideMenu