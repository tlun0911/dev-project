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
  console.log('inside getAllMeals')
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

const getMeal = async (mealId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  const response = await axios.get(API_URL + mealId, config)
  console.log("Response inside getMeal service", response.data)
  return response.data
}



const mealService = {
    createMeal,
    getAllMeals,
    deleteMeal,
    getMeal
  }
  
export default mealService