import { generateUUID, getFromLocalStorage, saveToLocalStorage } from '../../core/utils/helpers';
import { INodeAction, NodeActionType } from '../api/types';

export const NODE_NAME_LENGTH = { minLength: 1, maxLength: 32 };

export const getTreeName = () => {
  const savedName = getFromLocalStorage('treeName');

  if (savedName) return savedName;

  const newName = generateUUID();
  saveToLocalStorage('treeName', newName);

  return newName;
};

const isValidAction = (action: string): action is NodeActionType => {
  return ['add', 'edit', 'delete'].includes(action);
};
export const extractTreeAction = (e: React.MouseEvent<HTMLUListElement>): INodeAction | null => {
  const target = e.target as HTMLElement;
  const actionButton = target.closest<HTMLElement>('[data-action]');

  if (!actionButton) return null;

  const action = actionButton.dataset.action;
  const listItem = actionButton.closest('li');
  const nodeId = listItem?.dataset.nodeId;
  const nodeName = listItem?.dataset.nodeName || '';

  if (!action || !nodeId || !isValidAction(action)) return null;

  const parsedNodeId = Number(nodeId);
  if (Number.isNaN(parsedNodeId)) return null;

  return {
    type: action,
    nodeId: parsedNodeId,
    nodeName,
  };
};

export const nodeClickHandler = (e: React.MouseEvent<HTMLUListElement>) => e.stopPropagation();
export const getModalTitle = (actionType: NodeActionType) => {
  const titles = {
    add: 'Add Child Node',
    edit: 'Edit Node',
    delete: 'Confirm Delete',
  };
  return titles[actionType];
};
