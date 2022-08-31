import { message } from "antd";
import React, { useState } from "react";
import { Form, Button, Input, Row, Col} from "antd";
import DependencyMap from "../DependencyMap/DependencyMap";
import { parse } from "../../utils";
import Tree from "../Tree"
import PieChart from "../PieChart";
import Please from "pleasejs"
import "./HomePage.css"

class HomePage extends React.Component {
    render() {
        return <ParseDirectory/>
    }
}
function ParseDirectory() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [dependencies, setDependencies] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [pieVisibility, setPieVisibility] = useState(false);
    const getTree = async (query) => {
        setLoading(true);
        try {
            const resp = await parse(query);
            const colorOptions = {
                saturation: 1,
                colors_returned: resp.authors.length,
            }
            let authors = [...resp.authors];
            for (let i = 0; i < authors.length; i++) {
                authors[i].color = Please.make_color({colorOptions})[0];
            }
            setDependencies(oldData => [...resp.dependencies]);
            setData(oldData => [...resp.children]);
            setAuthors(oldAuthors => authors)
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
            {pieVisibility && <PieChart data = {authors} className="pie"/>}
        </Col>
        </Row>
        <Row>
            <Col span={20}>
                <DependencyMap dependencies={dependencies}/>
            </Col>
        </Row>
        </>
    )

}

export default HomePage;