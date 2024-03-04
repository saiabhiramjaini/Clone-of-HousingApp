import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from "./components/Home";

import UserSignup from "./components/user/UserSignup"
import UserSignin from "./components/user/UserSignin"
import UserForgotPassword from "./components/user/UserForgotPassword"
import UserResetPassword from './components/user/UserResetPassword'
import UserDashBoard from './components/user/UserDashboard'
import UserHome from './components/user/UserHome';
import UserNavbar from './components/user/UserNavbar';

import AdminSignup from "./components/admin/AdminSignup"
import AdminSignin from "./components/admin/AdminSignin"
import AdminForgotPassword from "./components/admin/AdminForgotPassword"
import AdminResetPassword from './components/admin/AdminResetPassword'
import AdminDashBoard from './components/admin/AdminDashboard'
import AdminUploadProperty from './components/admin/AdminUploadProperty';


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home/>}></Route>

        <Route path='/admin/signup' element={<AdminSignup/>}></Route>
        <Route path='/admin/signin' element={<AdminSignin/>}></Route>
        <Route path='/admin/forgotPassword' element={<AdminForgotPassword/>}></Route>
        <Route path='/admin/resetPassword/:token' element={<AdminResetPassword/>}></Route>
        <Route path='/admin/dashboard' element={<AdminDashBoard/>}></Route>
        <Route path='/admin/uploadProperty' element={<AdminUploadProperty/>}></Route>
        
        <Route path='/user/signup' element={<UserSignup/>}></Route>
        <Route path='/user/signin' element={<UserSignin/>}></Route>
        <Route path='/user/forgotPassword' element={<UserForgotPassword/>}></Route>
        <Route path='/user/resetPassword/:token' element={<UserResetPassword/>}></Route>
        <Route path='/user/dashboard' element={<UserDashBoard/>}></Route>
        <Route path='/user/home' element={<UserHome/>}></Route>
        <Route path='/user/navbar' element={<UserNavbar/>}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App;
