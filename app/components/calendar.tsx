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

const goalList = ["💰", "💪", "🥦", "🧘", "🧹"];

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

  const firstRowBlankBlockNum = getFirstRowBlankBlocks(firstDayOfMonth);
  // console.log("firstRowBlankBlocks: ", firstRowBlankBlocks);

  const firstRowDays = 7 - firstRowBlankBlockNum;

  const lastDateOfMonth = new Date(
    selectedYear,
    getSelectedMonthIndex(selectedMonth) + 1,
    0
  );
  // console.log({ lastDateOfMonth });

  const daysInMonth = lastDateOfMonth.getDate();
  // console.log({ daysInMonth });

  const sevenBlockRows = Math.floor((daysInMonth - firstRowDays) / 7);
  // console.log({ sevenBlockRows });

  const lastRowDateBlockNum = (daysInMonth - firstRowDays) % 7;
  console.log({ lastRowDateBlockNum });

  const getLastRowBlankBlocks = (n: number) => {
    return 7 - n;
  };

  const lastRowBlankBlockNum = getLastRowBlankBlocks(lastRowDateBlockNum);
  console.log({ lastRowBlankBlockNum });

  return (
    <div className="flex flex-col overflow-hidden gap-2 py-4 sm:py-6 md:py-10 w-full">
      <div className="grid grid-cols-7 gap-2 text-indigo-700 font-bold">
        {daysArr.map((day) => {
          return <p key={day}>{daysList[day]}</p>;
        })}
      </div>

      {/* Note: first row of the calendar */}
      <div className="grid grid-cols-7 gap-2">
        {[...Array(firstRowBlankBlockNum)].map((val, i: number) => (
          <div key={i} className="bg-yellow-50 rounded-lg"></div>
        ))}

        {[...Array(firstRowDays)].map((val, i: number) => (
          <div
            key={i}
            className="bg-white border-yellow-500 border border-solid p-2 flex items-center gap-2 sm:justify-between rounded-lg flex-col sm:flex-row"
          >
            <p>{i + 1}</p>
            <div className="text-center">
              {demoData[i + 1].map((x: number) => goalList[x])}
            </div>
          </div>
        ))}
      </div>

      {/* Note: all seven block rows of the calendar */}
      {Object.keys([...Array(sevenBlockRows)]).map((val, i: number) => {
        const rowBaseNum = 7 * i;

        return (
          <div key={i} className="grid grid-cols-7 gap-2">
            {Object.keys([...Array(7)]).map((val, x: number) => {
              const goalIndex = x + 1;
              const dateNum = rowBaseNum + goalIndex + firstRowDays;

              return (
                <div
                  key={goalIndex}
                  className="bg-white border-yellow-500 border border-solid p-2 flex items-center gap-2 sm:justify-between rounded-lg flex-col sm:flex-row"
                >
                  <p>{dateNum}</p>
                  <div className="text-center">
                    {demoData[dateNum].map((y: number) => goalList[y])}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      {/* Note: last row of the calendar */}
      {firstRowBlankBlockNum && (
        <div className="grid grid-cols-7 gap-2">
          {[...Array(lastRowDateBlockNum)].map((val, i: number) => {
            const dateNum = firstRowDays + sevenBlockRows * 7 + i + 1;

            return (
              <div
                key={i}
                className="bg-white border-yellow-500 border border-solid p-2 flex items-center gap-2 sm:justify-between rounded-lg flex-col sm:flex-row"
              >
                <p>{dateNum}</p>
                <div className="text-center">
                  {demoData[dateNum].map((x: number) => goalList[x])}
                </div>
              </div>
            );
          })}

          {[...Array(firstRowBlankBlockNum)].map((val, i: number) => (
            <div key={i} className="bg-yellow-50 rounded-lg"></div>
          ))}
        </div>
      )}
    </div>
  );
};
