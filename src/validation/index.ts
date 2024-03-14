import { ZodType, any, number, string, z } from 'zod';

export type EmployeeFormType = {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    teamID?: number;
    roleID: number;
};
export type EmployeeFilterFormType = {
    firstName?: string;
    lastName?: string;
    status?: string;
    teamID?: number[] | number;
    projectID?: number[] | number;
};
export const EmployeesFormScheme: ZodType<EmployeeFormType> = z.object({
    firstName: string().min(1, { message: 'First Name is required' }),
    lastName: string().min(1, { message: 'Last Name is required' }),
    email: string().email().min(1, { message: 'Email is required' }),
    password: string().min(1, { message: 'Password is required' }).optional(),
    teamID: number().optional(),
    roleID: number(),
});


export type ResetPasswordFormType = {
    password: string;
    newConfirimPassword: string;
};
export const ResetPasswordFormScheme: ZodType<ResetPasswordFormType> = z.object({
    password: string().min(1, { message: 'Password is required' }),
    newConfirimPassword: string().min(1, { message: 'Confirm Password is required' }),
});

export type UpdateTeamFormType = {
    teamName: string;
    employees?: any
};
export const UpdateTeamFormScheme: ZodType<UpdateTeamFormType> = z.object({
    teamName: string().min(1, { message: 'Team Name is required' }),
    employees: any(),
});

export type ProjectFormType = {
    projectName: string;
    employees?: any
};
export const ProjectFormScheme: ZodType<ProjectFormType> = z.object({
    projectName: string().min(1, { message: 'Project Name is required' }),
    employees: any(),
});

export type ReportFormType = {
    projectId?: number;
    reportText: string;
}

export const ReportFormScheme: ZodType<ReportFormType> = z.object({
    projectId: number().optional(),
    reportText: string().min(1, { message: 'Report text is required' }),
});





