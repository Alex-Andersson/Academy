import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as services from "../../services";
import { AppShelf } from "../../components";
import { Header, Content } from ".";

import { useAppSelector, useAppDispatch } from "../../state";
import * as state from "../../state";

function MainPage() {
  const navigate = useNavigate();
  const { filteredCourses, selectedCategory } = useAppSelector(state.selectFilters);

  const dispatch = useAppDispatch();

  const populateAllData = async () => {
    const response = await services.getCoursesWithCategoriesAndLocations();
    dispatch(state.populateAll(response));
    dispatch(state.populateCoursesByCategory(response.courses))
    dispatch(state.populateDistrictFilters(response.districts));
  };

  useEffect(() => {
    populateAllData();
  }, []);

  const populateCourses = async (categoryId?: string) => {
    const response = await services.getCourses({ categoryId });
    dispatch(state.populateCoursesByCategory(response));
    dispatch(state.setFilteredCourses(response));
  };

  useEffect(() => {
    populateCourses(selectedCategory?.category_id);
  }, [selectedCategory]);

  const populateCoursesBySearch = async (keyword: string) => {
    dispatch(state.setSearchKeyword(keyword));
    dispatch(state.searchCoursesKeyword(keyword))
  };

  return (
    <AppShelf
      Header={Header}
      Content={Content}
      headerProps={{}}
      contentProps={{
        courses: filteredCourses,
        populateCoursesBySearch,
      }}
    />
  );
}

export default MainPage;
