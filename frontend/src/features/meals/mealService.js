import axios from "axios";

const API_URL = '/api/meals/';



const createMeal = async (id, mealData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + id, mealData, config);
  return response.data;
};

const getAllMeals = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + id, config);
  return response.data;
};

const deleteMeal = async (id, mealId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}${id}/${mealId}`, config);
  return response.data;
};

//Updates meal with user changes
const updateMeal = async (id, mealId, mealData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}${id}/${mealId}`, mealData, config);
  return response.data;
};

const browseMeals = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + id + "/browse", config);

  return response.data;
};

const mealService = {
  createMeal,
  getAllMeals,
  deleteMeal,
  browseMeals,
  updateMeal,
};

export default mealService;
