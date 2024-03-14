import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"
import { Input } from "antd"
import { useState } from "react"
import styles from './style.module.scss'
import { InputComponentProps } from "@/shared/types"

const InputComponent: React.FC<InputComponentProps> = ({ type, placeholder = 'Enter you input', label, id, field }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false)
    const passwordSuffix = isPasswordShown ?
        <EyeOutlined onClick={() => setIsPasswordShown(false)} /> :
        <EyeInvisibleOutlined onClick={() => setIsPasswordShown(true)} />

    return (
        <div className={styles.input_wrapper}>
            {label && <label htmlFor={id}>{label}</label>}
            <Input
                id={id}
                type={type !== 'password' ? type : isPasswordShown ? 'text' : type}

                // input password search ant design suggested by Guli x.
                placeholder={placeholder}
                suffix={
                    type === 'password' ?
                        passwordSuffix :
                        null
                }
                {...field}
            />
        </div>
    )
}

export default InputComponent