import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { MsalProvider } from "@azure/msal-react";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import Home from "./Home";
import ProfilePage from './Components/ProfilePage/Profilepage';
import Login from "./Pages/landing/Login";
// import Login from "./Login";
import Callback from "./Callback";
import ProjectPage from './Pages/Projects/ProjectPage'
import CoursePage from './Pages/courses/CoursesPage';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import ProjectDisplay from "./Components/ProjectDisplay/ProjectDisplay";
function App() {
  const [projects, setProjects] = React.useState([]);
  const [courses, setCourses] = React.useState([]);
  const [user, setUser] = React.useState();
  React.useEffect(() => {
        const getUserinfo = async() => {
            try{
                const token = localStorage.getItem("token");
                var response = await fetch("http://localhost:3001/api/user-info", {
                    method: 'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }); 
                response = await response.json();
                setUser(response);
                // console.log(user);
            } catch(error){
                console.log(error);
            }
        }
        getUserinfo();
    }, [])
  React.useEffect(() => {
      const allprojects = async() => {
          var response = await fetch("http://localhost:3001/api/projects", {
              method: 'POST', 
              headers: {
                  'Content-Type': 'application/json'
              }
          }); 
          response = await response.json();
          setProjects(response);
      }
      allprojects();
  },[])
  React.useEffect(() => {
      const allcourses = async() => {
          var response = await fetch("http://localhost:3001/api/courses", {
              method: 'POST', 
              headers: {
                  'Content-Type': 'application/json'
              }
          }); 
          response = await response.json();
          
          setCourses(response);
          console.log(response);
          // setProjects(response);
      }
      allcourses();
  },[])
  return (
    <React.Fragment>
      <AuthenticatedTemplate>
        <Router>
          <Routes>
            {/* <Route index element={<Home />} /> */}
            <Route path="/" element={<Callback />} />
            <Route exact path='/myprofile' element={<ProfilePage userinfo={user} courses={courses} projects={projects}/>}></Route>
            <Route path="/home" element={<Home projects ={projects} user={user}/>} />
            <Route exact path='/projects' element={<ProjectPage projects={projects}/>}></Route>
            <Route exact path='/courses' element={<CoursePage courses={courses}/>}></Route>
            <Route
              exact
              path="/ProjectDisplay"
              element={<ProjectDisplay/>}
            ></Route>
            {/* <Route path="about" element={<About />} /> */}
          </Routes>
        </Router>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Login />
      </UnauthenticatedTemplate>
    </React.Fragment>
      

  );
}

export default App;
