import TreeNode from './TreeNode';
import DataStateWrapper from '../../../shared/DataStateWrapper/DataStateWrapper';
import EditModal from '../EditModal/EditModal';
import Alert from '../../../shared/Alert/Alert';

import useTreeView from '../../hooks/useTreeView';

import { ITreeData } from '../../api/types';

import './_treeView.scss';

const TreeView = () => {
  const {
    treeName,
    data,
    isLoading,
    errorMessage,
    refetch,
    alertMessage,
    showAlert,
    handleAlertClose,
    action,
    openNodes,
    handleTreeNodeActionClick,
    clearAction,
  } = useTreeView();

  return (
    <DataStateWrapper<ITreeData> isLoading={isLoading} data={data} error={errorMessage}>
      {(validData) => (
        <div className="tree-container">
          <ul role="tree" className="tree" onClick={handleTreeNodeActionClick}>
            <TreeNode node={validData} isRoot={true} openNodes={openNodes} />
          </ul>

          {action && (
            <EditModal
              treeName={treeName}
              actionType={action.type}
              nodeId={action.nodeId}
              nodeName={action.nodeName}
              openNodes={openNodes}
              updateTree={refetch}
              showAlert={showAlert}
              clearAction={clearAction}
            />
          )}

          {alertMessage && (
            <Alert
              message={alertMessage.message}
              severity={alertMessage.type}
              autoClose={3500}
              onClose={handleAlertClose}
            />
          )}
        </div>
      )}
    </DataStateWrapper>
  );
};

export default TreeView;
