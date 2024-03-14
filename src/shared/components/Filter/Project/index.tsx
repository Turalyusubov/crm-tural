import { Form, Select } from 'antd'

const Project = () => (
    <Form layout='vertical' variant="filled" style={{ maxWidth: 600 }}>
        <Form.Item label="Project Title" name="project">
            <Select
                mode="multiple"
                options={[
                    { value: 'Furniro', label: 'Furniro' },
                    { value: 'CRM', label: 'CRM' },
                    { value: 'Plast', label: 'Plast' },
                ]} />
        </Form.Item>
    </Form>
)

export default Project