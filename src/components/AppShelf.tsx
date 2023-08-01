import { Disclosure } from "@headlessui/react";
import { BellIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import logo from "../assets/Gaddr-Logo.png";
import Footer from "./Footer";
import * as types from "../utils/types";

const navigation = [
  { name: "Dashboard", href: "/", current: true },
  {
    name: "Team",
    href: "https://www.ibnrushd.se/vilka-ar-vi/",
    current: false,
    target: "_blank",
  },
  {
    name: "Projects",
    href: "https://www.ibnrushd.se/category/nyheter/",
    current: false,
    target: "_blank",
  },
  {
    name: "Calendar",
    href: "https://www.ibnrushd.se/events/",
    current: false,
    target: "_blank",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface IAppShelf {
  Header(props?: any): JSX.Element;
  Content(props?: any): JSX.Element;
  headerProps: any;
  contentProps: any;
}
export default function AppShelf({
  Header,
  Content,
  headerProps,
  contentProps,
}: IAppShelf) {
  return (
    <>
      <div className="min-h-full">
        <div className="">
          <Disclosure
            as="nav"
            id="navbar"
            className="bg-white border-b border-indigo-300 border-opacity-25 lg:border-none"
            style={{ height: "100px", padding: "21px" }}
          >
            {({ open }) => (
              <>
                <div className="max-w-7xl px-2 sm:px-4 lg:px-8">
                  <div
                    className="relative h-16 flex items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25"
                    style={{ borderBottomWidth: "0px" }}
                  >
                        <div className="flex items-center">
      <div>
        <a href="/">
          <img
            className="block pt-2 "
            src={logo}
            alt="Workflow"
            id="logo-img"
            style={{
              height: '50px',
              width: '320px',
              marginLeft: '-20px',
            }}
          />
        </a>
      </div>
      <div className="hidden lg:flex lg:ml-10">
        <div className="flex space-x-4">
          {navigation.map((item) => (
            <a
              target={item.target}
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? "bg-white text-black"
                  : "bg-transparent text-black hover:bg-[#8736FF] hover:bg-opacity-50",
                "block rounded-md py-2 px-3 text-sm font-medium transition-colors duration-300"
              )}
              aria-current={item.current ? "page" : undefined}
            >
              {item.name}
            </a>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex lg:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button
                        className="bg-white text-black  bg-transparent text-black  p-2 rounded-md inline-flex items-center justify-center  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors ease-in-out duration-300"
                        // className="bg-white text-black p-2 rounded-md inline-flex items-center justify-center text-indigo-200 hover:text-white hover:bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
                      >
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                    <div className="hidden lg:block lg:ml-4">
                      <div className="flex items-center">
                        {/* <button
                          type="button"
                          className="bg-[#4a8c08] flex-shrink-0 rounded-full p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="lg:hidden" id="disclourse-panel">
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current
                            ? //   ? "bg-indigo-700 text-white"
                              //   : "text-white hover:bg-indigo-500 hover:bg-opacity-75",
                              // "block rounded-md py-2 px-3 text-base font-medium"
                              "bg-white text-black"
                            : "bg-transparent text-white hover:bg-gray-300 hover:bg-opacity-50",
                          "block rounded-md py-2 px-3 text-sm font-medium transition-colors duration-300"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Header {...headerProps} />
        </div>

        <Content {...contentProps} />
      </div>
      <Footer />
    </>
  );
}
