import { schedule } from "../services/scheduleService";


import { Link } from "react-router-dom";

function ScheduleManagePage() {
  const schedules = [
    {
      id: 1,
      employeeName: "王小明",
      workDate: "2026-06-21",
      startTime: "09:00",
      endTime: "18:00",
      shiftType: "早班",
    },
    {
      id: 2,
      employeeName: "李小華",
      workDate: "2026-06-22",
      startTime: "13:00",
      endTime: "22:00",
      shiftType: "晚班",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
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

      <main className="max-w-6xl mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-stone-700">
              排班管理
            </h2>

            <p className="text-gray-500 mt-2">
              查看、新增、編輯與刪除員工班表
            </p>
          </div>

          <button className="px-5 py-2 rounded-lg bg-stone-700 text-white hover:bg-stone-800 transition">
            新增班表
          </button>
        </div>

        <div className="bg-white shadow rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-stone-100 text-stone-700">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">員工</th>
                <th className="px-6 py-4">日期</th>
                <th className="px-6 py-4">開始時間</th>
                <th className="px-6 py-4">結束時間</th>
                <th className="px-6 py-4">班別</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>

            <tbody>
              {schedules.map((schedule) => (
                <tr
                  key={schedule.id}
                  className="border-t hover:bg-stone-50 transition"
                >
                  <td className="px-6 py-4">{schedule.id}</td>

                  <td className="px-6 py-4 font-medium text-stone-700">
                    {schedule.employeeName}
                  </td>

                  <td className="px-6 py-4">{schedule.workDate}</td>

                  <td className="px-6 py-4">{schedule.startTime}</td>

                  <td className="px-6 py-4">{schedule.endTime}</td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-stone-100 text-stone-600">
                      {schedule.shiftType}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 transition">
                        編輯
                      </button>

                      <button className="px-3 py-1 rounded border border-red-300 text-red-500 hover:bg-red-50 transition">
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {schedules.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    目前沒有排班資料
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default ScheduleManagePage;