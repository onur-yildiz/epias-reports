import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks";

import AccountPanel from "./screens/Dashboard/Components/AccountPanel";
import Login from "./screens/Login";
import ProfileView from "./components/ProfileView";
import Register from "./screens/Register";
import ReportViewContainer from "./components/report-views/ReportViewContainer";
import ReportsDashboard from "./screens/Dashboard/Components/ReportsDashboard";
import ReportsTable from "./components/ReportsTable";
import RolesTable from "./components/RolesTable";
import StatusCode from "./components/StatusCode";
import UsersTable from "./components/UsersTable";
import { setUser } from "./store/authSlice";
import { useEffect } from "react";
import { useLazyRefreshToken } from "./services/userService";

const RedirectHome = () => <Navigate to="/" replace />;

function App() {
  const dispatch = useAppDispatch();
  const [token, isAuth, user] = useAppSelector((state) => [
    state.auth.user.token,
    state.auth.isAuthenticated,
    state.auth.user,
  ]);
  const [refreshToken] = useLazyRefreshToken();

  useEffect(() => {
    const fetchUserData = async () => {
      if (token.length !== 0) dispatch(setUser(await refreshToken().unwrap())); // TODO before render
    };

    fetchUserData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ReportsDashboard />}>
          <Route path={"/:reportKey"} element={<ReportViewContainer />} />
        </Route>
        <Route path="/account" element={<AccountPanel />}>
          <Route index element={<ProfileView />} />
          <Route
            path="admin/users"
            element={user.isAdmin ? <UsersTable /> : <StatusCode value={403} />}
          />
          <Route
            path="admin/reports"
            element={
              user.isAdmin ? <ReportsTable /> : <StatusCode value={403} />
            }
          />
          <Route
            path="admin/roles"
            element={user.isAdmin ? <RolesTable /> : <StatusCode value={403} />}
          />
        </Route>
        <Route path="/login" element={isAuth ? <RedirectHome /> : <Login />} />
        <Route
          path="/register"
          element={isAuth ? <RedirectHome /> : <Register />}
        />
        <Route path="*" element={<StatusCode value={404} />} />
      </Routes>
    </div>
  );
}

export default App;
