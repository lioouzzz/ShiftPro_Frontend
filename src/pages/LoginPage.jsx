import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
            const result = await login(account, password);

            localStorage.setItem("token", result.token);
            localStorage.setItem("name", result.name);
            localStorage.setItem("role", result.role);

            setSuccess("登入成功");
            setError("");

            setTimeout(() => {
                navigate("/dashboard");
            }, 800);

            } catch (error) {

            setError("帳號或密碼錯誤");
            setSuccess("");

            setTimeout(() => {
                setError("");
            }, 2000);
            } 
    };

  return (
    
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

        <h1
          className="text-5xl font-extrabold text-center tracking-wider"
          style={{
            fontFamily: "Montserrat, sans-serif",
            color: "oklch(58% 0.031 107.3)",
          }}
        >
          ShiftPro
        </h1>

        <p className="text-center text-gray-500 py-4">
          ⋯☘︎⋯♯⋯登入排班系統⋯☘︎⋯♯⋯
        </p>

            {success && (
            <div className="mb-4 rounded bg-green-100 px-3 py-2 text-green-600">
                {success}
            </div>
            )}

            {error && (
            <div className="mb-4 rounded bg-red-100 px-3 py-2 text-red-600">
                {error}
            </div>
            )}


        <form onSubmit={handleLogin} className="space-y-5">

          <input
            type="text"
            placeholder="帳號"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3
                       hover:border-zinc-500
                       focus:border-zinc-500
                       focus:outline-none
                       transition duration-200"
          />

          <input
            type="password"
            placeholder="密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3
                       hover:border-zinc-500
                       focus:border-zinc-500
                       focus:outline-none
                       transition duration-200"
          />

          <button
            type="submit"
            className="w-full bg-stone-700 text-white rounded-lg p-3
                       border border-stone-700
                       hover:bg-stone-100
                       hover:text-black
                       transition duration-200"
          >
            登入
          </button>

        </form>
      </div>
    </div>
  );
}

export default LoginPage;