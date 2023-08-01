export interface Size {
  width: number | null;
  height: number | null;
}
export interface Subcategory {
  subcategory_id: string;
  subcategory_name: string;
}
export interface Category {
  category_id: string;
  category_name: string;
  subcategories: Subcategory[];
}

export interface Course {
  id: string,
  course_name: string,
  course_description: string,
  start_date: string,
  end_date: string,
  csn_entitled: boolean,
  max_seats: number,
  image: string,
  days: string,
  hours: string,
  price: number,
  sessions: number,
  visible: boolean,
  district_ids: string[];
  city_ids: string[];
  category_ids: string[];
  subcategory_ids: string[];
}


export interface City {
  city_id: string;
  city_name: string;
}
export interface District {
  district_id: string;
  district_name: string;
  cities: City[];
}

export interface CoursesWithCategoriesAndLocations {
  courses: Course[];
  categories: Category[];
  districts: District[];
}

export interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

import { FilterTypes } from "../state/types";
export interface Filter {
  id: FilterTypes;
  name: string;
  options: FilterOption[];
}

export interface Filters {
  districts: Filter;
  subcategory: Filter;
}

export interface BookingBody {
  personal_number: number;
  first_name: string;
  last_name: string;
  address: string;
  zipcode: number;
  city: string;
  kommun: string;
  email: string;
  mobile: string;
  course_id: string;
}
