import { message } from "antd";
import React, { useState } from "react";
import { Form, Button, Input } from "antd";
import { parse } from "../utils";
import Tree from "./Tree"
class HomePage extends React.Component {
    render() {
        return <ParseDirectory/>
    }
}

function ParseDirectory() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const getTree = async (query) => {
        setLoading(true);
        try {
            const resp = await parse(query);
            setData(oldData => [...resp.children]
            );
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
        <div style={{ width: 500, margin: "20px left" }}>
        <Form onFinish={getTree} layout="verticle">
            <Form.Item
                label="Repository Directory"
                name="file_path"
                rules={[{ required: true }]}
            >
            <Input
                disabled={loading}
                placeholder="Repo Path"
            />
        </Form.Item>
        <Form.Item>
        <Button
            loading={loading}
            type="primary"
            htmlType="submit"
        >
            Parse
        </Button>
        </Form.Item>
        </Form>
        </div>
        <Tree data={data} />
        </>
    )

}

export default HomePage;