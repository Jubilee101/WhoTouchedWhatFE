import { message } from "antd";
import React from "react";
import { Form, Button, Input } from "antd";
import { parse } from "../utils";
class HomePage extends React.Component {
    render() {
        return <ParseDirectory/>
    }
}

class ParseDirectory extends React.Component {
    state = {
        loading: false,
        data: [],
    }

    getTree = async (query) => {
        this.setState({
            loading: true,
        })

        try {
            const resp = await parse(query);
            this.setState({
                data: resp,
            })
            console.log(resp);
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            })
        }
    }

    render() {
        return (
            <>
            <div style={{ width: 500, margin: "20px left" }}>
            <Form onFinish={this.getTree} layout="verticle">
                <Form.Item
                    label="Repository Directory"
                    name="file_path"
                    rules={[{ required: true }]}
                >
                <Input
                    disabled={this.state.loading}
                    placeholder="Repo Path"
                />
            </Form.Item>
            <Form.Item>
            <Button
              loading={this.state.loading}
              type="primary"
              htmlType="submit"
            >
              Parse
            </Button>
            </Form.Item>
            </Form>
            </div>
            </>
        )
    }

}

export default HomePage;