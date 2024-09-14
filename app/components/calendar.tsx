"use client";

import React, { useEffect, useState } from "react";
import ProgressDonutBar from "./ProgressDonutBar";

type monthsType = { [key: string]: string };
const months: monthsType = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sept",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};
const monthsArr = Object.keys(months);

type daysType = { [key: string]: string };
const daysList: daysType = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};
const daysArr = Object.keys(daysList);
// console.log({ daysArr });

type goalType = { [key: string]: { emoji: string; goal: string } };
const goalList: goalType = {
  money: { emoji: "💰", goal: "save money" },
  exercise: { emoji: "💪", goal: "do exercise" },
  veg: { emoji: "🥦", goal: "eat more veg" },
  meditation: { emoji: "🧘", goal: "do meditation" },
  cleaning: { emoji: "🧹", goal: "do cleaning" },
};
const goalArr = Object.keys(goalList);
// console.log({ goalArr });

type CalendarProps = {
  data: {
    [key: string]: number[];
  };
};
export const Calendar = (props: CalendarProps) => {
  const { data } = props;

  const now = new Date();
  const currentYear = now.getFullYear();

  const currMonthIndex = now.getMonth();
  // console.log({ currMonthIndex });
  const currentMonth = monthsArr[currMonthIndex];

  const [selectedYear, setSelectYear] = useState(now.getFullYear());
  // console.log({ selectedYear });

  const [selectedMonth, setSelectMonth] = useState(monthsArr[currMonthIndex]);
  // console.log({ selectedMonth });

  const selectedMonthIndex = monthsArr.indexOf(selectedMonth);
  // console.log({ selectedMonthIndex });

  const getSelectedMonthIndex = (month: string) => {
    return monthsArr.indexOf(month);
  };

  // *** Note: for the first row of the calendar
  const firstDateOfMonth = new Date(
    selectedYear,
    getSelectedMonthIndex(selectedMonth),
    1,
  );
  // console.log("getSelectedMonthIndex:", getSelectedMonthIndex("September"));
  // console.log({ firstDateOfMonth });

  const firstDayOfMonth = firstDateOfMonth.getDay();
  // console.log({ firstDayOfMonth });

  const getFirstRowBlankBlocks = (dayIndex: number) => {
    if (dayIndex === 0) {
      return 6;
    } else {
      return dayIndex - 1;
    }
  };

  const firstRowBlankBlockSum = getFirstRowBlankBlocks(firstDayOfMonth);
  // console.log("firstRowBlankBlocks: ", firstRowBlankBlocks);

  // *** Note: for middle rows of the calendar
  const firstRowDateBlockSum = 7 - firstRowBlankBlockSum;
  // console.log({ firstRowDateBlockSum });

  const lastDateOfMonth = new Date(
    selectedYear,
    getSelectedMonthIndex(selectedMonth) + 1,
    0,
  );
  // console.log({ lastDateOfMonth });

  const daysInMonth = lastDateOfMonth.getDate();
  // console.log({ daysInMonth });

  const sevenBlockRows = Math.floor((daysInMonth - firstRowDateBlockSum) / 7);
  // console.log({ sevenBlockRows });

  // *** Note: for the last row of the calendar
  const lastRowDateBlockSum = (daysInMonth - firstRowDateBlockSum) % 7;
  // console.log({ lastRowDateBlockNum });

  const lastRowBlankBlockSum = 7 - lastRowDateBlockSum;
  // console.log({ lastRowBlankBlockNum });

  const handleChangeMonth = (val: number) => {
    if (selectedMonthIndex + val < 0) {
      // *** decrement the year
      setSelectYear((curr) => curr - 1);
      // *** set month value = 11 (December)
      setSelectMonth(monthsArr[monthsArr.length - 1]);
    } else if (selectedMonthIndex + val > 11) {
      // *** increment the year
      setSelectYear((curr) => curr + 1);
      // *** set month value = 0 (January)
      setSelectMonth(monthsArr[0]);
    } else {
      setSelectMonth(monthsArr[selectedMonthIndex + val]);
    }
  };

  const handleBackToCurrentMonth = () => {
    setSelectYear(currentYear);
    setSelectMonth(currentMonth);
  };

  interface Targets {
    [key: string]: number;
  }
  const [targets, setTargets] = useState<Targets>({
    money: 0,
    exercise: 0,
    veg: 0,
    meditation: 0,
    cleaning: 0,
  });

  interface Achievement {
    [key: string]: number;
  }
  const [achievements, setAchievements] = useState<Achievement>({
    money: 0,
    exercise: 0,
    veg: 0,
    meditation: 0,
    cleaning: 0,
  });

  // *** Note: update goal achievements
  useEffect(() => {
    const newAchievements: Achievement = {};

    goalArr.map((goal: string) => {
      let sum = 0;
      const goalIndex = goalArr.findIndex((item: string) => item === goal);
      // console.log({ goalIndex });
      const dataLength = Object.keys(data).length;
      // console.log({ dataLength });

      [...Array(dataLength)].map((_, i) => {
        // Note: the data for the first day of the month is stored under "1" (key name) in the month data object
        data[i + 1].map((item) => {
          if (item === goalIndex) {
            sum++;
          }
        });
      });
      // console.log(goal, ": ", sum);

      newAchievements[goal] = sum;
    });

    setAchievements(newAchievements);
  }, [data]);

  const getPercent = (sum: number, target: number) => {
    if (sum === 0) {
      return 0;
    }

    let percent = Math.floor(100 * (sum / target));

    if (percent > 100) {
      return 100;
    }

    return percent;
  };

  return (
    <div className="flex w-full flex-col gap-2 overflow-hidden py-4 sm:py-6 md:py-10">
      {/* Note: month/year and control buttons */}
      <div className="flex items-center justify-center">
        <button
          onClick={() => {
            handleChangeMonth(-1);
          }}
          className="mr-auto h-5 w-5 text-xl leading-5 text-indigo-400 duration-200 hover:opacity-60"
          aria-labelledby="previous-month-label"
        >
          <i className="fa-solid fa-circle-chevron-left"></i>
          <span className="visually-hidden" id="previous-month-label">
            Previous month
          </span>
        </button>

        <div className="flex items-center justify-center gap-2">
          <h2>
            {selectedMonth} {selectedYear}
          </h2>

          {/* Note: hide the "back to current month" button when in the current month */}
          {(currentYear !== selectedYear || currentMonth !== selectedMonth) && (
            <button
              onClick={handleBackToCurrentMonth}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-400 text-xl text-white duration-200 hover:opacity-60"
              aria-labelledby="back-to-current-month-label"
            >
              <i className="fa-solid fa-arrow-rotate-right text-sm"></i>
              <span
                className="visually-hidden"
                id="back-to-current-month-label"
              >
                Back to current month
              </span>
            </button>
          )}
        </div>

        <button
          onClick={() => {
            handleChangeMonth(1);
          }}
          className="ml-auto h-5 w-5 text-xl leading-5 text-indigo-400 duration-200 hover:opacity-60"
          aria-labelledby="next-month-label"
        >
          <i className="fa-solid fa-circle-chevron-right"></i>
          <span className="visually-hidden" id="next-month-label">
            Next month
          </span>
        </button>
      </div>

      {/* Note: days */}
      <div className="grid grid-cols-7 gap-2 text-center font-bold text-indigo-700">
        {daysArr.map((day) => {
          return <h3 key={day}>{daysList[day]}</h3>;
        })}
      </div>

      {/* Note: first row of the calendar */}
      <div className="grid grid-cols-7 gap-2">
        {[...Array(firstRowBlankBlockSum)].map((_, i: number) => (
          <div key={i} className="rounded-lg bg-yellow-50"></div>
        ))}

        {[...Array(firstRowDateBlockSum)].map((_, i: number) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 rounded-lg border border-solid border-yellow-500 bg-white p-2 md:flex-row"
          >
            <h4 className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
              {i + 1}
            </h4>

            <div className="flex flex-wrap justify-center gap-1 text-center md:justify-start">
              {data[i + 1].map((x: number) => (
                <span key={x} role="img" aria-label={goalList[goalArr[x]].goal}>
                  {goalList[goalArr[x]].emoji}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Note: middle rows of the calendar */}
      {Object.keys([...Array(sevenBlockRows)]).map((_, i: number) => {
        const rowBaseNum = 7 * i;

        return (
          <div key={i} className="grid grid-cols-7 gap-2">
            {Object.keys([...Array(7)]).map((_, x: number) => {
              const goalIndex = x + 1;
              const dateNum = rowBaseNum + goalIndex + firstRowDateBlockSum;

              return (
                <div
                  key={goalIndex}
                  className="flex flex-col items-center gap-2 rounded-lg border border-solid border-yellow-500 bg-white p-2 md:flex-row"
                >
                  <h4 className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                    {dateNum}
                  </h4>

                  <div className="flex flex-wrap justify-center gap-1 text-center md:justify-start">
                    {data[dateNum].map((y: number) => (
                      <span
                        key={y}
                        role="img"
                        aria-label={goalList[goalArr[y]].goal}
                      >
                        {goalList[goalArr[y]].emoji}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      {/* Note: last row of the calendar */}
      {/* Note: if lastRowDateBlockSum is 0, don't show the last row */}
      {!!lastRowDateBlockSum && (
        <div className="grid grid-cols-7 gap-2">
          {[...Array(lastRowDateBlockSum)].map((_, i: number) => {
            const dateNum = firstRowDateBlockSum + sevenBlockRows * 7 + i + 1;

            return (
              <div
                key={i}
                className="flex flex-col items-center gap-2 rounded-lg border border-solid border-yellow-500 bg-white p-2 md:flex-row"
              >
                <h4 className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                  {dateNum}
                </h4>

                <div className="flex flex-wrap justify-center gap-1 text-center md:justify-start">
                  {data[dateNum].map((x: number) => (
                    <span
                      key={x}
                      role="img"
                      aria-label={goalList[goalArr[x]].goal}
                    >
                      {goalList[goalArr[x]].emoji}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}

          {[...Array(lastRowBlankBlockSum)].map((_, i: number) => (
            <div key={i} className="rounded-lg bg-yellow-50"></div>
          ))}
        </div>
      )}

      {/* Note: goal status */}
      <div className="flex flex-col overflow-hidden rounded-lg bg-white text-center md:grid md:grid-cols-7 md:gap-2">
        <div className="flex items-center justify-center bg-yellow-200 py-2 md:col-span-1">
          <h5 className="p-2 font-bold text-yellow-600">Goal status:</h5>
        </div>

        <div className="md:col-span-6">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 px-4 py-2 md:gap-x-10 lg:gap-x-12">
            {goalArr.map((goal) => {
              return (
                <div key={goal} className="flex flex-col">
                  <ProgressDonutBar
                    percent={getPercent(achievements[goal], targets[goal])}
                    emoji={goalList[goal].emoji}
                  />

                  <p className="-mt-2 capitalize text-gray-500">
                    {goalList[goal].goal}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
