import { Fragment, useRef, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

import { CardsList, FilterMobile, Filter } from ".";
import * as types from "../utils/types";
import { Search } from "@mui/icons-material";
import { useAppDispatch, setSelectedCategory, useAppSelector, selectFilters, selectData, setSearchKeyword } from "../state";

// const sortOptions = [
//   { name: "Most Popular", href: "#", current: true },
//   { name: "Best Rating", href: "#", current: false },
//   { name: "Newest", href: "#", current: false },
//   { name: "Price: Low to High", href: "#", current: false },
//   { name: "Price: High to Low", href: "#", current: false },
// ];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface ICardsListContainer {
  courses: types.Course[];
  searchCourses: (keyword: string) => void;
}
export default function CardsListContainer({
  courses,
  searchCourses,
}: ICardsListContainer) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const searchChange = () => {
    if (!searchRef.current) {
      return;
    }

    searchCourses(searchRef.current.value);
  };

  const { districtFilters, subcategoryFilters, searchKeyword } = useAppSelector(selectFilters);

  const filters: types.Filter[] = [
    { ...districtFilters },
    { ...subcategoryFilters },
  ];

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {filters.map(filter => {
                      if (filter.options.length !== 0) {
                        return <FilterMobile
                          section={filter}
                          filterType={filter.id}
                          key={filter.id}
                        />
                      }
                    })}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl p-2 sm:px-2 sm:py-5">
          <div className="flex sm:items-baseline sm:justify-between border-b border-gray-200 pb-6 flex-col sm:flex-row flex-end sm:px-0 gap-3.5">
            <div id="responsive-search" className="border rounded-md ">
              <div className="max-w-lg lg:max-w-sm">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative text-gray-400 focus-within:text-gray-600">
                  <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <MagnifyingGlassIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="search"
                    className="block bg-white py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white focus:border-white sm:text-sm"
                    placeholder="Search"
                    ref={searchRef}
                    type="search"
                    name="search"
                    value={searchKeyword}
                    onChange={searchChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              {/* <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu> */}

              {/* <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button> */}
              <button
                type="button"
                style={{
                  // marginRight:"20px",    
                 borderWidth: '1px',
    borderColor:' rgb(98, 135, 0)'}}
                id="button-filter-icon"
                className=" sm:ml-6 lg:hidden m-2 ml-4 p-2 bg-white text-black  bg-transparent text-black  p-2 rounded-md inline-flex items-center justify-center  focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-white transition-colors ease-in-out duration-300"
                // className="-m-2 ml-4 p-2 text-gray-400 hover:text-white sm:ml-6 lg:hidden  bg-indigo-600 p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white "
                onClick={() => setMobileFiltersOpen(true)}
              >
                <h3 style={{color:'#628700'}}>Filtrera</h3>
                {/* <FunnelIcon 
                className="h-5 w-5" 
                aria-hidden="true" /> */}
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            {courses.length === 0 ? (
              <div className="flex flex-col justify-center items-center py-10">
                <span>Inga kurser tillgängliga för detta alternativ.</span>
                <span
                  onClick={() => {
                    dispatch(setSearchKeyword(""))
                    searchCourses("")
                    dispatch(setSelectedCategory(undefined))
                  }}
                  className="cursor-pointer text-xs font-semibold uppercase text-[#96C31E] tracking-wide"
                >
                  Visa alla kurser
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">
                  {filters.map(filter => {
                    if (filter.options.length !== 0) {
                      return <Filter
                        section={filter}
                        filterType={filter.id}
                        key={filter.id}
                      />
                    }
                  })}
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  <CardsList courses={courses} />
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
