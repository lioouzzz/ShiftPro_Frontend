import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile, updateProfile } from "../services/profileService";
function ProfilePage() {

  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  

  useEffect(() => {
    fetchProfile();
  }, []);


const handleUpdateProfile = async () => {
    try {
        const updateData = {
        name: editName,
        };

        await updateProfile(profile.id, updateData);

        setProfile({
        ...profile,
        name: editName,
        });

        localStorage.setItem("name", editName);

        setShowEditModal(false);

    } catch (error) {
        console.log(error);
        setError("更新個人資料失敗");
    }
    };

  const fetchProfile = async () => {
    try {
      const result = await getProfile();
      setProfile(result);
      setEditName(result.name);
    } catch (error) {
      console.log(error);
      setError("取得個人資料失敗");
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
              to="/dashboard"
              className="text-sm font-medium text-stone-600 hover:text-stone-900 transition"
            >
              返回 Dashboard
            </Link>

            <div className="h-6 w-px bg-gray-300" />

            <div className="text-right">
              <p className="font-medium text-stone-700">
                {profile?.name || "使用者"}
              </p>

              <p className="text-sm text-gray-500">
                {profile ? getRoleText(profile.role) : ""}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 主要內容 */}
      <main className="max-w-4xl mx-auto p-8">
        <div className="bg-white shadow rounded-xl p-8">
          <h2 className="text-3xl font-bold text-stone-700 mb-6">
            我的資料
          </h2>

          {error && (
            <div className="mb-4 rounded bg-red-100 px-3 py-2 text-red-600">
              {error}
            </div>
          )}

          {!profile && !error && (
            <p className="text-gray-500">載入中...</p>
          )}

          {profile && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">員工編號</p>
                <p className="text-lg font-medium text-stone-700">
                  {profile.id}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">姓名</p>
                <p className="text-lg font-medium text-stone-700">
                  {profile.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">身分</p>
                <p className="text-lg font-medium text-stone-700">
                  {getRoleText(profile.role)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">帳號狀態</p>
                <p
                  className={`text-lg font-medium ${
                    profile.isActived ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {profile.isActived ? "啟用中" : "停用"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">建立日期</p>
                <p className="text-lg font-medium text-stone-700">
                  {new Date(profile.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                    <button
                    onClick={() => setShowEditModal(true)}
                    className="px-5 py-2 rounded-lg bg-stone-700 text-white hover:bg-stone-800 transition"
                    >
                    編輯資料
                    </button>
                </div>
            </div>
          )}
        </div>
      </main>



       {/* 編輯資料 */}
    {showEditModal && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">

      <h3 className="text-2xl font-bold text-stone-700 mb-5">
        編輯資料
      </h3>

      <div className="space-y-5">

        {/* 姓名 */}
        <div>
            <label className="block text-sm text-gray-500 mb-2">
            姓名
            </label>

            <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3
                        focus:outline-none focus:border-stone-500"
            />
        </div>

        {/* 帳號狀態 */}
        <div>
            <label className="block text-sm text-gray-500 mb-2 text-center">
            帳號狀態
            </label>

            <p
            className={`text-center font-medium ${
                profile?.isActived
                ? "text-green-600"
                : "text-red-500"
            }`}
            >
            {profile?.isActived ? "啟用中" : "停用"}
            </p>
        </div>

</div>

      <div className="mt-8 flex justify-end gap-3">

        <button
          onClick={() => setShowEditModal(false)}
          className="px-4 py-2 rounded-lg border border-gray-300
                     hover:bg-gray-100 transition"
        >
          取消
        </button>
        
        <button
        onClick={handleUpdateProfile}
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

export default ProfilePage;