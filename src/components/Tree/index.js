import React, { useState } from 'react';
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
import { faL } from '@fortawesome/free-solid-svg-icons';

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
    const [data, setData] = useState(false);
    const [barVisibility, setBarVisibility] = useState(false);
    const hasChild = node.children.length !== 0 ? true : false;
    return(
        <li className="d-tree-node border-0">
            <div className='d-flex' onClick={e => setChildVisibility(v => !v)}>
                {hasChild && (
                    <div className={`d-inline d-tree-toggler ${ childVisibility ? "active" : "" }`} >
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
                        <div class="bar-plot-size">
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
            <Tooltip title="View Committer Details">
              <Button
                onClick={onClick}
                loading={loading}
                style={{ border: "none" }}
                shape="circle"
                size="small"
                icon={<InfoCircleOutlined />}
              />
            </Tooltip>
            
        </>
    )
}

const BarPlot = ({data}) => {
    const visible = data.length === 0 ? false : true;
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
      return <>{ visible && <Bar {...config} />}</>;
}

export default Tree;