import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Approvals from "./pages/Approvals/Approvals";
import Rankings from "./pages/Rankings/Rankings";
import UniversityTables from "./components/Dashboard/UniversityTables";
import InstituteTables from "./components/Dashboard/InstituteTables";
import AluminiTables from "./components/Dashboard/AluminiTables";

const App = () => {
  return (
    <Router>
    <Routes>

    {/* <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} /> */}

      <Route element={<AppLayout />}>
        <Route index element={<Navigate replace to="dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<UniversityTables />} />
          <Route path="institue" element={<InstituteTables />} />
          <Route path="alumini" element={<AluminiTables />} />
        </Route>
        <Route path="/approvals" element={<Approvals />} />
        <Route path="/rankings" element={<Rankings />} />
      </Route>
    </Routes>
  </Router>
  )
}

export default App