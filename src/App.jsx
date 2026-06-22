import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import EmployeeDashboardPage from "./pages/EmployeeDashboardPage";
import ScheduleManagePage from "./pages/ScheduleManagePage";
import PersonalSchedulePage from "./pages/PersonalSchedulePage";
import ReportPage from "./pages/ReportPage";
import MonthlySchedulePage from "./pages/MonthlySchedulePage";
import GetSchedulePage from "./pages/GetSchedulePage";
import ProtectedRoute from "./components/ProtectedRoute";


import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0)

  return (

    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={ <ProtectedRoute roles={["Admin","Employee","Boss"]}> <DashboardPage /> </ProtectedRoute>} />
        <Route path="/profile" element={ <ProtectedRoute roles={["Admin","Employee","Boss"]}> <ProfilePage /> </ProtectedRoute>} />
        <Route path="/EmployeeDashboard" element={  <ProtectedRoute roles={["Admin","Boss"]}> <EmployeeDashboardPage />  </ProtectedRoute>} />
        <Route path="/ScheduleManage" element={ <ProtectedRoute roles={["Admin","Boss"]}> <ScheduleManagePage /> </ProtectedRoute> } />
        <Route path="/PersonalSchedule" element={ <ProtectedRoute roles={["Employee"]}> <PersonalSchedulePage /> </ProtectedRoute>} />
        <Route path="/Report" element={ <ProtectedRoute roles={["Boss","Admin"]}><ReportPage />  </ProtectedRoute> } />
        <Route path="/MonthlySchedule" element={ <ProtectedRoute roles={["Boss","Admin"]}><MonthlySchedulePage />  </ProtectedRoute>} />
        <Route path="/GetSchedule" element={  <ProtectedRoute roles={["Boss","Admin","Employee"]}> <GetSchedulePage /> </ProtectedRoute>} />

        
        
      </Routes>
    </BrowserRouter>
  );
  
}

export default App
