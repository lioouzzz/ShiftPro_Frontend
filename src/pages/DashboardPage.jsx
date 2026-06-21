import { Link } from "react-router-dom";

function DashboardPage() {
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const isAdmin = role === "Admin";
  const isBoss = role === "Boss";
  const isEmployee = role === "Employee";

  return (
    <div className="min-h-screen bg-stone-50">
      {/* 上方導覽列 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div>
            <h3
              className="text-3xl font-extrabold tracking-wider"
              style={{
                fontFamily: "Montserrat, sans-serif",
                color: "oklch(58% 0.031 107.3)",
              }}
            >
              ShiftPro
            </h3>
          </div>

            <div className="flex items-center gap-6">
            <Link
                to="/profile"
                className="text-sm font-medium text-stone-600 hover:text-stone-900 transition"
            >
                我的資料
            </Link>

            <div className="h-6 w-px bg-gray-300" />

            <div className="text-right">
                <p className="font-medium text-stone-700">
                {name || "使用者"}
                </p>

                <p className="text-sm text-gray-500">
                {isAdmin ? "管理員" : "員工"}
                </p>
            </div>

            <button
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
                登出
            </button>
            </div>
        </div>
      </div>

     
      <main className="max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-stone-700">
            你好! 歡迎使用ShiftPro，{name || "使用者"}
          </h2>


        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-stone-700">
              排班管理
            </h3>

            <p className="text-gray-500 mt-2">
              {isAdmin ? "管理員工班表與工作時段" : "查看個人班表資訊"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            
            
            {(isAdmin || isBoss) && 
            
            (<Link to="/ScheduleManage" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition" >
            <div className="border rounded-xl p-5 hover:shadow-md transition cursor-pointer">
                <h4 className="font-semibold text-lg mb-2">
                全體員工班表
                </h4>

                <p className="text-sm text-gray-500">
                管理全體員工排班資料
                </p>
            </div>
            </Link>)}

            <div className="border rounded-xl p-5 hover:shadow-md transition cursor-pointer">
                
              <h4 className="font-semibold text-lg mb-2">
                管理個人班表
              </h4>

              <p className="text-sm text-gray-500">
                管理個人排班資料
              </p>
            </div>



                {(isAdmin || isBoss) && (
                 <Link
                    to="/EmployeeDashboard"
                    className="text-sm font-medium text-stone-600 hover:text-stone-900 transition"
                >
                <div className="bg-stone-800 text-white rounded-xl p-5 hover:bg-stone-500 hover:shadow-lg transition cursor-pointer">
                    <h4 className="font-semibold text-lg mb-2">
                    員工管理
                    </h4>

                    <p className="text-sm text-zinc-300">
                    管理員工資料與帳號權限
                    </p>

                    
                    </div>
                </Link>
                )}


                {isBoss && (<div className="border rounded-xl p-5 hover:shadow-md transition cursor-pointer">
                  <h4 className="font-semibold text-lg mb-2">
                    員工當月班表
                  </h4>

                  <p className="text-sm text-gray-500">
                    查看員工當月班表
                  </p>
                </div>)}

                
                {isBoss && (<div className="border rounded-xl p-5 hover:shadow-md transition cursor-pointer">
                  <h4 className="font-semibold text-lg mb-2">
                    員工年度報表
                  </h4>

                  <p className="text-sm text-gray-500">
                    當月上班排行、年度上班天數總計
                  </p>
                </div>)}

          </div>
        </div>
      </main>
      
    </div>
  );
}

export default DashboardPage;