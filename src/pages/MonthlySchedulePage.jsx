import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { getMonthlySchedules } from "../services/scheduleService";



function MonlySchedulePage() {
    const today = new Date();

    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth() + 1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

      useEffect(() => {
      handleSearch();
    }, []);

      const handleSearch = async () => {
    try {
      setLoading(true);
      const result = await getMonthlySchedules(year, month);
      setData(result);
    } catch (error) {
      console.error(error);
      alert("查詢失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

return (
<div className="min-h-screen bg-stone-50">
      {/* Navbar */}
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

      {/* Main */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-stone-800">
            年月排班報表
          </h1>

          <p className="text-sm text-stone-500 mt-1">
            請選擇年份與月份查詢員工排班資料
          </p>
        </div>
          {/* Search Area */}
          <div className="flex justify-center gap-4 items-end mb-6">
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1">
                年份
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="border rounded-lg px-4 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-stone-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1">
                月份
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="border rounded-lg px-4 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-stone-300"
              >
                {Array.from({ length: 12 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1} 月
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-stone-700 text-white px-6 py-2 rounded-lg hover:bg-stone-800 transition disabled:opacity-50 mt-2"
            >
              {loading ? "查詢中..." : "查詢"}
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-stone-100 text-stone-700">
                  <th className="border px-4 py-3 text-center">ID</th>
                  <th className="border px-4 py-3 text-center">員工編號</th>
                  <th className="border px-4 py-3 text-center">員工姓名</th>
                  <th className="border px-4 py-3 text-center">工作日期</th>
                </tr>
              </thead>

              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="border px-4 py-6 text-center text-stone-500"
                    >
                      尚無資料
                    </td>
                  </tr>
                ) : (
                  data.map((item) => (
                    <tr key={item.id} className="hover:bg-stone-50">
                      <td className="border px-4 py-3">{item.id}</td>
                      <td className="border px-4 py-3">{item.employeeId}</td>
                      <td className="border px-4 py-3 font-medium">
                        {item.employeeName}
                      </td>
                      <td className="border px-4 py-3">{item.workDate}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MonlySchedulePage;