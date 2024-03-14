import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Employees, Reports, Projects, Teams } from '@/pages/index';
import ProtectedRoute from './ProtectedRoute';

const getRoutes = () => {
    const { role } = useSelector((state: RootState) => state.profile.myProfile) || {}

    // const array: string[] = ['items']
    const mainRoutes = [
        {
            path: '/employees',
            element: <ProtectedRoute
                roles={['SUPER_ADMIN', 'ADMIN', 'HEAD']}
                allowedComponent={<Employees />}
                redirectTo='/reports' />
        },
        {
            path: '/reports',
            element: <Reports />
        },
        {
            path: '/projects',
            element: <ProtectedRoute
                roles={['SUPER_ADMIN', 'ADMIN', 'HEAD']}
                allowedComponent={<Projects />}
                redirectTo='/reports' />
        },
        {
            path: '/teams',
            element: <ProtectedRoute
                roles={['SUPER_ADMIN', 'ADMIN', 'HEAD']}
                allowedComponent={<Teams />}
                redirectTo='/reports' />
        },
        {
            path: '*',
            element: <Navigate to={role?.roleName === 'EMPLOYEE' ? '/reports' : '/employees'} />
        }
    ];

    return {
        // array,
        mainRoutes
    };
};

export default getRoutes;
