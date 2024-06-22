import React from "react";
import { Outlet} from "react-router-dom";
import Header from "./Header";


const MainLayout = () => {
  return (
    <div>
      <div
        className={`h-screen flex flex-col min-w-0 flex-1 overflow-y-hidden overflow-x-hidden`}
      >
        <Header />
          <div className="h-[calc(100vh-4rem)] overflow-y-auto bg-lightBackgroundDefault w-full px-6 py-8">
            <Outlet />
          </div>
      </div>
    </div>
  );
};

export default MainLayout;
