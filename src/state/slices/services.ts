import * as types from "../../utils/types";

export const filterCourses = ({
  allCoursesByCategory,
  subcategoryFilters,
  districtFilters,
}: {
  allCoursesByCategory: types.Course[];
  subcategoryFilters: types.Filter;
  districtFilters: types.Filter;
}): types.Course[] => {
  const _filteredCourses: types.Course[] = [];

  // for districts
  districtFilters.options.forEach((option) => {
    if (option.checked) {
      _filteredCourses.push(
        ...allCoursesByCategory.filter(
          (course) =>
            // (the course matches the filter) && (the course is not already pushed - to avoid double values)
            course.district_ids.includes(option.id) &&
            !_filteredCourses.map((f) => f.id).includes(course.id)
        )
      );
    }
  });

  // for subcategory
  subcategoryFilters.options.forEach((option) => {
    if (option.checked) {
      _filteredCourses.push(
        ...allCoursesByCategory.filter(
          (course) =>
            course.subcategory_ids.includes(option.id) &&
            !_filteredCourses.map((f) => f.id).includes(course.id)
        )
      );
    }
  });

  // if no option is selected, show all courses in the category
  if (_filteredCourses.length === 0) {
    return [...allCoursesByCategory];
  } else {
    return [..._filteredCourses];
  }
};
