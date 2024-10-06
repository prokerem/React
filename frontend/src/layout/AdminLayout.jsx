// eslint-disable-next-line react/prop-types
const AdminLayout = ({ children }) => {
  return (
    <div className="layout">
      <h1>Admin Layout</h1>
      <div className="content">{children}</div>
    </div>
  );
};

export default AdminLayout;
