import clsx from "clsx";
import { kalam } from "./utilities/fonts";
import { Calendar } from "./components/Calendarx";
import { CallToAction } from "./components/CallToAction";
import { Main } from "./components/Mainx";

export default function Home() {
  return (
    <Main>
      <h1 className="px-4 text-center text-4xl font-bold text-indigo-900 sm:px-8 sm:text-5xl md:text-6xl">
        Record the goals you achieve with{" "}
        <span
          className={clsx(
            kalam.className,
            "inline-block bg-gradient-to-b from-indigo-300 to-indigo-900 bg-clip-text text-transparent",
          )}
        >
          ToGoalx
        </span>{" "}
        every day.
      </h1>

      <p className="mx-auto w-full px-4 text-center text-lg sm:px-8 sm:text-xl md:max-w-[80%] md:text-2xl">
        Create your achievement record and see how much you have progressed on{" "}
        <span className="font-bold">every day</span> and{" "}
        <span className="font-bold">every month</span>.
      </p>

      <CallToAction />

      <Calendar demo />
    </Main>
  );
}
