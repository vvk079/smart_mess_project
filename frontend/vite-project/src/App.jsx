import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import StudentLogin from "./pages/StudentLogin";
import StudentRegister from "./pages/StudentRegister";
import Studenthome from "./pages/StudentHome";
import Paybill from "./pages/BillPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<StudentLogin />} />
      <Route path="/register" element={<StudentRegister />} />
      <Route path="/student/home" element={<Studenthome />} />
      <Route path="/student/paybill" element={<Paybill />} />

    </Routes>
  );
}

export default App;
