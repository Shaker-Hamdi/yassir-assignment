import clsx from "clsx";
import { Outlet } from "react-router-dom";

import Header from "./Header";

type Iprops = {};

const GloblaLayout: React.FC<Iprops> = () => {
  return (
    <div className="page flex-basis[100%] h-full flex-1">
      <Header />
      <main className={clsx("container mx-auto px-5")}>
        <Outlet />
      </main>
    </div>
  );
};

export default GloblaLayout;
