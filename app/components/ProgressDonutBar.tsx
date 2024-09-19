import clsx from "clsx";
import React from "react";

type ProgressDonutBarType = {
  percent: number;
  loading: boolean;
};

function ProgressDonutBar(props: ProgressDonutBarType) {
  const { percent, loading } = props;

  if (loading) {
    return (
      <div className="inline-flex items-center justify-center">
        <div
          aria-labelledby="goal-status-loading-label"
          className="flex h-20 w-20 items-center justify-center"
        >
          <i className="fa-solid fa-spinner animate-spin"></i>
          <span className="visually-hidden" id="goal-status-loading-label">
            Loading
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-flex items-center justify-center overflow-hidden rounded-full">
      <svg className="h-20 w-20 -rotate-90">
        <circle
          className="text-gray-300"
          strokeWidth="5"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />

        <circle
          className={clsx(
            percent >= 80 && "text-green-500",
            percent < 80 && percent >= 60 && "text-sky-500",
            percent < 60 && "text-red-500",
          )}
          strokeWidth="5"
          strokeDasharray={30 * 2 * Math.PI}
          strokeDashoffset={
            30 * 2 * Math.PI - (percent / 100) * (30 * 2 * Math.PI)
          }
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
      </svg>

      <div className="absolute flex flex-col">
        <p className="-mt-1 leading-3">
          {percent === 100 ? (
            <i className="fa-solid fa-star text-yellow-500"></i>
          ) : (
            <i className="fa-regular fa-star text-yellow-500"></i>
          )}
        </p>

        <p className="text-xl leading-6">
          <span
            className={clsx(
              percent >= 80 && "text-green-700",
              percent < 80 && percent >= 60 && "text-sky-700",
              percent < 60 && "text-red-700",
              "font-semibold",
            )}
          >
            {percent}
          </span>
          <span className="text-xs">%</span>
        </p>
      </div>
    </div>
  );
}

export default ProgressDonutBar;
