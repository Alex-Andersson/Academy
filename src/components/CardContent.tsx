/* This example requires Tailwind CSS v2.0+ */
import {
  AcademicCapIcon,
  BuildingLibraryIcon,
  CalendarIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

import * as types from "../utils/types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface ICardContent {
  course: types.Course;
}

export default function CardContent({ course }: ICardContent) {

  const startDate = new Date(course.start_date);
  const formattedDate = startDate.toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' });

// const formattedPrice = course.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  

  // console.log("course data:", course);
  return (
    <Link to={`course/${course.id}`}>
      <div className="flex flex-col h-full justify-between">
        <h2
          style={{color:'#628700'}}
          className="sm:text-2xl font-bold leading-7 text-gray-900 sm:truncate text-[#111827] cursor-pointer hover:underline"
          onClick={() => {}}
        >
          {course.course_name}
        </h2>
        <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
          <div className="mt-2 flex items-center sm:text-sm text-xs text-[#6B7280] font-medium">
            <BuildingLibraryIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-[#6B7280]"
              aria-hidden="true"
            />
            {course.sessions} träffar
            {/* {course.start_date} */}
          </div>
          <div className="mt-2 flex items-center sm:text-sm text-xs text-[#6B7280] font-medium">
            
            <AcademicCapIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-[#6B7280]"
              aria-hidden="true"
            />
           
            {course.max_seats} seats
            {/* {course.hours} */}
          </div>
          <div className="mt-2 flex items-center sm:text-sm text-xs text-[#6B7280] font-medium">
            <CurrencyDollarIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-[#6B7280]"
              aria-hidden="true"
            />
            {course.price}
            {/* {formattedPrice} */}
          
          </div>
          <div className="mt-2 flex items-center sm:text-sm text-xs text-[#6B7280] font-medium">
            <CalendarIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-[#6B7280]"
              aria-hidden="true"
            />
            {formattedDate}
            {/* {course.start_date} */}
          </div>
        </div>
      </div>
    </Link>
  );
}
