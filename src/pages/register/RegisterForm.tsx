import {Button, Checkbox, Form, Input} from "antd";
import styles from "./RegisterForm.module.css";
import axios from "axios";
import {useHistory} from 'react-router-dom'

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

export const RegisterForm = () => {
    const history = useHistory()
    const onFinish = async (values: any) => {
        console.log("Success:", values);
        try {
            await axios.post('http://123.56.149.216:8089/auth/register', {
              email: values.username,
              password: values.password,
              confirmPassword: values.confirm,
            })
            history.push('/signIn/')
        } catch (err) {
            alert("註冊失敗！")
        }

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className={styles["register-form"]}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{required: true, message: "Please input your username!"}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{required: true, message: "Please input your password!"}]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                label="Confirm Password"
                name="confirm"
                hasFeedback
                rules={[
                    {required: true, message: "Please input your confirm password!"},
                    ({getFieldValue}) => ({
                        // _ rootObject
                        validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject("密碼確認不一致！");
                        },
                    }),
                ]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
