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
    EyeOutlined,
    EyeInvisibleOutlined,
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
    const [barVisibility, setBarVisibility] = useState(true);
    const hasChild = node.children.length !== 0 ? true : false;
    // useEffect(() => { 
    //     return function cleanup () {
    //       setBarVisibility(false);
    //     }
    //  }, [node.children])
    return(
        <li className="d-tree-node border-0">
            <div className='d-flex'onClick={e => {
                        setChildVisibility(v => !v);
                    }}>
                {hasChild && (
                    <div className={`d-inline d-tree-toggler ${ childVisibility ? "active" : "" }`} >
                        <FontAwesomeIcon icon="fa-solid fa-caret-right" />
                    </div>
                )}
                <div className='col d-tree-head'>
                    {node.title}
                    <span>
                    <CommitterDetailInfoButton barVisibility = {barVisibility} setBarVisibility={setBarVisibility} padding={0}/>
                    </span>
                    {
                    barVisibility &&
                    <div className="flex-column bar-plot-size">
                    <BarPlot data={node.authors} />
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

const CommitterDetailInfoButton = ({barVisibility, setBarVisibility}) => {
    const onClick = (e) => {
        e.stopPropagation()
        setBarVisibility(v =>!v); 
    }

    return (
        <>
            <Tooltip title="view details">
              <Button
                ghost
                onClick={onClick}
                style={{ border: "none" }}
                shape="circle"
                size="small"
                icon={barVisibility ? <EyeOutlined style={{ fontSize: '13px', color: '#08c' }}/> : <EyeInvisibleOutlined style={{ fontSize: '13px', color: '#08c' }}/>}
              />
            </Tooltip>
        </>
    )
}

const BarPlot = ({data}) => {
    if (data.length === 1 && data[0].commit_count === 0) {
        return <></>
    }
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