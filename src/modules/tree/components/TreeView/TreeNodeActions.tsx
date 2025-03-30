import { memo } from 'react';
import { IconButton, Box } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
interface ITreeNodeActionsProps {
  isRoot: boolean;
}
const TreeNodeActions: React.FC<ITreeNodeActionsProps> = ({ isRoot }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
      <IconButton data-action="add">
        <Add fontSize="small" />
      </IconButton>
      {!isRoot && (
        <>
          <IconButton data-action="edit">
            <Edit fontSize="small" />
          </IconButton>
          <IconButton data-action="delete">
            <Delete fontSize="small" />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default memo(TreeNodeActions);
