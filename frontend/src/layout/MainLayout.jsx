import Navbar from "../components/Layout/Navbar/Navbar";

// eslint-disable-next-line react/prop-types
const MainLayout = ({ children }) => {
  return (
    <div className="">
      <Navbar/>
      <div className="content">{children}</div>
    </div>
  );
};

export default MainLayout;
