import React, { useState } from "react";

import EndingModal from "./EndingModal";

interface IBookingForm {
  makeBooking: (formInput: {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    address: string;
    personnummer: string;
    kommun: string;
    city: string;
    zipcode: string;
  }) => Promise<void>;
  onClickModalButton: () => void;
}
export default function CourseBookingForm({ makeBooking, onClickModalButton }: IBookingForm) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [personnummer, setPersonnummer] = useState("");
  const [address, setAddress] = useState("");
  const [kommun, setKommun] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");

  const [pnErrorMsg, setPnErrorMsg] = useState("")
  const [zcErrorMsg, setZcErrorMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      // (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) &&
      mobile !== "" &&
      personnummer !== "" &&
      pnErrorMsg === "" &&
      address !== "" &&
      kommun !== "" &&
      city !== "" &&
      zipcode !== "" &&
      zcErrorMsg === ""
    ) {
      makeBooking({ firstName, lastName, email, mobile, personnummer, address, kommun, city, zipcode });
      setErrorMsg("")
    } else {
      setErrorMsg("Något gick fel. Kontrollera dina inmatningar igen och försök igen.")
    }
  };

  return (
    <>
      <EndingModal
        onClickButton={onClickModalButton}
      />
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Registrera dig</h3>
              <p className="mt-1 text-sm text-gray-600">Alla fält är obligatoriska</p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form onSubmit={onSubmit}>
              <div className="overflow-hidden">
                <div className="bg-white px-4">
                  <div className="grid grid-cols-6 gap-6">

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                        Förnamn
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        autoComplete="given-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-indigo-500 sm:text-sm"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                        Efternamn
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        autoComplete="family-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-indigo-500 sm:text-sm"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        E-postadress
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-indigo-500 sm:text-sm"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                        Telefonnummer
                      </label>
                      <input
                        type="number"
                        name="mobile"
                        id="mobile"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-indigo-500 sm:text-sm"
                        value={mobile}
                        onChange={(event) => setMobile(event.target.value)}
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Personnummer<span className="block text-xs font-light text-gray-500">(YYYYMMDDXXXX)</span>
                      </label>
                      <input
                        type="number"
                        name="personal_number"
                        id="personal_number"
                        autoComplete="personnummer"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-indigo-500 sm:text-sm"
                        value={personnummer}
                        onChange={(event) => {
                          const value = event.target.value
                          if (value.length !== 12) {
                            setPnErrorMsg("Personnummer ska vara 12 siffror långt")
                          } else {
                            setPnErrorMsg("")
                          }
                          setPersonnummer(value)
                        }}
                        required
                      />
                      <div className="text-xs font-light text-red-500">{pnErrorMsg}</div>
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Gatuadress
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        autoComplete="address"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-indigo-500 sm:text-sm"
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="kommun" className="block text-sm font-medium text-gray-700">
                        Kommun
                      </label>
                      <input
                        type="text"
                        name="kommun"
                        id="kommun"
                        autoComplete="address-level1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-indigo-500 sm:text-sm"
                        value={kommun}
                        onChange={(event) => setKommun(event.target.value)}
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        Stad
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-indigo-500 sm:text-sm"
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">
                        Postnummer
                      </label>
                      <input
                        type="number"
                        name="zipcode"
                        id="zipcode"
                        autoComplete="zipcode"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-indigo-500 sm:text-sm"
                        value={zipcode}
                        onChange={(event) => {
                          const value = event.target.value
                          if (value.length !== 5) {
                            setZcErrorMsg("Postnummer ska vara 5 siffror långt")
                          } else {
                            setZcErrorMsg("")
                          }
                          setZipcode(value)
                        }}
                        required
                      />
                      <div className="text-xs font-light text-red-500">{zcErrorMsg}</div>
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-6">
                      <div className="text-sm font-light text-red-500">{errorMsg}</div>
                    </div>
                  </div>
                </div>
                <div className="px-4 pt-4 sm:px-4 mt-3">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-[#96C31E] py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Boka kurs
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}