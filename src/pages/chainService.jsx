import api from "./api";

// Get all active chains
export const getChains = async () => {
  const response = await api.get("/chains");
  return response.data;
};

// Get chain by ID
export const getChainById = async (id) => {
  const response = await api.get(`/chains/${id}`);
  return response.data;
};

// Get chains by group
export const getChainsByGroup = async (groupId) => {
  const response = await api.get(`/chains/group/${groupId}`);
  return response.data;
};

// Create chain
export const createChain = async (chainData) => {
  const response = await api.post("/chains", chainData);
  return response.data;
};

// Update chain
export const updateChain = async (id, chainData) => {
  const response = await api.put(`/chains/${id}`, chainData);
  return response.data;
};

// Delete chain
export const deleteChain = async (id) => {
  const response = await api.delete(`/chains/${id}`);
  return response.data;
};