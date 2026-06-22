import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getreport } from "../services/scheduleService";

function ReportPage() {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      const result = await getreport(year, month);

      const sorted = [...result].sort(
        (a, b) => b.monthlyWorkDays - a.monthlyWorkDays
      );

      setReports(sorted);
    } catch (error) {
      console.log(error);
      alert("取得報表失敗");
    }
  };

  const averageMonthlyWorkDays = reports.length
    ? (
        reports.reduce((sum, r) => sum + r.monthlyWorkDays, 0) /
        reports.length
      ).toFixed(1)
    : 0;

  const belowMinimumCount = reports.filter(
    (r) => r.isBelowMinimum
  ).length;

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

          <div className="flex gap-6 items-center">
            <Link
              to="/dashboard"
              className="text-sm font-medium text-stone-600 hover:text-stone-900 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/schedule/manage"
              className="text-sm font-medium text-stone-600 hover:text-stone-900 transition"
            >
              排班管理
            </Link>

            <Link
              to="/schedule/personal"
              className="text-sm font-medium text-stone-600 hover:text-stone-900 transition"
            >
              我的班表
            </Link>

            <Link
              to="/schedule/report"
              className="text-sm font-semibold text-stone-900"
            >
              排班報表
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-stone-700">
            排班統計報表
          </h2>

          <p className="text-gray-500 mt-2">
            查詢指定年月員工排班統計與最低排班檢核
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex gap-3 items-end">
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                年度
              </label>

              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="border rounded-lg p-3"
              >
                {[2025, 2026, 2027].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2">
                月份
              </label>

              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="border rounded-lg p-3"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} 月
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={loadReport}
              className="px-6 py-3 rounded-lg bg-stone-700 text-white hover:bg-stone-800 transition"
            >
              查詢報表
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-5">
            <div className="text-gray-500 text-sm">員工總數</div>
            <div className="text-3xl font-bold mt-2">{reports.length}</div>
          </div>


          <div className="bg-white rounded-xl shadow p-5">
            <div className="text-gray-500 text-sm">未達標人數</div>
            <div className="text-3xl font-bold mt-2 text-red-600">
              {belowMinimumCount}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-stone-100">
              <tr>
                <th className="p-4 text-center">排名</th>
                <th className="p-4 text-left">員工</th>
                <th className="p-4 text-center">本月班數</th>
                <th className="p-4 text-center">年度班數</th>
                <th className="p-4 text-center">狀態</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((report, index) => (
                <tr
                  key={report.employeeId}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4 text-center font-bold">
                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : index === 2
                      ? "🥉"
                      : index + 1}
                  </td>

                  <td className="p-4 font-medium">
                    {report.employeeName}
                  </td>

                  <td className="p-4 text-center">
                    {report.monthlyWorkDays}
                  </td>

                  <td className="p-4 text-center">
                    {report.yearlyWorkDays}
                  </td>

                  <td className="p-4 text-center">
                    {report.isBelowMinimum ? (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                        未達標
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        達標
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {reports.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="p-8 text-center text-gray-500"
                  >
                    查無報表資料
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

export default ReportPage;