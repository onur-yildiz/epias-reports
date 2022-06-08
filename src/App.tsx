import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import ReportViewContainer from "./components/report-views/ReportViewContainer";
import reportHierarchy from "./constants/reportHierarchy";
import { setUser } from "./store/authSlice";
import { useEffect } from "react";
import { useLazyRefreshToken } from "./services/userService";

const generateReportRoutes = (
  reportList: ReportHierarchyItem[]
): JSX.Element[] => {
  return reportList.flatMap((report) => {
    if (report.children) return generateReportRoutes(report.children);

    return [
      <Route
        key={report.path}
        path={report.path}
        element={<ReportViewContainer report={report.reportKey} />}
      />,
    ];
  });
};

const reportRoutes = generateReportRoutes(reportHierarchy);
const RedirectHome = () => <Navigate to="/" replace />;

function App() {
  const dispatch = useAppDispatch();
  const [token, isAuth] = useAppSelector((state) => [
    state.auth.user.token,
    state.auth.isAuthenticated,
  ]);
  const [refreshToken] = useLazyRefreshToken();

  useEffect(() => {
    if (token.length === 0) return;
    const fetchUserAndRefreshToken = async () => {
      const user = await refreshToken().unwrap();
      dispatch(setUser(user));
    };
    fetchUserAndRefreshToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />}>
          {reportRoutes}
        </Route>
        <Route path="/login" element={isAuth ? <RedirectHome /> : <Login />} />
        <Route
          path="/register"
          element={isAuth ? <RedirectHome /> : <Register />}
        />
        {reportRoutes != null && <Route path="*" element={<RedirectHome />} />}
      </Routes>
    </div>
  );
}

export default App;
