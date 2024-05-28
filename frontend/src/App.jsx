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
import RegisterPanel from './components/Register';
import LoginPanel from './components/Login';

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
        <Route path='/login' element={ <LoginPanel /> } />
        <Route path='/register' element={ <RegisterPanel /> } />
        <Route path="*" element={<NotFoundPage /> } />


      </Route>
    )
  );
  

  
    return <RouterProvider router={router} />;

}


export default App
