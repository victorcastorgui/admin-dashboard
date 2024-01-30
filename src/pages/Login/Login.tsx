import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AuthLeft from "../../components/AuthLeft";
import ChangeTheme from "../../components/ChangeTheme";
import { API_URL } from "../../config";
import { useFetch } from "../../hooks/useFetch";
import { UserData } from "../../types/types";
import * as S from "./style";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data, fetchData } = useFetch<UserData[]>();
  const [showError, setShowError] = useState(false);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setPassword(e.target.value);
  };

  const URL = `${API_URL}/users`;
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const rand = function () {
    return Math.random().toString(36).substr(2);
  };

  const token = function () {
    return rand() + rand();
  };

  useEffect(() => {
    fetchData(URL, options);
  }, []);

  const handleSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      data?.find((user) => user.email !== email && user.password !== password)
    ) {
      setShowError(true);
      return;
    }

    setEmail("");
    setPassword("");
    localStorage.setItem("token", token());
    navigate("/product");
  };

  const navigate = useNavigate();
  const handleChangeSignUp = () => {
    navigate("/auth/signup");
  };
  return (
    <S.AuthContainer>
      <AuthLeft />
      <S.AuthContent>
        <S.LogoContainer>
          <S.Logo src="/src/assets/logo/matoa.svg" alt="Matoa logo" />
        </S.LogoContainer>
        <S.FormContent>
          <S.LoginFormHeader>Log In</S.LoginFormHeader>
          <S.LoginForm onSubmit={handleSubmitLogin}>
            <S.FormItem>
              <S.FormLabel>
                Email
                <S.FormInput
                  onChange={handleChangeEmail}
                  value={email}
                  type="email"
                  placeholder="Your email here..."
                  id="email"
                  required
                ></S.FormInput>
              </S.FormLabel>
              {showError ? (
                <S.FormError>Email or Password is Wrong!</S.FormError>
              ) : (
                <S.FormError></S.FormError>
              )}
            </S.FormItem>
            <S.FormItem>
              <S.FormLabel>
                Password
                <S.FormInput
                  onChange={handleChangePassword}
                  value={password}
                  type="password"
                  id="password"
                  placeholder="Your password here..."
                  required
                ></S.FormInput>
              </S.FormLabel>
              {showError ? (
                <S.FormError>Email or Password is Wrong!</S.FormError>
              ) : (
                <S.FormError></S.FormError>
              )}
            </S.FormItem>
            <S.SubmitForm type="submit" value="Log In"></S.SubmitForm>
          </S.LoginForm>
          <S.HaveAccount>
            Have an account?{" "}
            <S.SignUpAnchor onClick={handleChangeSignUp}>
              Sign Up
            </S.SignUpAnchor>
          </S.HaveAccount>
        </S.FormContent>
        <ChangeTheme variant={"classic"} />
      </S.AuthContent>
    </S.AuthContainer>
  );
};

export default Login;
