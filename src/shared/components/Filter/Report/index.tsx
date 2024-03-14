import { DatePicker, Form, Select } from 'antd'

const Report = () => {
    return (
        <Form layout='vertical' variant="filled" style={{ maxWidth: 600 }}>
            <Form.Item label="Employee" name="employee">
                <Select
                    mode="multiple"
                    options={[
                        { value: 'Ali', label: 'Ali' },
                        { value: 'Vali', label: 'Vali' },
                        { value: 'Pirvali', label: 'Pirvali' },
                    ]}
                />
            </Form.Item>
            <Form.Item label="Projects" name="projects">
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    options={[
                        { value: 'Furniro', label: 'Furniro' },
                        { value: 'Plast', label: 'Plast' },
                        { value: 'CRM', label: 'CRM' },
                    ]}
                />
            </Form.Item>
            <Form.Item label="Date" name="date">
                <DatePicker.RangePicker
                    format='DD/MM/YYYY'
                    style={{ width: '100%' }}
                />
            </Form.Item>
        </Form>
    )
}

export default Report