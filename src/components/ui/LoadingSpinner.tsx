import clsx from "clsx";

type Iprops = {};

const LoadingSpinner: React.FC<Iprops> = () => {
  return (
    <div className={clsx("absolute top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center")}>
      <div className={clsx("animation-duration[.3s] h-10 w-10 animate-spin rounded-full border-2 border-t-2 border-gray-300 border-t-green-700")}></div>
      <p className={clsx("mt-0.5 text-xs text-gray-500")}>Loading ...</p>
    </div>
  );
};

export default LoadingSpinner;