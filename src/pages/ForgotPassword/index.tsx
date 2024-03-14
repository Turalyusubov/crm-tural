import { Button, Steps, message } from 'antd'
import styles from './style.module.scss'
import { useState } from 'react';
import First from './steps/First';
import Second from './steps/Second';
import Third from './steps/Third';

const ForgotPassword = () => {
    const steps = [
        {
            title: 'First',
            content: <First />,
        },
        {
            title: 'Second',
            content: <Second />,
        },
        {
            title: 'Last',
            content: <Third />,
        },
    ];

    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    return (
        <div className={styles.forgot_page}>
            <div className={styles.forgot_wrapper}>
                <Steps current={current} items={items} />
                <div className={styles.step_wrapper}>{steps[current].content}</div>
                <div>
                    {current < steps.length - 1 && (
                        <Button className={styles.forgot_submit_btn} onClick={() => next()}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            Previous
                        </Button>
                    )}
                </div>
            </div>
        </div >
    )
}

export default ForgotPassword