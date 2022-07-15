import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css"

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

export default Tree;