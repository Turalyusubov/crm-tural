import { Form } from 'antd'
import { InputOTP } from 'antd-input-otp'

const Second = () => {
    return (
        <Form layout='vertical'>
            <Form.Item label="Enter your email">
                <InputOTP inputType="numeric" />
            </Form.Item>
        </Form>
    )
}

export default Second