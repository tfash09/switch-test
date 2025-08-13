import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/store";
import { loginSuccess, loginFailure } from "@/store/features/auth/authSlice";
import TextBox from "@/components/custom/TextBox";
import Button from "@/components/custom/Button";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { loginFormData } from "@/lib/formData";
import { showToast } from "@/lib/toast";
import { useAppSelector } from "@/store/store";
import { dummyUser } from "@/data/mockData";
import type { LoginDetails } from "@/lib/interfaces";
import { useAuth } from "@/hooks/useAuth";

const LoginPage: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { login } = useAuth();

  const schema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  if (isAuthenticated) {
    navigate("/account-summary");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<loginFormData> = async (data: LoginDetails) => {
    try {
      setLoader(true);

      const response = await login(data.email, data.password);

      if (response.success) {
        showToast(response.message, "success");
        dispatch(loginSuccess(dummyUser));
        navigate("/account-summary");
      } else {
        showToast(response.message, "error");
      }
    } catch {
      dispatch(loginFailure("Login failed"));
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl font-bold text-gary-900">User Authentication</h2>
      <p className="text-sm">Login to access your dashboard.</p>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <TextBox
            id="email"
            type="email"
            required
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        <div className="mb-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <TextBox
            id="password"
            required
            type={showPassword ? "text" : "password"}
            {...register("password")}
            error={errors.password?.message}
            suffixIcon={showPassword ? "visibility_off" : "visibility"}
            onIconClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <div>
          <Button
            loading={loader}
            type="submit"
            variant="default"
            className="w-full mt-2"
          >
            Login
          </Button>
        </div>
        <div className="text-center h-[5rem] w-full px-3 py-2  bg-[#f1f5f8] text-primary mt-4 rounded-sm">
          <p className="text-lg ">Login Credentials</p>
          <p className="text-sm ">Email: test@interswitch.com</p>
          <p className="text-sm ">Password: Pass@123</p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
