"use client";

import { log } from "console";
import React, { Key, useState } from "react";
import { demoData } from "../utilities/demo";

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

export const Calendar = () => {
  const now = new Date();
  const currMonthIndex = now.getMonth();
  // console.log({ currMonthIndex });

  const [selectedYear, setSelectYear] = useState(now.getFullYear());
  // console.log({ selectedYear });

  const [selectedMonth, setSelectMonth] = useState(monthsArr[currMonthIndex]);
  // console.log({ selectedMonth });

  const getSelectedMonthIndex = (month: string) => {
    return monthsArr.indexOf(month);
  };

  // *** Note: for the first row of the calendar
  const firstDateOfMonth = new Date(
    selectedYear,
    getSelectedMonthIndex(selectedMonth),
    1
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
    0
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

  return (
    <div className="flex flex-col overflow-hidden gap-2 py-4 sm:py-6 md:py-10 w-full">
      <div className="grid grid-cols-7 gap-2 text-indigo-700 font-bold text-center">
        {daysArr.map((day) => {
          return <p key={day}>{daysList[day]}</p>;
        })}
      </div>

      {/* Note: first row of the calendar */}
      <div className="grid grid-cols-7 gap-2">
        {[...Array(firstRowBlankBlockSum)].map((val, i: number) => (
          <div key={i} className="bg-yellow-50 rounded-lg"></div>
        ))}

        {[...Array(firstRowDateBlockSum)].map((val, i: number) => (
          <div
            key={i}
            className="bg-white border-yellow-500 border border-solid p-2 flex items-center gap-2 sm:justify-between rounded-lg flex-col sm:flex-row"
          >
            <p>{i + 1}</p>
            <div className="text-center">
              {demoData[i + 1].map((x: number) => (
                <span key={x} role="img" aria-label={goalList[goalArr[x]].goal}>
                  {goalList[goalArr[x]].emoji}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Note: middle rows of the calendar */}
      {Object.keys([...Array(sevenBlockRows)]).map((val, i: number) => {
        const rowBaseNum = 7 * i;

        return (
          <div key={i} className="grid grid-cols-7 gap-2">
            {Object.keys([...Array(7)]).map((val, x: number) => {
              const goalIndex = x + 1;
              const dateNum = rowBaseNum + goalIndex + firstRowDateBlockSum;

              return (
                <div
                  key={goalIndex}
                  className="bg-white border-yellow-500 border border-solid p-2 flex items-center gap-2 sm:justify-between rounded-lg flex-col sm:flex-row"
                >
                  <p>{dateNum}</p>
                  <div className="text-center">
                    {demoData[dateNum].map((y: number) => (
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
      {lastRowDateBlockSum && (
        <div className="grid grid-cols-7 gap-2">
          {[...Array(lastRowDateBlockSum)].map((val, i: number) => {
            const dateNum = firstRowDateBlockSum + sevenBlockRows * 7 + i + 1;

            return (
              <div
                key={i}
                className="bg-white border-yellow-500 border border-solid p-2 flex items-center gap-2 sm:justify-between rounded-lg flex-col sm:flex-row"
              >
                <p>{dateNum}</p>
                <div className="text-center">
                  {demoData[dateNum].map((x: number) => (
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

          {[...Array(lastRowBlankBlockSum)].map((val, i: number) => (
            <div key={i} className="bg-yellow-50 rounded-lg"></div>
          ))}
        </div>
      )}
    </div>
  );
};
