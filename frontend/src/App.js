import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from "./compoments/home/home"
import NavBar from "./compoments/navbar/navbar"
import LoginPage from "./compoments/login/login"
import SignupPage from "./compoments/login/signup"
import AdminDashboard from "./compoments/admin/categories/admin"
import './App.css';
import CategoryPage from './compoments/categ/categories';
import AttendancePage from './compoments/student/attancence';
import adminCount from './compoments/admin/categories/admincheque';
import adminCreate from './compoments/admin/categories/createproduct';
import Footer from "./compoments/Footer/Footer"

function App() {
  return (
    <Router>
  <NavBar/>
  <Switch>
    <Route exact path="/" render={() => (
      <>
        <Home />
        <CategoryPage />
       
      </>
    )} />
    <Route path="/login" component={LoginPage} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/Category" component={CategoryPage} />
    <Route path="/admin-dashboard" component={AdminDashboard} />
    <Route path="/attendance" component={AttendancePage} />
    <Route path="/admincount" component={adminCount} />
    <Route path="/adminCreate" component={adminCreate} />
  </Switch>
  <Footer/>
</Router>
  )
}

export default App;
