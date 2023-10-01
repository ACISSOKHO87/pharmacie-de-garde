import React, { lazy, Suspense} from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';
/*import Home from './containers/home';
import Header from './components/header';
import Footer from './components/footer';
import Login from './containers/user/login'
import Logout from './containers/user/logout'
import Forgot from './containers/user/forgot'
import Reset from './containers/user/reset';
import Register from './containers/user/register';
import Contact from './containers/contact';
import RequireAuth from './helpers/require-auth' */

import Header from './components/header';
import Footer from './components/footer';
const  Home = lazy(() => import('./containers/home'))
const  Login = lazy(() => import('./containers/user/login'))
const  Logout = lazy(() => import('./containers/user/logout'))
const  Forgot = lazy(() => import('./containers/user/forgot'))
const  Reset = lazy(() => import('./containers/user/reset'))
const  Register = lazy(() => import('./containers/user/register'))
const  Contact = lazy(() => import('./containers/contact'))
const  RequireAuth = lazy(() => import('./helpers/require-auth'))
const Admin = lazy(() => import('./containers/admin/admin'))
const Profil = lazy(() =>import('./containers/profil'))
function App() {
  return (
    <div className="App">
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route exact path="/" element={<RequireAuth child={Home} auth={false}/>}/>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/login/:status" element={<Login />} />
                <Route exact path="/password/forgot" element={<Forgot/>}/>
                <Route exact path="/password/reset" element={<Reset/>}/>
                <Route exact path="/logout" element={<RequireAuth child={Logout} auth={true}/>}/>
                <Route exact path="/Admin" element={<RequireAuth child={Admin} auth={true}/>}/>
                <Route exact path="/Profil" element={<RequireAuth child={Profil} auth={true}/>}/>
                <Route exact path="/contact" element={<Contact/>}/>
            </Routes>
        </Suspense>
        <Footer />
    </div>
  );
}

export default App;
 