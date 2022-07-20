import { message } from "antd";
import React, { useState } from "react";
import { Form, Button, Input, Row, Col } from "antd";
import { parse } from "../../utils";
import Tree from "../Tree"
import PieChart from "../PieChart";
import "./HomePage.css"

class HomePage extends React.Component {
    render() {
        return <ParseDirectory/>
    }
}

function ParseDirectory() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [pieVisibility, setPieVisibility] = useState(false);

    const getTree = async (query) => {
        setLoading(true);
        try {
            const resp = await parse(query);
            setData(oldData => [...resp.children]);
            setAuthors(oldAuthors =>[...resp.authors])
            setPieVisibility(true);
            
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
        <Row>
            <Col flex={11} className='left-side'>
                <Form onFinish={getTree} layout="verticle">
                    <Form.Item
                        label="Repository Directory"
                        name="file_path"
                        rules={[{ required: true }]}
                    >
                    <Input
                        disabled={loading}
                        size="middle"
                        style={{ width: '60%' }}
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
                <Tree data={data} authors={authors}/>
        </Col>
        <Col span={13} className="right-side">
            {pieVisibility && <PieChart data = {authors}/>}
        </Col>
        </Row>
        </>
    )

}

export default HomePage;