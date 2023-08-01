/* This example requires Tailwind CSS v2.0+ */
import CardContent from "./CardContent";
import { Course } from "../utils/types";
// import { selectFilters, useAppSelector } from "../state";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface ICardsList {
  courses: Course[];
  // filter: (courses: Course[]) => Course[];
}

export default function CardsList({ courses }: ICardsList) {

  // const { subCategoryFilter } = useAppSelector(selectFilters);

  return (
    <div>
      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-1 lg:grid-cols-1"
      >
        {courses.map((course) => (
          <li
            key={course.id}
            className="col-span-1 flex  rounded-md sm:h-32"
          >
            <div
              className={classNames(
                course.image,
                "flex-shrink-0 flex items-center justify-center sm:w-32 text-white text-sm font-medium rounded-l-md"
              )}
            />
            <div 
            className="flex-1 flex border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate p-4 hover:background"
            style={{borderWidth: '1px', borderRadius: '4px'}}
            >
              <CardContent course={course} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
