import LoginForm from "@/programFeatures/Auth/ui/LoginForm";
import { getRouteMain } from "@/sharedComponents/config/routeConfig/routeConfig";
import { useCallback } from "react";
import cls from "./LoginPage.module.scss";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const onSuccess = useCallback(() => {
    navigate(getRouteMain(), { replace: true })
  }, []);

  return <div className={cls.LoginPage}>
      <div className={cls.FormContent}>
        <LoginForm onSuccess={onSuccess} />
      </div>
    </div>;
}


export default LoginPage;
