import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { NodeActionType } from '../../api/types';

const ActionButtons = ({
  actionType,
  isValid,
  isLoading,
  onCancel,
  onSubmit,
}: {
  actionType: NodeActionType;
  isValid: boolean;
  isLoading: boolean;
  onCancel: () => void;
  onSubmit: () => Promise<void>;
}) => (
  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
    <Button variant="contained" onClick={onCancel}>
      Cancel
    </Button>
    <Button variant="contained" disabled={!isValid} onClick={onSubmit} loading={isLoading}>
      {actionType === 'delete' ? 'Delete' : 'Save'}
    </Button>
  </Box>
);

export default ActionButtons;
