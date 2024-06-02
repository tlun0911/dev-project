import axios from "axios";

const API_URL = "/api/plans/";

const createPlan = async (planData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, planData, config);
  return response.data;
};

const getPlan = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const deletePlan = async (planId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}${planId}`, config);
  return response.data;
};

const planService = {
  createPlan,
  getPlan,
  deletePlan,
};

export default planService;
