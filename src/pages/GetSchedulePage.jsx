import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMonthlySchedules } from "../services/scheduleService";

function GetSchedulePage() {
  const today = new Date();

  const nextMonthDate = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    1
  );

  const scheduleYear = nextMonthDate.getFullYear();
  const scheduleMonth = nextMonthDate.getMonth();
  const displayMonth = scheduleMonth + 1;

  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      setLoading(true);

      const result = await getMonthlySchedules(scheduleYear, displayMonth);
      setSchedules(result);
    } catch (error) {
      console.error(error);
      alert("取得班表資料失敗");
    } finally {
      setLoading(false);
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

      <main className="max-w-7xl mx-auto p-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-stone-700">
            下個月班表
          </h2>
          <p className="text-gray-500 mt-2">
            目前顯示 {scheduleYear} 年 {displayMonth} 月班表
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-stone-700">
              {scheduleYear} 年 {displayMonth} 月
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              此頁面僅供查看，無法新增、編輯或刪除班表
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

          {loading ? (
            <div className="text-center text-stone-500 py-10">
              班表載入中...
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-3">
              {calendarDays.map((day, index) => {
                const disabled = isWeekend(day);
                const daySchedules = getSchedulesByDate(day);

                return (
                  <div
                    key={index}
                    className={`min-h-32 rounded-xl border p-3 ${
                      !day
                        ? "bg-transparent border-transparent"
                        : disabled
                        ? "bg-gray-100 text-gray-400"
                        : "bg-white"
                    }`}
                  >
                    {day && (
                      <>
                        <div className="font-bold">{day}</div>

                        <div className="mt-2 space-y-1">
                          {daySchedules.length === 0 ? (
                            <p className="text-xs text-gray-400">無班表</p>
                          ) : (
                            daySchedules.map((schedule) => (
                              <div
                                key={schedule.id}
                                className="text-xs text-white text-center bg-stone-700 rounded px-2 py-1"
                              >
                                {schedule.employeeName}
                              </div>
                            ))
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default GetSchedulePage;