import { Link } from "react-router-dom";

function EmployeeDashboardPage() {
  const employees = [
    {
      id: 1,
      name: "管理員",
      role: "管理員",
      isActived: true,
      createdAt: "2026-06-20",
    },
    {
      id: 2,
      name: "王小明",
      role: "員工",
      isActived: true,
      createdAt: "2026-06-21",
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
              員工管理
            </h2>

            <p className="text-gray-500 mt-2">
              新增、編輯與管理員工帳號狀態
            </p>
          </div>

          <button className="px-5 py-2 rounded-lg bg-stone-700 text-white hover:bg-stone-800 transition">
            新增員工
          </button>
        </div>

        <div className="bg-white shadow rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-stone-100 text-stone-700">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">姓名</th>
                <th className="px-6 py-4">角色</th>
                <th className="px-6 py-4">帳號狀態</th>
                <th className="px-6 py-4">建立日期</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-t hover:bg-stone-50 transition"
                >
                  <td className="px-6 py-4">{employee.id}</td>
                  <td className="px-6 py-4 font-medium text-stone-700">
                    {employee.name}
                  </td>
                  <td className="px-6 py-4">{employee.role}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        employee.isActived
                          ? "bg-teal-100 text-teal-800"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {employee.isActived ? "啟用中" : "停用"}
                    </span>
                  </td>
                  <td className="px-6 py-4">{employee.createdAt}</td>
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
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default EmployeeDashboardPage;