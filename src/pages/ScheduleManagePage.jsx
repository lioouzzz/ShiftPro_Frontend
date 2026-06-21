import { useState } from "react";

import { Link } from "react-router-dom";

function ScheduleManagePage() {
  const today = new Date();

  // 只開放下個月
  const scheduleYear =
    today.getMonth() === 11 ? today.getFullYear() + 1 : today.getFullYear();

  const scheduleMonth =
    today.getMonth() === 11 ? 0 : today.getMonth() + 1;

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
    const month = String(scheduleMonth + 1).padStart(2, "0");
    const date = String(day).padStart(2, "0");

    return `${scheduleYear}-${month}-${date}`;
  };

  const handleSelectDate = (day) => {
    if (!day) return;

    const selectedDate = formatDate(day);

    console.log("選到日期：", selectedDate);
    alert(`你選擇了 ${selectedDate}`);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* 上方導覽列 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <h3
            className="text-3xl font-extrabold tracking-wider"
            style={{
              fontFamily: "Montserrat, sans-serif",
              color: "oklch(58% 0.031 107.3)",
            }}
          >
            ShiftPro
          </h3>

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
          <h2 className="text-3xl font-bold text-stone-700">
            排班行事曆
          </h2>

          <p className="text-gray-500 mt-2">
            目前僅開放排定下個月班表
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-bold text-stone-700">
                {scheduleYear} 年 {scheduleMonth + 1} 月
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                僅能選擇此月份日期
              </p>
            </div>

            <button className="px-5 py-2 rounded-lg bg-stone-700 text-white hover:bg-stone-800 transition">
              新增班表
            </button>
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
            {calendarDays.map((day, index) => (
              <div
                key={index}
                onClick={() => handleSelectDate(day)}
                className={`min-h-32 rounded-xl border p-3 transition ${
                  day
                    ? "bg-white hover:shadow-md cursor-pointer"
                    : "bg-transparent border-transparent"
                }`}
              >
                {day && (
                  <>
                    <div className="font-bold text-stone-700">
                      {day}
                    </div>

                    <p className="text-xs text-gray-400 mt-2">
                      可選擇
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ScheduleManagePage;