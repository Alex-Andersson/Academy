import { useEffect } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";

import * as services from "../../services";
import { AppShelf } from "../../components";
import { Header, Content } from ".";

import { useAppDispatch } from "../../state";
import * as state from "../../state";

function CoursePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const populateAllData = async () => {
    const response = await services.getCoursesWithCategoriesAndLocations();
    dispatch(state.populateAll(response));
  };
  useEffect(() => {
    populateAllData();
  }, []);

  const courseId = useLoaderData() as string;
  const populateCourseDetails = async () => {
    const response = await services.getCourse({ courseId });
    dispatch(state.setCurrentCourseInfo(response));
  };
  useEffect(() => {
    populateCourseDetails();
  }, []);

  return (
    <AppShelf
      Header={Header}
      Content={Content}
      headerProps={{}}
      contentProps={{}}
    />
  );
}

export default CoursePage;

