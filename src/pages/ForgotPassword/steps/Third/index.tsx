import { Form, Input } from 'antd'
import React from 'react'

const Third = () => {
    return (
        <Form layout='vertical'>
            <Form.Item label="Enter New Password">
                <Input placeholder="Enter New Password" />
            </Form.Item>
            <Form.Item label="Repeat New Password">
                <Input placeholder="Repeat New Password" />
            </Form.Item>
        </Form>
    )
}

export default Third