import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as types from "../../utils/types";
import { DataState } from "../types";

const initialState: DataState = {
  courses: [],
  categories: [],
  districts: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    populateAll: (
      state,
      action: PayloadAction<types.CoursesWithCategoriesAndLocations>
    ) => {
      state.courses = action.payload.courses;
      state.categories = action.payload.categories;
      state.districts = action.payload.districts;
    },
    populateCategories: (state, action: PayloadAction<types.Category[]>) => {
      state.categories = action.payload;
    },
    populateDistricts: (state, action: PayloadAction<types.District[]>) => {
      state.districts = action.payload;
    },

    setCurrentCourseInfo: (state, action: PayloadAction<types.Course | undefined>) => {
      if (action.payload !== undefined) {
        const allSubcategoryNamesById: { [key: string]: string } = {};
        state.categories.forEach((category) => {
          category.subcategories.forEach((subcategory) => {
            allSubcategoryNamesById[subcategory.subcategory_id] =
            subcategory.subcategory_name;
          });
        });
        const allCityNamesById: { [key: string]: string } = {};
        state.districts.forEach((district) => {
          district.cities.forEach((city) => {
            allCityNamesById[city.city_id] = city.city_name;
          });
        });
        
        const subcategories = action.payload.subcategory_ids.map(id => allSubcategoryNamesById[id])
        const cities = action.payload.city_ids.map(id => allCityNamesById[id])
        
        state.currentCourse = {
          course: action.payload,
          subcategories,
          cities,
        };
      }
    },
  },
});

export default dataSlice;
