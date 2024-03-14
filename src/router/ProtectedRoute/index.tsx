import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const ProtectedRoute: React.FC<any> = ({ roles, allowedComponent, redirectTo }) => {
    const { role } = useSelector((state: RootState) => state.profile.myProfile) || {}

    const isAllowed = roles?.includes(role?.roleName);

    return isAllowed ? allowedComponent : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
