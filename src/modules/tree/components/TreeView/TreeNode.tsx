import { memo } from 'react';

import { IconButton } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import TreeNodeActions from './TreeNodeActions';

import { ITreeData } from '../../api/types';

interface TreeNodeProps {
  node: ITreeData;
  isRoot: boolean;
  openNodes: Record<string, boolean>;
}

const TreeNode = memo(({ node, isRoot, openNodes }: TreeNodeProps) => {
  const { id, name, children } = node;
  const hasChildren = node.children.length > 0;

  return (
    <li data-node-id={id} data-node-name={name} key={id}>
      {hasChildren ? (
        <>
          <details open={openNodes[id]}>
            <summary>
              <div className="summary-content">
                <IconButton>
                  <KeyboardArrowRightIcon />
                </IconButton>
                <span title={name}>{name}</span>
                <TreeNodeActions isRoot={isRoot} />
              </div>
            </summary>
            <ul>
              {children.map((child) => (
                <TreeNode key={child.id} node={child} openNodes={openNodes} isRoot={false} />
              ))}
            </ul>
          </details>
        </>
      ) : (
        <div className="summary-content">
          <span title={name}>{name}</span>
          <TreeNodeActions isRoot={isRoot} />
        </div>
      )}
    </li>
  );
});

export default TreeNode;
