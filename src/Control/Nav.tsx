import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div
      style={{
        backgroundColor: "transparent",
        position: "absolute",
        top: 30,
        zIndex: 100,
        width: "100%",
      }}>
      <div
        style={{
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "space-around",
          width: "50%",
          margin: "0 auto",
        }}>
        <Link
          style={{
            fontSize: 20,
            fontWeight: "bolder",
            textDecoration: "none",
            color: "black",
          }}
          to={"/"}>
          스마트 부표
        </Link>
        <Link
          style={{
            fontSize: 20,
            fontWeight: "bolder",
            textDecoration: "none",
            color: "black",
          }}
          to={"/tripod"}>
          트라이포드 센서
        </Link>
      </div>
    </div>
  );
};

export default Nav;