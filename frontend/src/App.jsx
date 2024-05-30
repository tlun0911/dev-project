import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import './App.css'
import Homepage from './pages/Homepage';
import AddMealPage from './pages/Meals/AddMealPage';
import MealsPage from './pages/Meals/MealsPage';
import MealPage from './pages/Meals/MealPage';
import EditMealPage from './pages/Meals/EditMealPage';
import NotFoundPage from './pages/NotFoundPage';
import Register from './components/Register';
import Login from './components/Login';
import BrowseMeals from './components/BrowseMeals';
import PlanPage from './pages/Plans/PlanPage';
import AddPlanPage from './pages/Plans/AddPlanPage';

function App () {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Homepage /> } />
        <Route path='/add-meal' element={<AddMealPage  />} />
        <Route path='/meals' element={<MealsPage /> } />
        <Route path='/meals/:id'
          element={<MealPage  />}
        />
        <Route
          path='/edit-meal/:id'
          element={<EditMealPage  />}
        />
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/browse' element={ <BrowseMeals /> } />
        <Route path='/plans' element={<PlanPage />} />
        <Route path='/plans/create' element={<AddPlanPage />} />
        <Route path="*" element={<NotFoundPage /> } />
    


      </Route>
    )
  );
  

  
    return <RouterProvider router={router} />;

}


export default App
