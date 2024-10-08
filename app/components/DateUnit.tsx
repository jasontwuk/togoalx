"use client";

import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Modal } from "./Modal";

type DateUnitProps = {
  currentYear: number;
  selectedYear: number;
  currentMonth: string;
  selectedMonth: string;
  selectedMonthIndex: number;
  dateNum: number;
  currentDate: number;
  monthAchievementData: { [key: string]: number[] };
  goalList: { [key: string]: { emoji: string; goal: string } };
  goalArr: string[];
  handleUpdateAchievements: (dateNum: number, achievements: number[]) => void;
  demo?: boolean;
};

const DateUnitContents = (props: DateUnitProps) => {
  const {
    currentYear,
    selectedYear,
    currentMonth,
    selectedMonth,
    // *** Note: selectedMonthIndex is needed for Modal component
    selectedMonthIndex,
    dateNum,
    currentDate,
    monthAchievementData,
    goalList,
    goalArr,
    // *** Note: handleUpdateAchievements is needed for Modal component
    handleUpdateAchievements,
  } = props;

  const [localAchievements, setLocalAchievements] = useState(
    monthAchievementData[dateNum] || [],
  );

  useEffect(() => {
    setLocalAchievements(monthAchievementData[dateNum] || []);
  }, [monthAchievementData, dateNum]);

  return (
    <>
      <h4
        className={clsx(
          currentYear === selectedYear &&
            currentMonth === selectedMonth &&
            dateNum === currentDate
            ? "bg-yellow-500 text-white"
            : "bg-gray-100",
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-gray-500 group-hover:bg-yellow-500 group-hover:text-white group-hover:shadow",
        )}
      >
        {dateNum}
      </h4>

      <div className="flex flex-wrap justify-center gap-1 text-center md:justify-start">
        {localAchievements &&
          localAchievements.map((x: number) =>
            goalList[goalArr[x]] ? (
              <span key={x} role="img" aria-label={goalList[goalArr[x]].goal}>
                {goalList[goalArr[x]].emoji}
              </span>
            ) : null,
          )}
      </div>
    </>
  );
};

export const DateUnit = (props: DateUnitProps) => {
  const {
    demo,
    ...restProps // Spread the remaining props to pass them down
  } = props;

  return demo ? (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-solid border-yellow-500 bg-white p-2 md:flex-row">
      <DateUnitContents {...restProps} />
    </div>
  ) : (
    <Modal {...restProps}>
      <DateUnitContents {...restProps} />
    </Modal>
  );
};
