import { Modal, TextField, Typography } from '@mui/material';

import EditModalActionButtons from './EditModalActionButtons';

import { useEditModalLogic } from '../../hooks/useEditModal';
import { NODE_NAME_LENGTH } from '../../utils/treeHelpers';

import { IAlert } from '../../../shared/Alert/types';
import { NodeActionType } from '../../api/types';

import './_editModal.scss';

interface EditModalProps {
  treeName: string;
  nodeId: number;
  nodeName: string;
  actionType: NodeActionType;
  openNodes: Record<string, boolean>;
  clearAction: () => void;
  showAlert: (alert: IAlert) => void;
  updateTree: () => Promise<void>;
}

const EditModal = ({
  treeName,
  nodeId,
  nodeName,
  actionType,
  openNodes,
  clearAction,
  showAlert,
  updateTree,
}: EditModalProps) => {
  const { inputValue, isLoading, modalTitle, isInputValueValid, handleChange, handleSubmit } =
    useEditModalLogic(
      treeName,
      actionType,
      nodeId,
      nodeName,
      openNodes,
      updateTree,
      clearAction,
      showAlert
    );

  return (
    <>
      <Modal open onClose={clearAction}>
        <div className="edit-modal">
          <Typography variant="h6" mb={2}>
            {modalTitle}
          </Typography>

          {actionType !== 'delete' ? (
            <TextField
              fullWidth
              type="text"
              label="Node name"
              variant="outlined"
              value={inputValue}
              onChange={handleChange}
              slotProps={{ htmlInput: NODE_NAME_LENGTH }}
            />
          ) : (
            <Typography>{`Do you want to delete "${nodeName}"?`}</Typography>
          )}

          <EditModalActionButtons
            actionType={actionType}
            isValid={isInputValueValid}
            isLoading={isLoading}
            onCancel={clearAction}
            onSubmit={handleSubmit}
          />
        </div>
      </Modal>
    </>
  );
};
export default EditModal;
