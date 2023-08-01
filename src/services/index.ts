import axios, { AxiosError } from "axios";
// import dotenv from "dotenv";
import * as types from "../utils/types";

// dotenv.config()

const API_URL = "http://192.71.151.213:8080";

interface ApiResponse {
  success: boolean;
  msg?: string;
}

export const getCategories = async (): Promise<types.Category[]> => {
  try {
    const response = await axios.get(`${API_URL}/user/categories`);
    const data = response.data;

    return data;
  } catch (e) {
    return [];
  }
};

export const getCourses = async ({
  categoryId,
}: {
  categoryId?: string;
}): Promise<types.Course[]> => {
  try {
    const url =
      API_URL +
      "/user" +
      (categoryId !== undefined
        ? `/coursesByCategoryId/${categoryId}`
        : "/courses");
    const response = await axios.get(url);
    const data = response.data;

    return data;
  } catch (e) {
    // console.log(e)
    return [];
  }
};

export const getCoursesByKeyword = async ({
  keyword,
}: {
  keyword: string;
}): Promise<types.Course[]> => {
  try {
    const response = await axios.post(
      API_URL + `/user/searchCourses/${keyword}`
    );

    return response.data;
  } catch (e) {
    // console.log(e)
    return [];
  }
};

export const getCourse = async ({
  courseId,
}: {
  courseId?: string;
}): Promise<types.Course | undefined> => {
  try {
    const url = `${API_URL}/user/courses/${courseId}`;
    const response = await axios.get(url);
    const data = response.data;

    return data;
  } catch (e) {
    // console.log(e)
    return undefined;
  }
};

export const getCoursesWithCategoriesAndLocations =
  async (): Promise<types.CoursesWithCategoriesAndLocations> => {
    try {
      const response = await axios.get(
        `${API_URL}/user/coursesWithCategoriesAndLocations`
      );
      const data = response.data;

      return data;
    } catch (e) {
      return {
        courses: [],
        categories: [],
        districts: [],
      };
    }
  };

export const addBooking = async (
  body: types.BookingBody
): Promise<ApiResponse> => {
  try {
    const response = await axios.post(`${API_URL}/user/booking`, body);
    return {
      success: true,
    };
  } catch (e) {
    const error = e as AxiosError;
    return {
      success: false,
      msg: error.response?.data as string,
    };
  }
};

export const getAllLocations = async (): Promise<types.District[]> => {
  try {
    const response = await axios.get(`${API_URL}/user/locations`);
    const data = response.data;

    return data;
  } catch (e) {
    return [];
  }
};
