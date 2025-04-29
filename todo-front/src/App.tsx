import "./App.css";
import LoginForm from "./pages/LoginForm";
import { Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./pages/RegisterForm";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import TodoPage from "./pages/TodoPage";
function App() {
  const token = useSelector((state: RootState) => state.auth.token);
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route
        path="/tasks"
        element={token ? <TodoPage /> : <Navigate to={"/"} />}
      />
      <Route path="*" element={<Navigate to="/tasks" />} />
    </Routes>
  );
}
export default App;
