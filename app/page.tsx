import clsx from "clsx";
import { kalam } from "./utilities/fonts";
import { Calendar } from "./components/calendar";
import { CallToAction } from "./components/CallToAction";

export default function Home() {
  return (
    <main className="flex flex-col justify-between items-center p-4 sm:p-8 gap-4 mx-auto md:max-w-[90%]">
      <h1 className="text-4xl sm:text-5xl md:text-6xl text-center text-indigo-900 font-bold">
        Record the goals you achieve with{" "}
        <span
          className={clsx(
            kalam.className,
            "bg-gradient-to-b from-indigo-300 to-indigo-900 inline-block text-transparent bg-clip-text"
          )}
        >
          ToGoalx
        </span>{" "}
        every day.
      </h1>

      <p className="text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[80%]">
        Create your achievement record and see how much you have progressed on{" "}
        <span className="font-bold">every day</span> and{" "}
        <span className="font-bold">every month</span>.
      </p>

      <CallToAction />

      <Calendar />
    </main>
  );
}
