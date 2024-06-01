import axios from "axios";

const API_URL = '/api/meals/'

const createMeal = async (mealData, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }    
      const response = await axios.post(API_URL, mealData, config)    
      return response.data
}

const getAllMeals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

const deleteMeal = async (mealId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + mealId, config)
  return response.data
}

//Updates meal with user changes
const updateMeal = async (mealData, id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL + id, mealData, config)
  return response.data
}

const browseMeals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + 'browse', config)
  
  return response.data
}


const mealService = {
    createMeal,
    getAllMeals,
    deleteMeal,
    browseMeals,
    updateMeal,
  }
  
export default mealService