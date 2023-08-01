import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as types from "../../utils/types";
import { FilterState, FilterTypes, FilterNames } from "../types";
import * as services from "./services";

// export const serializeFunction = (func: Function) => (func.toString());
// export const deserializeFunction: Function = (funcString: string) => (new Function(`return ${funcString}`)());

// // export const subCategoryFilter = createAsyncThunk(
// //   "subCategoryFilter",
// //   async (courses: Course[]): Promise<Course[]> => {

// //   }
// // );

// export const getFilteredCoursesByKeyword = createAsyncThunk(
//   "filter/coursesByKeyword",
//   async (keyword: string): Promise<types.Course[]> => {

//     return

//   }
// );

const initialState: FilterState = {
  allCoursesByCategory: [],
  filteredCourses: [],
  districtFilters: {
    id: FilterTypes.district,
    name: FilterNames.district,
    options: [],
  },
  subcategoryFilters: {
    id: FilterTypes.subcategory,
    name: FilterNames.subcategory,
    options: [],
  },
  searchKeyword: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    populateDistrictFilters: (
      state,
      action: PayloadAction<types.District[]>
    ) => {
      state.districtFilters.options = action.payload.map((district) => ({
        id: district.district_id,
        label: district.district_name,
        checked: false,
      }));
    },
    populateCoursesByCategory: (
      state,
      action: PayloadAction<types.Course[]>
    ) => {
      state.allCoursesByCategory = action.payload;
    },

    setSelectedCategory: (
      state,
      action: PayloadAction<types.Category | undefined>
    ) => {
      state.selectedCategory = action.payload;

      // populate subcategory filters automatically
      state.subcategoryFilters.options =
        action.payload?.subcategories.map((subcategory) => ({
          id: subcategory.subcategory_id,
          label: subcategory.subcategory_name,
          checked: false,
        })) || [];

      // resetting all filter checks
      state.districtFilters.options.forEach(
        (option) => (option.checked = false)
      );
      state.subcategoryFilters.options.forEach(
        (option) => (option.checked = false)
      );
    },
    setFilteredCourses: (state, action: PayloadAction<types.Course[]>) => {
      state.filteredCourses = action.payload;
    },
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload;
    },

    searchCoursesKeyword: (state, action: PayloadAction<string>) => {
      if (action.payload === "") {
        state.filteredCourses = services.filterCourses({
          allCoursesByCategory: state.allCoursesByCategory,
          subcategoryFilters: state.subcategoryFilters,
          districtFilters: state.districtFilters,
        })
        return;
      }

      state.filteredCourses = state.filteredCourses.filter((course) =>
        course.course_name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },

    onChangeFilterChecks: (
      state,
      action: PayloadAction<{
        filterType: FilterTypes;
        option: types.FilterOption;
      }>
    ) => {
      let flag = 0;
      if (action.payload.filterType === FilterTypes.district) {
        const index = state.districtFilters.options.findIndex(
          (option) => option.id === action.payload.option.id
        );
        state.districtFilters.options[index].checked =
          !state.districtFilters.options[index].checked;
      }
      if (action.payload.filterType === FilterTypes.subcategory) {
        const index = state.subcategoryFilters.options.findIndex(
          (option) => option.id === action.payload.option.id
        );
        state.subcategoryFilters.options[index].checked =
          !state.subcategoryFilters.options[index].checked;
      }

      state.filteredCourses = services.filterCourses({
        allCoursesByCategory: state.allCoursesByCategory,
        subcategoryFilters: state.subcategoryFilters,
        districtFilters: state.districtFilters,
      })

      state.searchKeyword = "";
    },
  },
});

export default filterSlice;
