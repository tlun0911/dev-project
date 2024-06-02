import axios from "axios";

export const sendEmail = async (userEmail, plan, meals) => {
  const getMealDetails = (mealId) => meals.find((meal) => meal._id === mealId);
  let emailBody = "";

  Object.entries(plan.days).map(([day, { meal }]) => {
    const mealDetails = getMealDetails(meal);
    emailBody += `${day.charAt(0).toUpperCase() + day.slice(1)} - ${
      mealDetails ? mealDetails.meal_name : "No meal planned"
    }\n\n`;
    mealDetails.ingredients.map((ingredient) => {
      emailBody += `${ingredient}\n`;
    });
    mealDetails.recipe && (emailBody += `\n${mealDetails.recipe}\n\n`);
  });

  try {
    const response = await axios.post("/api/email", {
      userEmail,
      emailBody,
    });
    return response;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};
