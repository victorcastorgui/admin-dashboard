import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import ChangeTheme from "./ChangeTheme";

const SideBarContainer = styled.div`
  width: 16.5625rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  background-color: ${(props) => props.theme.secondary};
  position: fixed;
  filter: drop-shadow(1px 4px 4px rgba(0, 0, 0, 0.25));
`;

const SideBarTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SideBarBot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BrandUnderline = styled.u`
  text-decoration-color: ${(props) => props.theme.primary};
`;
const Brand = styled.h1`
  font-size: 2rem;
  letter-spacing: 0.04rem;
  text-underline-offset: 0.6em;
  margin-top: 4rem;
  margin-bottom: 4rem;
  font-weight: 400;
  color: black;
`;

const Menu = styled.a`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: black;
  &.active {
    color: #d84727;
  }
`;

const LogoutButton = styled.button`
  width: 80%;
  border: 2px solid ${(props) => props.theme.primary};
  background: none;
  font-size: 1.5rem;
  height: 3.25rem;
  margin-bottom: 2.69rem;
  margin-top: 1.44rem;
`;

const SideBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const handleProductLink = () => {
    navigate("/product");
  };
  return (
    <SideBarContainer>
      <SideBarTop>
        <Brand>
          <BrandUnderline>Matoa Admin</BrandUnderline>
        </Brand>
        <Menu onClick={handleProductLink} className="active">
          PRODUCT
        </Menu>
        <Menu>REVENUE</Menu>
        <Menu>CATEGORIES</Menu>
      </SideBarTop>
      <SideBarBot>
        <ChangeTheme variant={"side"} />
        <LogoutButton onClick={handleLogout}>LOGOUT</LogoutButton>
      </SideBarBot>
    </SideBarContainer>
  );
};

export default SideBar;
