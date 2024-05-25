import axios from "axios";

const API_URL = '/api/meals/'

const createMeal = async (mealData, token) => {
  console.log(mealData)
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    
      const response = await axios.post(API_URL, mealData, config)
    
      return response.data
}

const getMeals = () => {

}

const deleteMeals = () => {

}



const mealService = {
    createMeal,
    getMeals,
    deleteMeals,
  }
  
export default mealService