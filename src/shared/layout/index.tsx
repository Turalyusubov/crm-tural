import { Layout } from 'antd';
import { useRoutes } from 'react-router-dom';
// import { routes } from '@/router/routes';
import SideMenu from './SideMenu';
import AppHeader from './Header';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import RoutesMain from '../../router/routes'

const AppLayout = () => {

    const { role } = useSelector((state: RootState) => state.profile.myProfile) || {}

    const { mainRoutes } = RoutesMain()
    const routing = useRoutes(mainRoutes)

    return (
        <Layout style={{ minHeight: '100vh', overflowX: 'hidden' }}>
            {role?.roleName != 'EMPLOYEE' && <SideMenu />}
            <Layout>
                <AppHeader />
                <Layout.Content style={{ margin: '24px 16px 0' }}>
                    {routing}
                </Layout.Content>
            </Layout>
        </Layout>
    )
}

export default AppLayout

