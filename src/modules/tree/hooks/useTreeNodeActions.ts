import { useState, useCallback, useRef } from 'react';

import { INodeAction } from '../api/types';
import { extractTreeAction } from '../utils/treeHelpers';

const useTreeNodeActions = () => {
  const [action, setAction] = useState<INodeAction | null>(null);
  const openNodesRef = useRef<Record<string, boolean>>({});

  const handleTreeNodeActionClick = useCallback(
    (e: React.MouseEvent<HTMLUListElement>) => {
      const target = e.target as HTMLElement;
      const detailsElement = target.closest('details');
      const isActionButton = !!target.closest('[data-action]');

      if (detailsElement && !isActionButton) {
        e.preventDefault();
        const nodeElement = target.closest<HTMLElement>('[data-node-id]');
        const nodeId = nodeElement?.dataset.nodeId;

        if (nodeId) {
          const isOpen = detailsElement.open;

          if (isOpen) {
            detailsElement.open = false;
            delete openNodesRef.current[nodeId];
          } else {
            detailsElement.open = true;
            openNodesRef.current[nodeId] = true;
          }
        }
      } else {
        const detectedAction = extractTreeAction(e);
        if (detectedAction) {
          setAction(detectedAction);
        }
      }
    },
    [setAction]
  );

  const clearAction = useCallback(() => setAction(null), [setAction]);

  return {
    action,
    openNodes: openNodesRef.current,
    handleTreeNodeActionClick,
    clearAction,
  };
};

export default useTreeNodeActions;
