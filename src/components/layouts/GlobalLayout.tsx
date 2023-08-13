import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";

type Iprops = {};

const GloblaLayout: React.FC<Iprops> = () => {
  return (
    <div className="page flex-basis[100%] h-full flex-1">
      <Header />
      <main className="relative z-50 flex-1 overflow-y-auto p-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default GloblaLayout;
