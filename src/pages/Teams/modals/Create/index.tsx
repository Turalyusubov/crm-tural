import { Button, Modal, message } from 'antd'
import styles from '../style.module.scss'
import { ActionModalProps, TeamCreateFormType } from '@/shared/types'
import { useCreateTeamMutation } from '@/redux/api/teamsApi'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import InputComponent from '@/shared/components/InputComponent'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { objectForModal } from '@/redux/features/modalSlice'

const Create: React.FC<ActionModalProps> = ({ modalOpen, setModalOpen }) => {
    const [createTeam, { isSuccess }] = useCreateTeamMutation()

    useEffect(() => {
        if (isSuccess) {
            message.open({
                type: 'success',
                content: `Team has successfully created!`,
            });
            setModalOpen(false)
        }
    }, [isSuccess])

    const {
        control,
        handleSubmit,
    } = useForm<TeamCreateFormType>()

    const onSubmit: SubmitHandler<TeamCreateFormType> = (data) => {
        createTeam(data)
    }

    const dispatch = useDispatch()

    return (
        <Modal
            title="Create Team"
            centered
            open={modalOpen}
            onOk={() => setModalOpen(false)}
            onCancel={() => {
                setModalOpen(false)
                dispatch(objectForModal(0))
            }}
            footer={false}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="teamName"
                    control={control}
                    render={({ field }) => (
                        <InputComponent
                            id='teamName'
                            label='Team Name'
                            type='text'
                            placeholder="Enter team name you want to create"
                            field={field}
                        />
                    )}
                />
                <Button className={styles.primary_btn} htmlType='submit'>Create</Button>
            </form>
        </Modal >
    )
}

export default Create