"use client";

import { useEffect, useState } from "react";

import TutorCard from "./TutorCard";

export default function TutorsSearchFilter() {

  // ================= STATES =================

  const [tutors, setTutors] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [searchText, setSearchText] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  // ================= FETCH TUTORS =================

  const fetchTutors =
    async (
      searchValue = search,
      start = startDate,
      end = endDate
    ) => {

      try {

        setLoading(true);

        let url =
          `http://localhost:5000/tutors?search=${searchValue}`;

        // DATE FILTER

        if (start && end) {

          url +=
            `&startDate=${start}&endDate=${end}`;
        }

        const res =
          await fetch(url, {
            cache:
              "no-store",
          });

        const data =
          await res.json();

        setTutors(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  // ================= INITIAL LOAD =================

  useEffect(() => {

    fetchTutors();

  }, []);

  // ================= HANDLE SEARCH =================

  const handleSearch =
    () => {

      setSearch(searchText);

      fetchTutors(
        searchText,
        startDate,
        endDate
      );
    };

  // ================= HANDLE FILTER =================

  const handleFilter =
    () => {

      fetchTutors(
        search,
        startDate,
        endDate
      );
    };

  // ================= CLEAR FILTER =================

  const handleClear =
    () => {

      setSearch("");

      setSearchText("");

      setStartDate("");

      setEndDate("");

      fetchTutors(
        "",
        "",
        ""
      );
    };

  return (

    <div>

      {/* ================= SEARCH & FILTER ================= */}

      <div
        className="
          bg-white dark:bg-white/5
          border border-gray-200 dark:border-white/10
          backdrop-blur-md
          rounded-3xl
          p-6
          mb-12
          shadow-lg
        "
      >

        <div
          className="
            flex flex-col
            xl:flex-row
            gap-8
            items-end
            justify-between
          "
        >

          {/* ================= SEARCH ================= */}

          <div className="w-full xl:w-1/2">

            <label
              className="
                block
                mb-2
                font-semibold
                text-gray-700
                dark:text-gray-300
              "
            >

              Search Tutor

            </label>

            <div className="flex gap-3">

              <input
                type="text"
                placeholder="Search by tutor name..."
                value={searchText}
                onChange={(e) =>
                  setSearchText(
                    e.target.value
                  )
                }
                className="
                  w-full
                  px-5
                  py-4
                  rounded-2xl
                  border
                  border-gray-300
                  dark:border-white/10
                  bg-white
                  dark:bg-white/10
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

              <button
                onClick={
                  handleSearch
                }
                className="
                  px-6
                  py-4
                  rounded-2xl
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  font-bold
                  transition-all
                  duration-300
                "
              >

                Search

              </button>

            </div>
          </div>

          {/* ================= FILTER ================= */}

          <div className="w-full xl:w-auto">

            <label
              className="
                block
                mb-2
                font-semibold
                text-gray-700
                dark:text-gray-300
              "
            >

              Filter By Registration Date

            </label>

            <div
              className="
                flex flex-col
                md:flex-row
                gap-4
              "
            >

              {/* START DATE */}

              <input
                type="date"
                value={startDate}
                onChange={(e) =>
                  setStartDate(
                    e.target.value
                  )
                }
                className="
                  px-5
                  py-4
                  rounded-2xl
                  border
                  border-gray-300
                  dark:border-white/10
                  bg-white
                  dark:bg-white/10
                  outline-none
                "
              />

              {/* END DATE */}

              <input
                type="date"
                value={endDate}
                onChange={(e) =>
                  setEndDate(
                    e.target.value
                  )
                }
                className="
                  px-5
                  py-4
                  rounded-2xl
                  border
                  border-gray-300
                  dark:border-white/10
                  bg-white
                  dark:bg-white/10
                  outline-none
                "
              />

              {/* FILTER BUTTON */}

              <button
                onClick={
                  handleFilter
                }
                className="
                  px-6
                  py-4
                  rounded-2xl
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  font-bold
                  transition-all
                  duration-300
                "
              >

                Filter

              </button>

              {/* CLEAR BUTTON */}

              <button
                onClick={
                  handleClear
                }
                className="
                  px-6
                  py-4
                  rounded-2xl
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  font-bold
                  transition-all
                  duration-300
                "
              >

                Clear

              </button>

            </div>
          </div>
        </div>
      </div>

      {/* ================= LOADING ================= */}

      {loading ? (

        <div
          className="
            text-center
            text-xl
            font-semibold
          "
        >

          Loading Tutors...

        </div>

      ) : tutors.length === 0 ? (

        <div
          className="
            text-center
            text-2xl
            font-bold
            text-red-500
          "
        >

          No Tutors Found

        </div>

      ) : (

        /* ================= TUTORS GRID ================= */

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-8
          "
        >

          {tutors.map(
            (tutor) => (

              <TutorCard
                key={tutor._id}
                tutor={tutor}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}