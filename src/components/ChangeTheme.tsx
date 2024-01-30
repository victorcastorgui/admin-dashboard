import { useDispatch } from "react-redux";
import styled from "styled-components";
import { toggleTheme } from "../stores/themeSlice";
const ChangeThemeContainer = styled.div`
  display: flex;
  margin-right: 2.25rem;
  border-radius: 0.5rem;
  border: 1px solid #000;
  width: 2.5rem;
  padding: 0.5rem;
  float: right;
  background-color: white;
  &.classic {
    margin-top: 5rem;
  }
  &.side {
    margin-right: 0;
  }
`;

const ChangeTheme = ({ variant }: { variant: string }) => {
  const dispatch = useDispatch();
  return (
    <ChangeThemeContainer
      onClick={() => dispatch(toggleTheme())}
      className={variant}
    >
      <img src="/src/assets/icons/theme.svg" alt="change theme icon" />
    </ChangeThemeContainer>
  );
};

export default ChangeTheme;
