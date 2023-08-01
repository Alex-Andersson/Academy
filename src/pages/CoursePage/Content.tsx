import { useState } from "react";
import { useNavigate, redirect } from "react-router-dom";
import { CourseInfo, CourseBookingForm } from "../../components";
import * as types from "../../utils/types";
import * as services from "../../services";
import { selectData, useAppSelector, useAppDispatch } from "../../state";
import * as state from "../../state";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

export default function Content() {
  const navigate = useNavigate();

  const { currentCourse } = useAppSelector(selectData);
  const dispatch = useAppDispatch();
  const makeBooking = async (formInput: {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    address: string;
    personnummer: string;
    kommun: string;
    city: string;
    zipcode: string;
  }) => {
    if (currentCourse !== undefined) {
      const body: types.BookingBody = {
        first_name: formInput.firstName,
        last_name: formInput.lastName,
        email: formInput.email,
        mobile: formInput.mobile,
        personal_number: parseInt(formInput.personnummer),
        address: formInput.address,
        kommun: formInput.kommun,
        city: formInput.city,
        zipcode: parseInt(formInput.zipcode),
        course_id: currentCourse.course.id,
      };
      const response = await services.addBooking(body);

      if (response.success) {
        dispatch(
          state.setModalState({
            open: true,
            success: true,
          })
        );
        dispatch(
          state.setModalContent({
            heading: "Registrering godkänd!",
            text: "Vi skickar ett mail med alla uppgifter kring din registrering",
            buttonText: "Tillbaka till huvudsidan",
          })
        );
      } else {
        dispatch(
          state.setModalState({
            open: true,
            success: false,
          })
        );
        dispatch(
          state.setModalContent({
            heading: "Failure", // TODO: change to swedish
            text:
              response.msg ||
              "There was an error signing up to this course. Please check your internet connection and try again.",
            buttonText: "Back to main page",
          })
        );
      }
    }
  };

  return (
    <main className="sm:-mt-48 -mt-40">
      <div className="mx-auto px-6 pb-6 sm:px-20 lg:px-20 rounded-lg">
        <>
          <div className="mb-5">
            <div
              className="relative inline-flex justify-center text-white text-lg font-medium leading-6"
              style={{
                bottom: "24px",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              <ChevronLeftIcon
                className="flex-shrink-0 mr-1.5 h-7 w-5 text-white"
                aria-hidden="true"
              />
              Tillbaka
            </div>
            <CourseInfo />
          </div>
          {currentCourse !== undefined && (
            <div className="bg-white max-w-7xl p-4 sm:p-6 lg:p-8 sm:rounded-lg shadow">
              <CourseBookingForm
                makeBooking={makeBooking}
                onClickModalButton={() => {
                  dispatch(
                    state.setModalState({
                      open: false,
                      success: false,
                    })
                  );
                  navigate("/");
                }}
              />
            </div>
          )}
        </>
      </div>
    </main>
  );
}
