import { Form, Input } from 'antd'

const First = () => {
    return (
        <Form layout='vertical'>
            <Form.Item label="Enter your email">
                <Input placeholder="Enter your email" />
            </Form.Item>
        </Form>
    )
}

export default First