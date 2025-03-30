import { AxiosResponse } from 'axios';

import { clientApi } from '../../core/api/apiClient';
import { ITreeData } from './types';

export const treeApi = {
  async getTree(treeName: string): Promise<AxiosResponse<ITreeData>> {
    return await clientApi.post(`api.user.tree.get?treeName=${treeName}`);
  },

  async createNode(treeName: string, parentId: number, nodeName: string) {
    return clientApi.post(
      `api.user.tree.node.create?treeName=${treeName}&parentNodeId=${parentId}&nodeName=${nodeName}`
    );
  },

  async renameNode(treeName: string, nodeId: number, newNodeName: string) {
    return clientApi.post(
      `api.user.tree.node.rename?treeName=${treeName}&nodeId=${nodeId}&newNodeName=${newNodeName}`
    );
  },

  async deleteNode(treeName: string, nodeId: number) {
    return clientApi.post(`api.user.tree.node.delete?treeName=${treeName}&nodeId=${nodeId}`);
  },
};
