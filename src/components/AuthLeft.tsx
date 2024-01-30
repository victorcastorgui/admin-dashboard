import { styled } from "styled-components";

const ImageContainer = styled.div`
  width: 50%;
  height: 100vh;
  @media (max-width: 800px) {
    width: 30%;
  }
  @media (max-width: 600px) {
    width: 0%;
  }
`;

const Image = styled.img`
  height: 100%;
  object-fit: cover;
`;

const AuthLeft = () => {
  return (
    <ImageContainer>
      <Image
        src="/src/assets/images/auth-image.png"
        alt="a person wearing matoa watch on their left hand"
      />
    </ImageContainer>
  );
};

export default AuthLeft;
