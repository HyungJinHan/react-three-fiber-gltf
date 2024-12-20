import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBar = styled.div`
  background-color: transparent;
  position: absolute;
  top: 2.5%;
  z-index: 100;
  width: 100%;
`;

const NavLinkWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
`;

const NavLink = styled(Link)`
  font-size: calc(10px + 1vmin);
  font-weight: bolder;
  font-family: "GmarketSansMedium";
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

interface IProps {
  hover: React.Dispatch<React.SetStateAction<string>>;
}

const Nav = (props: IProps) => {
  return (
    <NavBar>
      <NavLinkWrapper>
        <NavLink onClick={() => props.hover("")} to={"/"}>
          스마트 부표
        </NavLink>
        <NavLink to={"/tripod"}>트라이포드 센서</NavLink>
      </NavLinkWrapper>
    </NavBar>
  );
};

export default Nav;
