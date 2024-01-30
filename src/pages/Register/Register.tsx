import { useState } from "react";
import { useNavigate } from "react-router";
import AuthLeft from "../../components/AuthLeft";
import ChangeTheme from "../../components/ChangeTheme";
import { API_URL } from "../../config";
import { useFetch } from "../../hooks/useFetch";
import * as S from "./style";

const Register = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [diffPassword, setDiffPassword] = useState(false);
  const [showNameError, setShowNameError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const { fetchData } = useFetch();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value.length < 3 ||
      !e.target.value.includes("@") ||
      !e.target.value.includes(".com")
    ) {
      setShowEmailError(true);
    } else {
      setShowEmailError(false);
    }
    return setEmail(e.target.value);
  };

  const handleChangeFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 5) {
      setShowNameError(true);
    } else {
      setShowNameError(false);
    }
    return setFullName(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setPassword(e.target.value);
  };
  const handleChangeConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    return setConfirmPassword(e.target.value);
  };

  const URL = `${API_URL}/users`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullname: fullName,
      email: email,
      password: password,
    }),
  };

  const handleSubmitRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setDiffPassword(true);
      return;
    }

    fetchData(URL, options);

    setEmail("");
    setFullName("");
    setPassword("");
    setConfirmPassword("");
    navigate("/auth/login");
  };

  const navigate = useNavigate();

  const handleChangeLogin = () => {
    navigate("/auth/login");
  };

  return (
    <S.AuthContainer>
      <AuthLeft />
      <S.AuthContent>
        <S.LogoContainer>
          <S.Logo src="/src/assets/logo/matoa.svg" alt="Matoa logo" />
        </S.LogoContainer>
        <S.FormContent>
          <S.SignUpFormHeader>Sign Up</S.SignUpFormHeader>
          <S.SignUpForm onSubmit={handleSubmitRegister}>
            <S.FormItem>
              <S.FormLabel>
                Full Name
                <S.FormInput
                  onChange={handleChangeFullName}
                  value={fullName}
                  type="text"
                  placeholder="Your full name here..."
                ></S.FormInput>
              </S.FormLabel>
              {showNameError ? (
                <S.FormError>Name is required!</S.FormError>
              ) : (
                <S.FormError></S.FormError>
              )}
            </S.FormItem>
            <S.FormItem>
              <S.FormLabel>
                Email
                <S.FormInput
                  onChange={handleChangeEmail}
                  value={email}
                  type="email"
                  placeholder="Your email here..."
                  required
                ></S.FormInput>
              </S.FormLabel>
              {showEmailError ? (
                <S.FormError>Email is required!</S.FormError>
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
                  placeholder="Your password here..."
                  required
                ></S.FormInput>
              </S.FormLabel>
              {diffPassword ? (
                <S.FormError>Password is not the same!</S.FormError>
              ) : (
                <S.FormError></S.FormError>
              )}
            </S.FormItem>
            <S.FormItem>
              <S.FormLabel>
                Confirm Password
                <S.FormInput
                  onChange={handleChangeConfirmPassword}
                  value={confirmPassword}
                  type="password"
                  placeholder="Re-enter password here..."
                  required
                ></S.FormInput>
              </S.FormLabel>
              {diffPassword ? (
                <S.FormError>Password is not the same!</S.FormError>
              ) : (
                <S.FormError></S.FormError>
              )}
            </S.FormItem>
            <S.SubmitForm type="submit" value="Log In"></S.SubmitForm>
          </S.SignUpForm>
          <S.HaveAccount>
            Have an account?{" "}
            <S.LoginAnchor onClick={handleChangeLogin}>
              Log In here
            </S.LoginAnchor>
          </S.HaveAccount>
        </S.FormContent>
        <ChangeTheme variant={"none"} />
      </S.AuthContent>
    </S.AuthContainer>
  );
};

export default Register;
