import { Form, Select } from 'antd'

const Team = () => {
    return (
        <Form layout='vertical' variant="filled" style={{ maxWidth: 600 }}>
            <Form.Item label="Team" name="team">
                <Select
                    mode="multiple"
                    options={[
                        { value: 'Frontend', label: 'Frontend' },
                        { value: 'Backend', label: 'Backend' },
                        { value: 'Designer', label: 'Designer' },
                    ]} />
            </Form.Item>
        </Form>
    )
}

export default Team