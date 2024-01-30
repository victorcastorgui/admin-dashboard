import { useNavigate } from "react-router-dom";
import * as S from "./style";

const NotFound = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/product");
  };
  return (
    <S.NotFoundContainer>
      <img src="/src/assets/images/404.png" alt="404 code" />
      <S.NotFoundMessage>Uh-Oh...</S.NotFoundMessage>
      <S.NotFoundMessage>
        The page you are looking for may have been moved, deleted, or possibly
        never existed.
      </S.NotFoundMessage>
      <S.Button onClick={handleBack}>Back</S.Button>
    </S.NotFoundContainer>
  );
};

export default NotFound;
