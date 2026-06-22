import {
  getMonthlySchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule
} from "../services/scheduleService";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEmployees } from "../services/employeeService";


function ScheduleManagePage() {
  const today = new Date();

  const nextMonthDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  const scheduleYear = nextMonthDate.getFullYear();
  const scheduleMonth = nextMonthDate.getMonth();
  const displayMonth = scheduleMonth + 1;

  const [employees, setEmployees] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");

  const [selectedScheduleId, setSelectedScheduleId] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");

  useEffect(() => {
    fetchEmployees();
    fetchSchedules();
  }, []);

  const fetchEmployees = async () => {
    try {
      const result = await getEmployees();
      setEmployees(result);
    } catch (error) {
      console.log(error);
      alert("取得員工資料失敗");
    }
  };

  const fetchSchedules = async () => {
    try {
      const result = await getMonthlySchedules(scheduleYear, displayMonth);
      setSchedules(result);
    } catch (error) {
      console.log(error);
      alert("取得班表資料失敗");
    }
  };

  const handleDeleteSchedule = async () => {
  const confirmed = window.confirm(
    "確定要刪除此排班嗎？"
  );

  if (!confirmed) return;

  try {
    await deleteSchedule(selectedScheduleId);

    alert("刪除成功");

    setShowModal(false);

    await fetchSchedules();
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      error.response?.data?.title ||
      "刪除失敗"
    );
  }
};

  const firstDay = new Date(scheduleYear, scheduleMonth, 1).getDay();
  const totalDays = new Date(scheduleYear, scheduleMonth + 1, 0).getDate();

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= totalDays; day++) {
    calendarDays.push(day);
  }

  const formatDate = (day) => {
    const month = String(displayMonth).padStart(2, "0");
    const date = String(day).padStart(2, "0");

    return `${scheduleYear}-${month}-${date}`;
  };

  const isWeekend = (day) => {
    if (!day) return false;

    const date = new Date(scheduleYear, scheduleMonth, day);
    const weekDay = date.getDay();

    return weekDay === 0 || weekDay === 6;
  };

  const getSchedulesByDate = (day) => {
    if (!day) return [];

    const date = formatDate(day);

    return schedules.filter((schedule) => schedule.workDate === date);
  };

  const openCreateModal = (day) => {
    if (!day) return;

    if (isWeekend(day)) {
      alert("週六、週日不可排班");
      return;
    }

    setModalMode("create");
    setSelectedScheduleId(null);
    setSelectedDate(formatDate(day));
    setSelectedEmployeeId("");
    setShowModal(true);
  };

  const openEditModal = (schedule) => {
    setModalMode("edit");
    setSelectedScheduleId(schedule.id);
    setSelectedDate(schedule.workDate);
    setSelectedEmployeeId(String(schedule.employeeId));
    setShowModal(true);
  };

  const handleSubmitSchedule = async () => {
    if (!selectedEmployeeId) {
      alert("請選擇員工");
      return;
    }

    try {
      const payload = {
        employeeId: Number(selectedEmployeeId),
        workDate: selectedDate,
      };

      if (modalMode === "create") {
        await createSchedule(payload);
        alert("排班成功");
      } else {
        await updateSchedule(selectedScheduleId, payload);
        alert("編輯成功");
      }

      setShowModal(false);
      await fetchSchedules();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          error.response?.data?.title ||
          error.response?.data ||
          "操作失敗"
      );
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
                <Link to="/dashboard" className="block">
                <h3
                    className="text-3xl font-extrabold tracking-wider hover:opacity-80 transition"
                    style={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "oklch(58% 0.031 107.3)",
                    }}
                >
                    ShiftPro
                </h3>
                </Link>

          <Link
            to="/dashboard"
            className="text-sm font-medium text-stone-600 hover:text-stone-900 transition"
          >
            返回 Dashboard
          </Link>
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-stone-700">排班行事曆</h2>

          <p className="text-gray-500 mt-2">
            目前僅開放排定下個月班表
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-stone-700">
              {scheduleYear} 年 {displayMonth} 月
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              點日期可新增排班，點員工姓名可編輯
            </p>
          </div>

          <div className="grid grid-cols-7 text-center font-semibold text-stone-600 border-b pb-3 mb-3">
            <div>日</div>
            <div>一</div>
            <div>二</div>
            <div>三</div>
            <div>四</div>
            <div>五</div>
            <div>六</div>
          </div>

          <div className="grid grid-cols-7 gap-3">
            {calendarDays.map((day, index) => {
              const disabled = isWeekend(day);
              const daySchedules = getSchedulesByDate(day);

              return (
                <div
                  key={index}
                  onClick={() => openCreateModal(day)}
                  className={`min-h-32 rounded-xl border p-3 transition ${
                    !day
                      ? "bg-transparent border-transparent"
                      : disabled
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white hover:shadow-md cursor-pointer"
                  }`}
                >
                  {day && (
                    <>
                      <div className="font-bold">{day}</div>

                      <div className="mt-2 space-y-1">
                        {daySchedules.map((schedule) => (
                          <button
                            key={schedule.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditModal(schedule);
                            }}
                            className="block w-full  text-xs text-white text-center bg-stone-700 text-stone-700 rounded px-2 py-1 hover:bg-stone-200 transition"
                          >
                            {schedule.employeeName}
                          </button>
                        ))}
                      </div>

                      <p className="text-xs text-gray-400 mt-2">
                        {disabled ? "不可排班" : "點選新增"}
                      </p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h3 className="text-2xl font-bold text-stone-700 mb-5">
              {modalMode === "create" ? "新增班表" : "編輯班表"}
            </h3>

            <p className="text-gray-500 mb-4">
              排班日期：{selectedDate}
            </p>

            <div>
              <label className="block text-sm text-gray-500 mb-2">
                選擇員工
              </label>

              <select
                value={selectedEmployeeId}
                onChange={(e) => setSelectedEmployeeId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-stone-500"
              >
                <option value="">請選擇員工</option>

                {employees
                .filter((employee) => employee.isActived)
                .map((employee) => (
                    
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>


            <div className="mt-8 flex justify-between items-center">
                <div>
                    {modalMode === "edit" && (
                    <button
                        onClick={handleDeleteSchedule}
                        className="px-4 py-2 rounded-lg bg-rose-600 text-white hover:bg-red-600 transition"
                    >
                        刪除
                    </button>
                    )}
                </div>

                <div className="flex gap-3">
                    <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                    >
                    取消
                    </button>

                    <button
                    onClick={handleSubmitSchedule}
                    className="px-4 py-2 rounded-lg bg-stone-700 text-white hover:bg-stone-800 transition"
                    >
                    {modalMode === "create" ? "儲存" : "更新"}
                    </button>
                </div>
                </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ScheduleManagePage;