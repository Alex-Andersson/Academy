import * as types from "../utils/types"
import { selectData, useAppSelector } from "../state";

export default function CourseInfo() {
  const { currentCourse } = useAppSelector(selectData);


  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg sm:mr-[32rem]">
      <div className="p-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-4">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-[#628700]">Startdatum</dt>
            <dd className="mt-1 text-sm text-gray-[#111827] font-normal">
              {currentCourse !== undefined ? (
                new Date(currentCourse.course.start_date).toLocaleDateString(undefined, {
                  dateStyle: "medium"
                })
              ) : ("-")}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-[#628700]">Tid</dt>
            <dd className="mt-1 text-sm text-gray-[#111827] font-normal">
              {currentCourse !== undefined ? (
                currentCourse.course.hours
              ) : ("-")}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-[#628700]">Hur ofta</dt>
            <dd className="mt-1 text-sm text-gray-[#111827] font-normal">
              {currentCourse !== undefined ? (
                currentCourse.course.days
              ) : ("-")}
            </dd>
          </div>
          <div />
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-[#628700]">Deltagare</dt>
            <dd className="mt-1 text-sm text-gray-[#111827] font-normal">
              {currentCourse !== undefined ? (
                currentCourse.course.max_seats
              ) : ("-")}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-[#628700]">Pris</dt>
            <dd className="mt-1 text-sm text-gray-[#111827] font-normal">
              {currentCourse !== undefined ? (
                currentCourse.course.price+" "
              ) : ("- ")}
              SEK
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-[#628700]">Plats</dt>
            <dd className="mt-1 text-sm text-gray-[#111827] font-normal">
              {currentCourse !== undefined ? (
                currentCourse.cities.join(", ")
              ) : ("-")}
            </dd>
          </div>
        </dl>
      </div>
      <hr className="mx-6" />
      <div className="p-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Om kursen</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {currentCourse !== undefined ? (
                currentCourse.course.course_description
              ) : ("-")}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
