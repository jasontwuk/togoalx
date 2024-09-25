import React, { useState } from "react";
import { Button } from "./Button";

import FocusTrap from "focus-trap-react";
import { RemoveScroll } from "react-remove-scroll";

import { useAuth } from "../utilities/authContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import clsx from "clsx";

type ModalProps = {
  selectedYear: number;
  selectedMonth: string;
  selectedMonthIndex: number;
  handleUpdateAchievements: (dateNum: number, achievements: number[]) => void;
  dateNum: number;
  goalList: { [key: string]: { emoji: string; goal: string } };
  goalArr: string[];
  monthAchievementData: { [key: string]: number[] };
  children: React.ReactNode;
};

export const Modal = (props: ModalProps) => {
  const {
    selectedYear,
    selectedMonth,
    selectedMonthIndex,
    handleUpdateAchievements,
    dateNum,
    goalList,
    goalArr,
    monthAchievementData,
    children,
  } = props;

  const [showModal, setShowModal] = useState(false);

  const initialCheckedAchievements = monthAchievementData[dateNum] || [];

  const [checkedAchievements, setCheckedAchievements] = useState<number[]>(
    initialCheckedAchievements || [],
  );

  const handleCheckboxChange = (goalIndex: number) => {
    setCheckedAchievements((prevCheckedAchievements) => {
      // *** Note: if the goal is already checked, remove it; otherwise, add it
      if (prevCheckedAchievements.includes(goalIndex)) {
        return prevCheckedAchievements.filter((index) => index !== goalIndex);
      } else {
        return [...prevCheckedAchievements, goalIndex];
      }
    });
  };

  const { currentUser, userDataObj, setUserDataObj } = useAuth();

  async function handleSaveAchievements(achievements: number[]) {
    const year = selectedYear;
    const month = selectedMonthIndex;
    const date = dateNum;

    try {
      const newData = { ...userDataObj };

      if (!newData?.[year]) {
        newData[year] = {};
      }

      if (!newData[year]?.[month]) {
        newData[year][month] = {};
      }

      if (!newData[year][month]?.["achievements"]) {
        newData[year][month]["achievements"] = {};
      }

      if (!newData[year][month]["achievements"]?.[date]) {
        newData[year][month]["achievements"][date] = {};
      }

      newData[year][month]["achievements"][date] = achievements;

      handleUpdateAchievements(dateNum, achievements);

      // *** update the current state
      setCheckedAchievements(newData);
      // *** update the global state
      setUserDataObj(newData);
      // *** update firebase
      const docRef = doc(db, "users", currentUser.uid);
      const res = await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              achievements: {
                [date]: achievements.sort(function (a, b) {
                  return a - b;
                }),
              },
            },
          },
          // *** Note: merge the new mood info with the current data in the firebase
        },
        { merge: true },
      );
    } catch (error) {
      console.log(
        error instanceof Error
          ? `"Failed to set data: " ${error.message}`
          : "Unknown error",
      );
    }
  }

  const handleSaveModal = () => {
    handleSaveAchievements(checkedAchievements);
    // *** Note: close modal
    setShowModal(false);
  };

  const handleOpenModal = () => {
    // *** Note: set to the initial data
    setCheckedAchievements(initialCheckedAchievements);

    // *** Note: open modal
    setShowModal(true);
  };

  const handleCancelModal = () => {
    // *** Note: reset to original data
    setCheckedAchievements(initialCheckedAchievements);
    // *** Note: close modal
    setShowModal(false);
  };

  return (
    <>
      <button
        className={clsx(
          "group flex flex-col items-center gap-2 rounded-lg border border-solid border-yellow-500 bg-white p-2 md:flex-row",

          // *** Note: transition
          "transition-all duration-200",

          // *** Note: apply gradient on hover
          "hover:bg-gradient-to-b hover:from-white hover:to-yellow-200",

          // *** Note: add shadow to emphasize transition (because transition doesn't work on gradient bg colour)
          "hover:shadow-md",

          // *** Note: focus-visible
          "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-yellow-500",
        )}
        type="button"
        onClick={handleOpenModal}
      >
        {children}
      </button>

      {showModal && (
        <FocusTrap>
          {/* Note: modal Overlay */}
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25">
            <RemoveScroll>
              {/* Note: modal Container */}
              <div className="relative z-[60] mx-2 flex w-[calc(100%-.0.25rem)] max-w-3xl flex-col rounded-lg bg-white p-4 shadow-lg md:min-w-[31rem]">
                {/* Note: header */}
                <div className="flex items-center justify-between gap-4 rounded-t border-b border-gray-200 pb-4">
                  <h3
                    id="modal-header"
                    className="flex items-center justify-center gap-2 text-lg font-bold sm:text-xl md:text-2xl"
                  >
                    <span>{dateNum}</span>
                    <span>{selectedMonth}</span>
                    <span>{selectedYear}</span>
                  </h3>

                  <button
                    className={clsx(
                      "rounded-full text-3xl leading-4 text-indigo-500 duration-200 hover:text-red-500",

                      // *** Note: focus-visible
                      "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-yellow-500",
                    )}
                    onClick={() => setShowModal(false)}
                    aria-label="Close modal"
                  >
                    <i className="fa-solid fa-circle-xmark"></i>
                  </button>
                </div>

                {/* Note: body */}
                <div
                  id="modal-body"
                  className="flex-auto py-4"
                  role="dialog"
                  aria-labelledby="modal-header"
                >
                  <fieldset className="flex flex-col items-start justify-center gap-2">
                    <h3 className="text-lg font-medium text-indigo-700">
                      What have you accomplished?
                    </h3>

                    <ul className="flex flex-wrap items-center justify-center gap-5">
                      {goalArr.map((goal, index) => {
                        return (
                          <li
                            key={goal}
                            className="relative flex shrink-0 items-center justify-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id={goal}
                              value={goalList[goal].goal}
                              className="peer absolute left-3 top-3 opacity-0"
                              required={false}
                              checked={checkedAchievements.includes(index)}
                              onChange={() => handleCheckboxChange(index)}
                            />

                            <label
                              htmlFor={goal}
                              className={clsx(
                                "z-10 inline-flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-transparent p-3 text-gray-500 duration-200 hover:bg-gradient-to-b hover:from-transparent hover:from-30% hover:to-yellow-200 hover:text-gray-600",

                                // *** Note: peer-checked
                                "peer-checked:border-indigo-500 peer-checked:text-gray-600",

                                // *** Note: peer-focus-visible
                                "peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-yellow-500",
                              )}
                            >
                              <div className="text-3xl">
                                {goalList[goal].emoji}
                              </div>

                              <div className="w-full text-lg font-semibold">
                                {goalList[goal].goal}
                              </div>

                              <p>{checkedAchievements.includes(index)}</p>
                            </label>

                            <i className="fa-solid fa-circle-check absolute left-3 top-3 text-indigo-500 opacity-0 peer-checked:opacity-100"></i>
                          </li>
                        );
                      })}
                    </ul>
                  </fieldset>
                </div>

                {/* Note: footer */}
                <div className="flex items-center justify-end rounded-b border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      className="flex items-center justify-center gap-2 px-4 py-2"
                      clickHandler={handleSaveModal}
                    >
                      <i className="fa-solid fa-check-circle text-sm"></i>
                      Save
                    </Button>

                    <Button
                      className="flex items-center justify-center gap-2 border-red-500 px-4 py-2 text-red-500 hover:bg-red-500"
                      clickHandler={handleCancelModal}
                    >
                      <i className="fa-solid fa-circle-xmark text-sm"></i>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </RemoveScroll>
          </div>
        </FocusTrap>
      )}
    </>
  );
};
