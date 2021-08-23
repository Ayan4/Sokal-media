import { Route, Navigate } from "react-router";
import { useSelector } from "react-redux";

function PrivateRoute({ path, ...props }) {
  const {
    auth: { isUserPresent }
  } = useSelector(state => state);

  return (
    <div>
      {isUserPresent ? (
        <Route path={path} {...props} />
      ) : (
        <Navigate state={{ from: path }} replace to="/login" />
      )}
    </div>
  );
}

export default PrivateRoute;
