import React, { Dispatch, SetStateAction } from "react";

export type ModalProps = {
    statusType: 'view' | 'delete' | 'update' | 'create' | 'resetPassword';
    modalOpen: boolean;
    setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export enum StatusEnum {
    View = 'view',
    Delete = 'delete',
    Update = 'update',
    Create = 'create',
    Reset_Password = 'resetPassword'
}

export type FilterProps = {
    // modalOpen: boolean;
    // setModalOpen: Dispatch<SetStateAction<boolean>>;
    statusType: 'employee' | 'team' | 'project' | 'report' | 'resetPassword';
}

// export type TeamType = {
//     id: number;
//     teamName: string;
//     status: 'ACTIVE' | 'INACTIVE'
// }

export type TeamType = {
    id: number;
    teamName?: string;
    name?: string;
    users?: UserApiType[]
    status?: 'ACTIVE' | 'INACTIVE'
}

export type ReportType = {
    key: React.Key;
    employee: string;
    description: string;
    projectName: string;
    createdDate: string;
}

// export type ProjectType = {
//     key: React.Key;
//     project: string;
//     employees: {
//         name: string;
//         surname: string
//     }[];
// }

export type UserType = {
    key: React.Key;
    name: string;
    surname: string;
    mail: string;
    team: string;
    role: string;
    status: boolean;
}

export type RenderIfProps = {
    children: React.ReactNode;
    condition: any;
    renderElse?: React.ReactNode;
}

export type TableProps = {
    setStatus: Dispatch<SetStateAction<'view' | 'delete' | 'update' | 'create' | 'resetPassword' | 'filter'>>;
    setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export type ActionModalProps = {
    modalOpen: boolean;
    setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export type ActionButtonProps = {
    icon: JSX.Element;
    type: string;
    title: string;
    objectId?: number;
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    setStatus: Dispatch<SetStateAction<'view' | 'delete' | 'update' | 'create' | 'resetPassword' | 'filter'>>;
}

export type UserApiType = {
    id: number;
    firstName: string;
    lastName: string;
    role: RoleType;
    status: string;
    mail: string;
    team: {
        id: number;
        teamName: string;
    };
    projects:
    {
        id: number;
        projectName: string;
    }[];
}

export type RoleType = {
    id: number;
    roleName: string;
}

export type ProjectType = {
    id: number;
    projectName: string;
    status?: string;
    users: UserApiType[]
}

export type EmployeeTableType = {
    key: number;
    firstName: string;
    lastName: string;
    mail: string;
    team: string;
    role: string;
    status: string;
}

export type LoginFormType = {
    loginEmail: string;
    loginPassword: string;
}

export type ProjectFilterFormType = {
    name: string
}

export type TeamTableType = {
    key: number;
    team: string;
}

export type TeamCreateFormType = {
    teamName: string;
}

export type TeamsApiResponce = {
    teams: TeamType[]
}

export type UserAuthState = {
    id: number | null;
    access_token: string;
    refresh_token: string;
}

export type ModalState = {
    objectId: number
}

export type MyProfileType = {
    myProfile: UserApiType | null
}

export type ThemeState = {
    theme: 'light' | 'dark'
}

export type ChangePasswordFormType = {
    oldpassword: string;
    newPassword: string;
    newConfirimPassword: string;
}

export type InputComponentProps = {
    type: string;
    field?: any;
    placeholder?: string;
    label?: string;
    id?: string;
}