import {
  Category,
  Course,
  District,
  Filter,
  Subcategory,
  City,
} from "../utils/types";

export interface DataState {
  courses: Course[];
  categories: Category[];
  districts: District[];
  currentCourse?: {
    course: Course;
    subcategories: string[];
    cities: string[];
  };
}

export interface FilterState {
  // subCategoryFilter: (courses: Course[]) => Course[];
  allCoursesByCategory: Course[];
  selectedCategory?: Category;
  filteredCourses: Course[];
  districtFilters: Filter;
  subcategoryFilters: Filter;
  searchKeyword: string;
}

export interface ModalState {
  modalState:{
    open: boolean;
    success: boolean;
  };
  modalContent: {
    heading: string;
    text: string;
    buttonText: string;
  };
}

export enum FilterTypes {
  district = "district",
  subcategory = "subcategory",
}

export enum FilterNames {
  district = "Län/Distrikt",
  subcategory = "Underkategorier",
}
