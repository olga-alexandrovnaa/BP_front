import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { routeConfig } from "@/sharedComponents/config/routeConfig/routeConfig";

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {Object.values(routeConfig).map(({ element, path }) => (
          <Route key={path} path={path} element={element}></Route>
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
