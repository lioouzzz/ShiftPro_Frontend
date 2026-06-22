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



import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0)

  return (

    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/EmployeeDashboard" element={<EmployeeDashboardPage />} />
        <Route path="/ScheduleManage" element={<ScheduleManagePage />} />
        <Route path="/PersonalSchedule" element={<PersonalSchedulePage />} />
        <Route path="/Report" element={<ReportPage />} />
        <Route path="/MonthlySchedule" element={<MonthlySchedulePage />} />
        <Route path="/GetSchedule" element={<GetSchedulePage />} />

        
        
      </Routes>
    </BrowserRouter>
  );
  
}

export default App
