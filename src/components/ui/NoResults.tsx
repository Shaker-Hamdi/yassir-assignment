import clsx from "clsx";

import Icon from "./Icon";

type Iprops = {};

const NoResults: React.FC<Iprops> = () => {
  return (
    <div
      className={clsx(
        "mt-10 flex w-full items-center justify-center rounded-xl bg-pink-100 p-10 text-center text-pink-600",
      )}
    >
      <h4 className={clsx("flex flex-col")}>
        <Icon iconName="report" className={clsx("mb-3 text-[50px]")} />
        <span>Nor Results Found!</span>
      </h4>
    </div>
  );
};

export default NoResults;
