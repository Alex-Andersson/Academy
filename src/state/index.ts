import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import dataSlice from "./slices/dataSlice";
import filterSlice from "./slices/filterSlice";
import modalSlice from "./slices/modalSlice";

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    filter: filterSlice.reducer,
    modal: modalSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const {
  populateAll,
  populateCategories,
  populateDistricts,

  setCurrentCourseInfo,
} = dataSlice.actions;

export const {
  populateCoursesByCategory,
  
  setFilteredCourses,
  setSelectedCategory,
  setSearchKeyword,
  searchCoursesKeyword,

  populateDistrictFilters,

  onChangeFilterChecks,
} = filterSlice.actions;

export const {
  setModalState,
  setModalContent,
} = modalSlice. actions;

export const selectData = (state: RootState) => state.data;
export const selectFilters = (state: RootState) => state.filter;
export const selectModal = (state: RootState) => state.modal;
