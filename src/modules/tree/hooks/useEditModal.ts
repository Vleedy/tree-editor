import { useState, useCallback } from 'react';

import { AxiosError } from 'axios';

import { useMutation } from '../../core/hooks/useMutation';

import { getModalTitle } from '../utils/treeHelpers';
import { treeApi } from '../api/treeApi';

import { IAlert } from '../../shared/Alert/types';
import { ErrorResponseData, NodeActionType } from '../api/types';

export const useEditModalLogic = (
  treeName: string,
  actionType: NodeActionType,
  nodeId: number,
  initialName: string,
  openNodes: Record<string, boolean>,
  updateTree: () => Promise<void>,
  clearAction: () => void,
  showAlert: (alert: IAlert) => void
) => {
  const [inputValue, setInputValue] = useState(actionType === 'edit' ? initialName : '');

  const onSuccess = useCallback(() => {
    updateTree();
    clearAction();
    showAlert({ type: 'success', message: 'Operation completed successfully' });
    if (actionType === 'delete' && nodeId in openNodes) {
      delete openNodes[nodeId];
    }
  }, [nodeId, openNodes, actionType, updateTree, clearAction, showAlert]);

  const onError = useCallback(
    (error: AxiosError<ErrorResponseData>) =>
      showAlert({ type: 'error', message: error.response?.data?.data?.message || error.message }),
    [showAlert]
  );
  const { isLoading, execute } = useMutation(onSuccess, onError);

  const handleSubmit = useCallback(() => {
    const actions = {
      add: () => treeApi.createNode(treeName, nodeId, inputValue),
      edit: () => treeApi.renameNode(treeName, nodeId, inputValue),
      delete: () => treeApi.deleteNode(treeName, nodeId),
    };

    return execute(actions[actionType]);
  }, [actionType, treeName, nodeId, inputValue, execute]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value),
    []
  );

  return {
    inputValue,
    isLoading,
    isInputValueValid: actionType === 'delete' ? true : inputValue.length > 0,
    modalTitle: getModalTitle(actionType),
    handleChange,
    handleSubmit,
  };
};
