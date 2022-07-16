import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Bar } from '@ant-design/plots';
import "./index.css"
import { getHistory } from "../../utils";
import {
    message,
    Button,
    Tooltip,
 } from "antd";
 import {
    InfoCircleOutlined,
  } from "@ant-design/icons";


const Tree = ({data = []}) => {
    return (
        <div className='d-tree'>
            <ul className='d-flex d-tree-container flex-column'>
                {data.map(tree => (
                    <TreeNode node={tree} />
                ))}
            </ul>
        </div>
    )
}

const TreeNode = ({node}) => {
    const [childVisibility, setChildVisibility] = useState(false);
    const [data, setData] = useState([]);
    const [barVisibility, setBarVisibility] = useState(false);
    const hasChild = node.children.length !== 0 ? true : false;
    useEffect(() => { 
        return function cleanup () {
          setBarVisibility(false);
        }
     }, [node.children])
    return(
        <li className="d-tree-node border-0">
            <div className='d-flex'>
                {hasChild && (
                    <div className={`d-inline d-tree-toggler ${ childVisibility ? "active" : "" }`}  onClick={e => setChildVisibility(v => !v)}>
                        <FontAwesomeIcon icon="fa-solid fa-caret-right" />
                    </div>
                )}
                <div className='col d-tree-head'>
                    {node.title}
                    <span>
                    <CommitterDetailInfoButton filePath={node.file_path} repoPath={node.repo_address} setData={setData} setBarVisibility={setBarVisibility} padding={0}/>
                    </span>
                    {
                    barVisibility && 
                    <div className="flex-column bar-plot-size">
                    <BarPlot data={data} />
                    </div>
                    }
                </div>
            </div>
            {
                hasChild && childVisibility && <div className = "d-tree-content">
                    <ul className='d-flex d-tree-container flex-column'>
                        <Tree data={node.children}/>
                    </ul>
                </div>
            }
        </li>
    )
}

const CommitterDetailInfoButton = ({filePath, repoPath, setData, setBarVisibility}) => {
    const [loading, setLoading] = useState(false);
    const fetchInfo = async (filePath, repoPath) => {
        setLoading(true);
        try {
            const resp = await getHistory(filePath, repoPath);
            setData(oldData => [...resp])
            
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    const onClick = async() => {
        await fetchInfo(filePath, repoPath);
        setBarVisibility(v =>!v); 
    }

    return (
        <>
            <Tooltip title="view details">
              <Button
                ghost
                onClick={onClick}
                loading={loading}
                style={{ border: "none" }}
                shape="circle"
                size="small"
                icon={<InfoCircleOutlined style={{ fontSize: '13px', color: '#08c' }}/>}
              />
            </Tooltip>
            
        </>
    )
}

const BarPlot = ({data}) => {

    const config = {
        data,
        xField: 'commit_count',
        yField: 'y_axis',
        seriesField: 'author_name',
        isPercent: true,
        isStack: true,
        autoFit: true,
        label: {
            position: 'middle',
            content: (item) => {
              return "";
            },
            style: {
              fill: '#fff',
            },
          },
      };

      return <Bar {...config} />;
}

export default Tree;