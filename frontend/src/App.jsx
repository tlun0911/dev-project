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
import MealPage from './pages/MealPage';
import EditMealPage from './pages/EditMealPage';
import NotFoundPage from './pages/NotFoundPage';
import Register from './components/Register';
import Login from './components/Login';
import BrowseMeals from './components/BrowseMeals';

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
        <Route path="*" element={<NotFoundPage /> } />
    


      </Route>
    )
  );
  

  
    return <RouterProvider router={router} />;

}


export default App
