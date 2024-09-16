import clsx from "clsx";
import { kalam } from "./utilities/fonts";
import { Calendar } from "./components/Calendar";
import { CallToAction } from "./components/CallToAction";
import { demoData } from "./utilities/demo";

export default function Home() {
  return (
    <main className="mx-auto flex flex-col items-center justify-between gap-4 p-4 sm:p-8">
      <h1 className="text-center text-4xl font-bold text-indigo-900 sm:text-5xl md:text-6xl">
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

      <p className="mx-auto w-full max-w-[80%] text-center text-lg sm:text-xl md:text-2xl">
        Create your achievement record and see how much you have progressed on{" "}
        <span className="font-bold">every day</span> and{" "}
        <span className="font-bold">every month</span>.
      </p>

      <CallToAction />

      <Calendar data={demoData} />
    </main>
  );
}
