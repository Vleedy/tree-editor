import { useCallback, useState } from 'react';

import useQuery from '../../core/hooks/useQuery';

import useTreeNodeActions from './useTreeNodeActions';
import useAlert from '../../shared/Alert/useAlert';
import { ITreeData } from '../api/types';
import { getTreeName } from '../utils/treeHelpers';

import { treeApi } from '../api/treeApi';

const useTreeView = () => {
  const [treeName] = useState(() => getTreeName());

  const { data, isLoading, error, refetch } = useQuery<ITreeData>(
    useCallback(() => treeApi.getTree(treeName), [treeName])
  );

  const { alertMessage, showAlert, handleAlertClose } = useAlert();

  const { action, openNodes, handleTreeNodeActionClick, clearAction } = useTreeNodeActions();

  return {
    treeName,
    data,
    isLoading,
    errorMessage: error?.message || '',
    refetch,
    alertMessage,
    showAlert,
    handleAlertClose,
    action,
    openNodes,
    handleTreeNodeActionClick,
    clearAction,
  };
};

export default useTreeView;
