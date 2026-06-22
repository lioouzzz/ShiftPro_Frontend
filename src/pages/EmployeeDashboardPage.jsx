import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

function EmployeeDashboardPage() {

    

  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [formData, setFormData] = useState({
    account: "",
    name: "",
    password: "",
    role: 1,
    isActived:true
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const result = await getEmployees();
      setEmployees(result);
    } catch (error) {
      console.log(error);
      setError("取得員工資料失敗");
    }
  };

  const getRoleText = (role) => {
    switch (role) {
      case 0:
        return "老闆";
      case 1:
        return "員工";
      case 2:
        return "管理員";

    }
  };

  const openCreateModal = () => {
    setIsEditMode(false);
    setSelectedEmployee(null);
    setFormData({
      account: "",
      name: "",
      password: "",
      role: 1,
      isActived: true,
    });
    setShowModal(true);
  };

  const openEditModal = (employee) => {
    setIsEditMode(true);
    setSelectedEmployee(employee);
    setFormData({
      name: employee.name || "",
      isActived: employee.isActived,
    });
    setShowModal(true);
  };

  const handleSaveEmployee = async () => {
    try {
      if (isEditMode) {
        await updateEmployee(selectedEmployee.id, {
          name: formData.name,
          isActived: formData.isActived,
        });
      } else {
        await createEmployee({
          name: formData.name,
          account: formData.account,
          password: formData.password,
          role: Number(formData.role),
        });
      }

      setShowModal(false);
      fetchEmployees();
    } catch (error) {
      console.log(error);
      alert("儲存失敗");
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (!confirm("確定要刪除這位員工嗎？")) return;

    try {
      await deleteEmployee(id);
      fetchEmployees();
    } catch (error) {
      console.log(error);
      alert("刪除失敗");
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

      <main className="max-w-6xl mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-stone-700">員工管理</h2>
            <p className="text-gray-500 mt-2">
              新增、編輯與管理員工帳號狀態
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="px-5 py-2 rounded-lg bg-stone-700 text-white hover:bg-stone-800 transition"
          >
            新增員工
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded bg-red-100 px-3 py-2 text-red-600">
            {error}
          </div>
        )}

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

                  <td className="px-6 py-4">{getRoleText(employee.role)}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        employee.isActived
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {employee.isActived ? "啟用中" : "停用"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {new Date(employee.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditModal(employee)}
                        className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 transition"
                      >
                        編輯
                      </button>

                      <button
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="px-3 py-1 rounded border border-red-300 text-red-500 hover:bg-red-50 transition"
                      >
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {employees.length === 0 && !error && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    目前沒有員工資料
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h3 className="text-2xl font-bold text-stone-700 mb-5">
              {isEditMode ? "編輯員工" : "新增員工"}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  姓名
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-stone-500"
                />
              </div>

              {!isEditMode && (
                <>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      帳號
                    </label>
                    <input
                      type="text"
                      value={formData.account}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          account: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-stone-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      密碼
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          password: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-stone-500"
                    />
                  </div>
                </>
              )}

              {!isEditMode && (
                    <div>
                        <label className="block text-sm text-gray-500 mb-1">
                        角色
                        </label>

                        <select
                        value={formData.role}
                        onChange={(e) =>
                            setFormData({
                            ...formData,
                            role: Number(e.target.value),
                            })
                        }
                        className="w-full border border-gray-300 rounded-lg p-3"
                        >
                        <option value={0}>老闆</option>
                        <option value={1}>員工</option>
                        <option value={2}>管理員</option>
                        </select>
                    </div>
                    )}

              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  帳號狀態
                </label>

                <div className="flex justify-center gap-8">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={formData.isActived === true}
                      onChange={() =>
                        setFormData({ ...formData, isActived: true })
                      }
                    />
                    啟用
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={formData.isActived === false}
                      onChange={() =>
                        setFormData({ ...formData, isActived: false })
                      }
                    />
                    停用
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                取消
              </button>

              <button
                onClick={handleSaveEmployee}
                className="px-4 py-2 rounded-lg bg-stone-700 text-white hover:bg-stone-800 transition"
              >
                儲存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeDashboardPage;