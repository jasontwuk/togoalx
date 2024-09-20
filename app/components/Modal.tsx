import React, { useState } from "react";
import { Button } from "./Button";

import FocusTrap from "focus-trap-react";
import { RemoveScroll } from "react-remove-scroll";

type ModalProps = {
  selectedYear: number;
  selectedMonth: string;
  dateNum: number;
  children: React.ReactNode;
};

export const Modal = (props: ModalProps) => {
  const { selectedYear, selectedMonth, dateNum, children } = props;

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="hover:border-amber-00 group flex flex-col items-center gap-2 rounded-lg border border-solid border-yellow-500 bg-white bg-gradient-to-b p-2 duration-200 hover:from-white hover:to-yellow-200 md:flex-row"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {children}
      </button>

      {showModal && (
        <FocusTrap>
          {/* Note: modal Overlay */}
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25">
            <RemoveScroll>
              {/* Note: modal Container */}
              <div className="relative z-[60] mx-2 flex w-[calc(100%-.0.25rem)] max-w-3xl flex-col rounded-lg bg-white p-4 shadow-lg">
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
                    className="text-3xl leading-4 text-indigo-500 duration-200 hover:text-red-500"
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
                  <p>Contents</p>
                </div>

                {/* Note: footer */}
                <div className="flex items-center justify-end rounded-b border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      className="flex items-center justify-center gap-2 px-4 py-2"
                      clickHandler={() => setShowModal(false)}
                    >
                      <i className="fa-solid fa-check-circle text-sm"></i>
                      Save
                    </Button>

                    <Button
                      className="flex items-center justify-center gap-2 border-red-500 px-4 py-2 text-red-500 hover:bg-red-500"
                      clickHandler={() => setShowModal(false)}
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
