import React, { useState } from "react";
import FocusTrap from "focus-trap-react";
import { Button } from "./Button";

type ModalProps = {
  selectedYear: number;
  selectedMonth: string;
  dateNum: number;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = (props) => {
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
          <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto overflow-x-hidden">
            <div className="relative z-50 mx-auto flex w-full max-w-3xl flex-col">
              <div className="relative mx-2 my-6 flex min-w-80 max-w-3xl items-center justify-center">
                <div className="relative flex w-full flex-col rounded-lg border-0 bg-white p-5 shadow-lg">
                  {/* Note: header*/}
                  <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid pb-5">
                    <h3
                      id="modal-header"
                      className="flex items-center justify-center gap-2 text-3xl font-bold"
                    >
                      <span>{dateNum}</span>
                      <span>{selectedMonth}</span>
                      <span>{selectedYear}</span>
                    </h3>
                    <button
                      className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-red-500 duration-200 hover:opacity-80"
                      onClick={() => setShowModal(false)}
                      aria-label="Close modal"
                    >
                      <i className="fa-solid fa-circle-xmark"></i>
                    </button>
                  </div>

                  {/* Note: body*/}
                  <div
                    id="modal-body"
                    className="relative flex-auto py-5"
                    role="dialog"
                    aria-labelledby="modal-header"
                    aria-describedby="modal-body"
                  >
                    <p className="">contents</p>
                  </div>

                  {/* Note: footer*/}
                  <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid pt-5">
                    <div className="flex gap-2">
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
              </div>
            </div>

            <div className="fixed inset-0 z-30 bg-black opacity-25"></div>
          </div>
        </FocusTrap>
      )}
    </>
  );
};
