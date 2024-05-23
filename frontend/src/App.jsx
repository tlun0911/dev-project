import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import './App.css'
import Homepage from './pages/Homepage';
import AddMealPage from './pages/AddMealPage';
import MealsPage from './pages/MealsPage';
import MealPage, { mealLoader } from './pages/MealPage';
import EditMealPage from './pages/EditMealPage';
import NotFoundPage from './pages/NotFoundPage';
import Register from './components/Register';
import Login from './components/Login';

function App () {

  const addMeal = async (newMeal) => {
    const res = await fetch('/api/meals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMeal),
    });
    return;
  };

  const deleteMeal = async (id) => {
    const res = await fetch(`/api/meals/${id}`, {
      method: 'DELETE',
    });
    return;
  };

  const updateMeal = async (meal) => {
    const res = await fetch(`/api/meals/${meal.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meal),
    });
    return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Homepage /> } />
        <Route path='/add-meal' element={<AddMealPage addMealSubmit={addMeal} />} />
        <Route path='/meals' element={<MealsPage /> } />
        <Route path='/meals/:id'
          element={<MealPage deleteMeal={ deleteMeal } />}
          loader={mealLoader}
        />
        <Route
          path='/edit-meal/:id'
          element={<EditMealPage updateMealSubmit={updateMeal} />}
          loader={mealLoader}
        />
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path="*" element={<NotFoundPage /> } />


      </Route>
    )
  );
  

  
    return <RouterProvider router={router} />;

}


export default App
