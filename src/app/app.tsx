import "./styles/index.scss";
import { classNames } from "@/sharedComponents/lib/classNames/classNames";
import { AppRouter } from "./providers/router";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAuthData,
  getUserInited,
  userActions,
} from "@/serviceEntities/User";
import { useEffect } from "react";
import { getRoutelogin } from "@/sharedComponents/config/routeConfig/routeConfig";
import { useNavigate } from "react-router-dom";

const App = () => {
  // const navigate = useNavigate();

  // const dispatch = useDispatch();
  // const inited = useSelector(getUserInited);
  // const authData = useSelector(getUserAuthData);

  // useEffect(() => {
  //   dispatch(userActions.initAuthData());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (inited && !authData && location.pathname !== getRoutelogin()) {
  //     navigate(getRoutelogin(), { replace: true });
  //   }
  // }, [inited, authData, location, navigate]);

  return (
      <div className={classNames("app")}>
            <AppRouter />
      </div>
  );
};

export default App;
