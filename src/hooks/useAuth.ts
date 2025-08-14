import { logout } from "@/store/features/auth/authSlice";
import { useAppDispatch } from "@/store/store";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (email === "test@interswitch.com" && password === "Pass@123") {
      return { success: true, message: "Login successful" };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const logoutUser = () => {
    dispatch(logout());
    navigate("/login");
  };

  return {
    login,
    logoutUser,
  };
};
