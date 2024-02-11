import React, { useState, useEffect, lazy } from "react";
import CoursesPage from "./CoursesPage";
import MainProfile from "../../Assets/MainProfile";
import "./courses.css";
import LoadingAnimation from "../../Assets/LoaderAnimation/LoaderAnimation";

function FinalCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const allcourses = async () => {
      var response = await fetch(
        "https://coolab-server.onrender.com/api/courses",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      response = await response.json();
      setCourses(response);
      // console.log(response);
      setLoading(false);
      // setProjects(response);
    };
    allcourses();
  }, []);

  if (loading) {
    return <LoadingAnimation/>;
  }
  return (
    <div className="finalCourses-Overlay">
      <CoursesPage courses={courses} />
      <MainProfile />
    </div>
  );
}

export default FinalCourses;
