import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { styled } from "styled-components";

const MainLayoutContainer = styled.div``;

const MainLayout = (): JSX.Element => {
  return (
    <MainLayoutContainer>
      <SideBar />
      <Outlet />
    </MainLayoutContainer>
  );
};

export default MainLayout;
