import ActionButton from '@/shared/components/ActionButton';
import { ReportType } from '@/shared/types';
import { Space, Table, TableColumnsType } from 'antd'
import React, { useMemo, useState } from 'react'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useGetAllReportsQuery, useGetEmployeeReportsQuery } from '@/redux/api/reportsApi';

const ReportTable: React.FC<any> = ({ query, setQuery, setStatus, setModalOpen }) => {
    const { role } = useSelector((state: RootState) => state.profile.myProfile) || {}
    const [pagination, _setPagination] = useState({ pageNumber: 1, pageSize: 7 });

    const handleTableChange = (pagination: any) => {
        const queryParams = new URLSearchParams(query);

        queryParams.set('pageNumber', pagination.current.toString());
        queryParams.set('pageSize', pagination.pageSize.toString());
        const updatedQuery = `${queryParams.toString()}`;

        setQuery(updatedQuery);
    };

    const reportsQuery = useMemo(() => {
        return role?.roleName !== 'EMPLOYEE' ? useGetAllReportsQuery : useGetEmployeeReportsQuery
    }, [role])

    const { data: allReports } = reportsQuery(query)

    const columns: TableColumnsType<ReportType> = [
        ...(role?.roleName !== 'EMPLOYEE' ? [{
            title: 'Employee',
            dataIndex: 'employee',
        }] : []),
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Project',
            dataIndex: 'projectName',
        },
        {
            title: 'Created Date',
            dataIndex: 'createdDate',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <ActionButton
                        objectId={record.key}
                        setStatus={setStatus}
                        setModalOpen={setModalOpen}
                        title='View'
                        icon={<EyeOutlined />}
                        type="view_button" />
                    {role?.roleName === 'EMPLOYEE' &&
                        <ActionButton
                            objectId={record.key}
                            setStatus={setStatus}
                            setModalOpen={setModalOpen}
                            title='Update'
                            icon={<EditOutlined />}
                            type="update_button" />}
                </Space>
            ),
        },
    ];

    function removeHtmlTagsAndTruncate(inputString: string) {
        const plainText = inputString.replace(/<[^>]*>/g, '');
        const truncatedText = plainText.length > 20 ? plainText.substring(0, 20) + '...' : plainText;
        return truncatedText;
    }

    function formatDateString(dateString: string) {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    const data: ReportType[] = useMemo(() => {
        return allReports?.content.map((report: any) => ({
            key: report.id,
            employee: `${report.firstName} ${report.lastName}`,
            description: removeHtmlTagsAndTruncate(report.reportText),
            projectName: report.project.projectName,
            createdDate: formatDateString(report.localDateTime)
        })) || []
    }, [allReports])

    return (
        <Table
            pagination={{
                ...pagination,
                total: allReports?.totalElements
            }}
            onChange={handleTableChange}
            bordered
            columns={columns}
            dataSource={data} />
    )
}

export default ReportTable
