export interface ErrorResponseData {
  data?: {
    message?: string;
  };
}

export interface ITreeData {
  id: number;
  name: string;
  children: ITreeData[];
}

export type NodeActionType = 'add' | 'edit' | 'delete';
export interface INodeAction {
  type: NodeActionType;
  nodeId: number;
  nodeName: string;
}
