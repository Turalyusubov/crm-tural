import { Form, Input, Select } from 'antd'

const Employee = () => (
  <Form layout='vertical' variant="filled" style={{ maxWidth: 600 }}>
    <Form.Item label="Name" name="name">
      <Input />
    </Form.Item>
    <Form.Item label="Surname" name="surname">
      <Input />
    </Form.Item>
    <Form.Item label="Team" name="team">
      <Select
        mode="multiple"
        options={[
          { value: 'Frontend', label: 'Frontend' },
          { value: 'Backend', label: 'Backend' },
          { value: 'Designer', label: 'Designer' },
        ]} />
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
        ]} />
    </Form.Item>
  </Form>
)

export default Employee