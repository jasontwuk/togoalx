import React from "react";

type ProgressDonutBarType = {
  percent: number;
  emoji: string;
  loading: boolean;
};

function ProgressDonutBar(props: ProgressDonutBarType) {
  const { percent, emoji, loading } = props;

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
    <div className="inline-flex items-center justify-center overflow-hidden rounded-full">
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
          className="text-yellow-500"
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
        <p className="leading-3">{emoji}</p>

        <p className="text-xl text-indigo-700">
          {percent}
          <span className="text-xs">%</span>
        </p>
      </div>
    </div>
  );
}

export default ProgressDonutBar;
