"use client";

import React, { useEffect, useState, useMemo } from "react";
import ProgressDonutBar from "./ProgressDonutBar";
import { Button } from "./Button";
import clsx from "clsx";

import { demoData } from "../utilities/demo";

import { useAuth } from "../utilities/authContext";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";

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

type MonthlyGoalDataType = { [key: string]: number };
let initialMonthlyGoalData: MonthlyGoalDataType = {};
goalArr.map((goal) => {
  initialMonthlyGoalData[goal] = 0;
});
// console.log({ initialMonthlyGoalData });

type CalendarProps = {
  demo?: boolean;
};
export const Calendar = (props: CalendarProps) => {
  const { demo } = props;

  const now = new Date();
  const currentYear = now.getFullYear();

  const currMonthIndex = now.getMonth();
  // console.log({ currMonthIndex });
  const currentMonth = monthsArr[currMonthIndex];

  const currentDate = now.getDate();

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

  // *** Note: update goal targets
  const [targets, setTargets] = useState<MonthlyGoalDataType>(
    initialMonthlyGoalData,
  );
  const [monthTargetData, setMonthTargetData] = useState<MonthlyGoalDataType>(
    initialMonthlyGoalData,
  );

  const [loading, setLoading] = useState(true);

  const [isUpdateTargets, setIsUpdateTargets] = useState(true);
  const updateTargets =
    (key: keyof MonthlyGoalDataType) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTargets((prevTargets) => ({
        ...prevTargets,
        [key]: Number(e.target.value),
      }));
    };

  const { currentUser, userDataObj, setUserDataObj } = useAuth();

  async function handleSaveEditTargets(targets: MonthlyGoalDataType) {
    const year = selectedYear;
    const month = selectedMonthIndex;

    try {
      const newData = { ...userDataObj };

      if (!newData?.[year]) {
        newData[year] = {};
      }

      newData[year][month] = targets;
      // console.log({ newData });

      // *** update the current state
      setTargets(newData);
      // *** update the global state
      setUserDataObj(newData);
      // *** update firebase
      const docRef = doc(db, "users", currentUser.uid);
      const res = await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              targets: targets,
            },
          },
          // *** Note: merge the new mood info with the current data in the firebase
        },
        { merge: true },
      );

      setIsUpdateTargets(true);
    } catch (error) {
      console.log(
        error instanceof Error
          ? `"Failed to set data: " ${error.message}`
          : "Unknown error",
      );
    }
  }

  const handleCancelUpdateTargets = () => {
    setIsUpdateTargets(true);
    setTargets(monthTargetData);
  };

  useEffect(() => {
    if (currentUser) {
      const authStateChanged = onAuthStateChanged(auth, async (user) => {
        if (user) {
          // *** Note: user is signed in
          const userDoc = await getDoc(doc(db, "users", user.uid));

          if (userDoc.exists()) {
            const userData = userDoc.data();

            const monthData =
              userData &&
              userData[selectedYear] &&
              userData[selectedYear][selectedMonthIndex] &&
              userData[selectedYear][selectedMonthIndex]["targets"];

            const newMonthData = { ...initialMonthlyGoalData };

            const mergedMonthData = Object.assign(newMonthData, monthData);

            if (demo) {
              setMonthTargetData(demoData[2024][8]["targets"]);
              setTargets(demoData[2024][8]["targets"]);
            } else {
              setMonthTargetData(mergedMonthData);
              setTargets(mergedMonthData);
            }

            setLoading(false);
          } else {
            console.log("No such document!");
          }
        } else {
          // *** Note: user is signed out
          console.log("User is not signed in");
        }
      });

      return () => authStateChanged();
    } else {
      if (demo) {
        setMonthTargetData(demoData[2024][8]["targets"]);
        setTargets(demoData[2024][8]["targets"]);
        setLoading(false);
      }
    }
    // *** Note: add "isUpdateTargets" in dependency, because we want to show the new goal targets when users click the "Save" button
  }, [currentUser, selectedYear, selectedMonthIndex, isUpdateTargets, demo]);
  // console.log({ targets });

  // *** Note: handle display day achievements (get monthly data from "Firebase" or local "demo.ts")
  type MonthAchievementDataType = { [key: string]: number[] };
  let initialMonthAchievementData: MonthAchievementDataType = useMemo(() => {
    return {};
  }, []);
  [...Array(daysInMonth)].map((_, i) => {
    initialMonthAchievementData[i + 1] = [];
  });
  // console.log({ initialMonthAchievementData });

  const [monthAchievementData, setMonthAchievementData] =
    useState<MonthAchievementDataType>(initialMonthAchievementData);

  useEffect(() => {
    if (currentUser) {
      const authStateChanged = onAuthStateChanged(auth, async (user) => {
        if (user) {
          // *** Note: user is signed in
          const userDoc = await getDoc(doc(db, "users", user.uid));

          if (userDoc.exists()) {
            const userData = userDoc.data();

            const monthData =
              userData[selectedYear] &&
              userData[selectedYear][selectedMonthIndex] &&
              userData[selectedYear][selectedMonthIndex]["achievements"];

            const newMonthData = { ...initialMonthAchievementData };

            const mergedMonthData = Object.assign(newMonthData, monthData);
            // console.log({ mergedMonthData });

            if (demo) {
              setMonthAchievementData(demoData[2024][8]["achievements"]);
            } else {
              setMonthAchievementData(mergedMonthData);
            }
          } else {
            console.log("No such document!");
          }
        } else {
          // *** Note: user is signed out
          console.log("User is not signed in");
        }
      });

      return () => authStateChanged();
    } else {
      if (demo) {
        setMonthAchievementData(demoData[2024][8]["achievements"]);
      }
    }
  }, [
    demo,
    currentUser,
    selectedYear,
    selectedMonthIndex,
    initialMonthAchievementData,
  ]);

  // *** Note: update sum of goal achievements
  const [sumAchievement, setSumAchievement] = useState<MonthlyGoalDataType>(
    initialMonthlyGoalData,
  );

  useEffect(() => {
    const newSumAchievement: MonthlyGoalDataType = {};

    goalArr.map((goal: string) => {
      let sum = 0;
      const goalIndex = goalArr.findIndex((item: string) => item === goal);
      // console.log({ goalIndex });
      const dataLength = Object.keys(monthAchievementData).length;
      // console.log({ dataLength });

      [...Array(dataLength)].map((_, i) => {
        // Note: the data for the first day of the month is stored under "1" (key name) in the month data object
        monthAchievementData[i + 1].map((item) => {
          if (item === goalIndex) {
            sum++;
          }
        });
      });
      // console.log(goal, ": ", sum);

      newSumAchievement[goal] = sum;
    });

    setSumAchievement(newSumAchievement);
  }, [monthAchievementData]);

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
    <div className="flex w-full flex-col gap-4 overflow-hidden py-4 sm:gap-6 sm:py-6 md:gap-10 md:py-10">
      {/* Note: goal status */}
      {!demo && (
        <div className="flex flex-col gap-2 overflow-hidden rounded-lg bg-white text-center md:grid md:grid-cols-7">
          <div className="flex items-center justify-center bg-indigo-200 py-2 md:col-span-1">
            <h5 className="p-2 font-bold text-indigo-600">Status:</h5>
          </div>

          <div className="flex flex-col gap-4 py-3 md:col-span-6">
            <div className="flex flex-wrap justify-center gap-2 px-3 md:pl-0">
              {goalArr.map((goal) => {
                return (
                  <div
                    key={goal}
                    className="flex w-[calc(20%-0.5rem)] min-w-24 shrink-0 flex-col items-center"
                  >
                    <p className="">{goalList[goal].emoji}</p>

                    <ProgressDonutBar
                      percent={
                        targets[goal] >= 0
                          ? getPercent(sumAchievement[goal], targets[goal])
                          : 0
                      }
                      loading={loading} // Pass loading state to ProgressDonutBar
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex w-full px-3 md:mx-auto md:w-fit">
              <div className="flex w-full flex-col items-center justify-center gap-2 rounded-md bg-gray-100 px-4 py-2">
                <p className="flex flex-wrap items-center justify-center gap-1 text-xs">
                  <span>100%:</span>
                  <span aria-labelledby="status-note-star-label">
                    <i className="fa-solid fa-star text-yellow-500"></i>
                    <em className="visually-hidden" id="status-note-star-label">
                      Gold star
                    </em>
                  </span>
                </p>

                <ul className="flex items-center justify-center gap-6 text-xs">
                  <li className="flex flex-wrap items-center justify-center gap-1">
                    <span>100% - 80%:</span>
                    <span className="rounded-md bg-green-500 px-1 text-white">
                      green
                    </span>
                  </li>

                  <li className="flex flex-wrap items-center justify-center gap-1">
                    <span>79% - 60%:</span>
                    <span className="rounded-md bg-sky-500 px-1 text-white">
                      blue
                    </span>
                  </li>

                  <li className="flex flex-wrap items-center justify-center gap-1">
                    <span>59% - 0%:</span>
                    <span className="rounded-md bg-red-500 px-1 text-white">
                      red
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {/* Note: month/year and control buttons */}
        <div className="flex items-center justify-center">
          {!demo && (
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
          )}

          <div className="flex items-center justify-center gap-2">
            <h2 className="text-center text-xl font-bold">
              {selectedMonth} {selectedYear}
            </h2>

            {/* Note: hide the "back to current month" button when in the current month */}
            {(currentYear !== selectedYear ||
              currentMonth !== selectedMonth) && (
              <button
                onClick={handleBackToCurrentMonth}
                className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-400 text-xl text-white duration-200 hover:opacity-60"
                aria-labelledby="back-to-current-month-label"
              >
                <i className="fa-solid fa-arrow-rotate-right text-xs"></i>
                <span
                  className="visually-hidden"
                  id="back-to-current-month-label"
                >
                  Back to current month
                </span>
              </button>
            )}

            {demo && (
              <span className="rounded-md bg-yellow-500 px-1 font-bold text-white">
                Demo
              </span>
            )}
          </div>

          {!demo && (
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
          )}
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
              <h4
                className={clsx(
                  currentYear === selectedYear &&
                    currentMonth === selectedMonth &&
                    i + 1 === currentDate
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-100",
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-gray-500",
                )}
              >
                {i + 1}
              </h4>

              <div className="flex flex-wrap justify-center gap-1 text-center md:justify-start">
                {monthAchievementData[i + 1].map(
                  (x: number) =>
                    goalList[goalArr[x]] && (
                      <span
                        key={x}
                        role="img"
                        aria-label={goalList[goalArr[x]].goal}
                      >
                        {goalList[goalArr[x]].emoji}
                      </span>
                    ),
                )}
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
                    <h4
                      className={clsx(
                        currentYear === selectedYear &&
                          currentMonth === selectedMonth &&
                          dateNum === currentDate
                          ? "bg-yellow-500 text-white"
                          : "bg-gray-100",
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-gray-500",
                      )}
                    >
                      {dateNum}
                    </h4>

                    <div className="flex flex-wrap justify-center gap-1 text-center md:justify-start">
                      {monthAchievementData[dateNum].map((y: number) => (
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
                  <h4
                    className={clsx(
                      currentYear === selectedYear &&
                        currentMonth === selectedMonth &&
                        dateNum === currentDate
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-100",
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-gray-500",
                    )}
                  >
                    {dateNum}
                  </h4>

                  <div className="flex flex-wrap justify-center gap-1 text-center md:justify-start">
                    {monthAchievementData[dateNum] &&
                      monthAchievementData[dateNum].map((x: number) => (
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
      </div>

      {/* Note: goal names */}
      <div className="flex flex-col gap-2 overflow-hidden rounded-lg bg-white text-center md:grid md:grid-cols-7">
        <div className="flex items-center justify-center bg-yellow-200 py-2 md:col-span-1">
          <h5 className="p-2 font-bold text-yellow-600">Goals:</h5>
        </div>

        <div className="md:col-span-6">
          <div className="flex flex-wrap justify-center gap-2 p-3 md:pl-0">
            {goalArr.map((goal) => {
              return (
                <p
                  key={goal}
                  className="flex w-[calc(20%-0.5rem)] min-w-24 shrink-0 flex-col items-center"
                >
                  <span>{goalList[goal].emoji}</span>

                  <span className="capitalize text-gray-500">
                    {goalList[goal].goal}
                  </span>
                </p>
              );
            })}
          </div>
        </div>
      </div>

      {/* Note: goal targets */}
      {!demo && (
        <div className="flex flex-col gap-2 overflow-hidden rounded-lg bg-white text-center md:grid md:grid-cols-7">
          <div className="flex items-center justify-center bg-teal-200 py-2 md:col-span-1">
            <h5 className="p-2 font-bold text-teal-600">Targets:</h5>
          </div>

          <div className="md:col-span-6">
            <div className="flex flex-wrap justify-center gap-2 p-3 md:pl-0">
              {goalArr.map((goal) => (
                <div
                  className={clsx(
                    isUpdateTargets &&
                      "h-[2.375rem] rounded-md bg-teal-50 md:h-[2.625rem]",
                    "relative flex w-[calc(20%-0.5rem)] min-w-24 items-center justify-center",
                  )}
                  key={goal}
                >
                  {isUpdateTargets ? (
                    // *** 2.5625 = (40 + 1) / 16
                    // *** 0.5625 = (8 + 1) / 16
                    <p
                      className="flex items-center justify-center gap-2 p-2"
                      key={goal}
                    >
                      <span>{goalList[goal].emoji}</span>

                      {targets[goal] >= 0 ? (
                        <span>{targets[goal]}</span>
                      ) : (
                        <span aria-labelledby="goal-target-loading-label">
                          <i className="fa-solid fa-spinner animate-spin"></i>
                          <em
                            className="visually-hidden"
                            id="goal-target-loading-label"
                          >
                            Loading
                          </em>
                        </span>
                      )}
                    </p>
                  ) : (
                    <div className="flex w-full items-center justify-center gap-1">
                      <span className="">{goalList[goal].emoji}</span>

                      <input
                        type="number"
                        value={targets[goal] >= 0 ? targets[goal] : "loading"}
                        min="0"
                        max={daysInMonth}
                        onChange={updateTargets(goal)}
                        className="w-full rounded-md border p-2"
                      />
                    </div>
                  )}
                </div>
              ))}

              <div className="flex w-full flex-col items-center justify-center gap-6">
                {isUpdateTargets ? (
                  <Button
                    className="flex items-center justify-center gap-2 px-4 py-2"
                    clickHandler={() => setIsUpdateTargets(false)}
                  >
                    <i className="fa-solid fa-pen text-sm"></i>
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      className="flex items-center justify-center gap-2 px-4 py-2"
                      clickHandler={() => handleSaveEditTargets(targets)}
                    >
                      <i className="fa-solid fa-check-circle text-sm"></i>
                      Save
                    </Button>

                    <Button
                      className="flex items-center justify-center gap-2 border-red-500 px-4 py-2 text-red-500 hover:bg-red-500"
                      clickHandler={handleCancelUpdateTargets}
                    >
                      <i className="fa-solid fa-circle-xmark text-sm"></i>
                      Cancel
                    </Button>
                  </div>
                )}

                <p className="flex w-full items-center justify-center rounded-md bg-gray-100 px-3 py-2 text-sm md:w-fit">
                  The maximum goal target is the number of days of the current
                  month.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Note: goal sums */}
      {!demo && (
        <div className="flex flex-col gap-2 overflow-hidden rounded-lg bg-white text-center md:grid md:grid-cols-7">
          <div className="flex items-center justify-center bg-purple-200 py-2 md:col-span-1">
            <h5 className="p-2 font-bold text-purple-600">Sums:</h5>
          </div>

          <div className="md:col-span-6">
            <div className="flex flex-wrap justify-center gap-2 p-3 md:pl-0">
              {goalArr.map((goal) => (
                <p
                  className="flex w-[calc(20%-0.5rem)] min-w-24 shrink-0 flex-col items-center rounded-md bg-purple-50 p-2"
                  key={goal}
                >
                  {goalList[goal].emoji} {sumAchievement[goal]}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
