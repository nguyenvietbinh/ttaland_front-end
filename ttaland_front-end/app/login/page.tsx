'use client'
import { FormEvent } from "react";
import BackButton from "@/components/element/back_button";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: LoginFormData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };
    
    console.log('Login data:', data);
    // Xử lý đăng nhập ở đây (gọi API, xác thực, etc.)
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <BackButton/>
      <div className="card w-full max-w-md shadow-2xl bg-gray-800">
        <div className="card-body">
          <h1 className="text-2xl font-bold text-center">Đăng nhập</h1>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="form-control flex justify-between">
              <label className="label">
                <span className="label-text">Email:</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Nhập email của bạn"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-4 flex justify-between">
              <label className="label">
                <span className="label-text">Mật khẩu:</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Nhập mật khẩu"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn bg-gray-700 text-gray-300 font-light w-full">
                Đăng nhập
              </button>
            </div>
          </form>
          <div className="text-center flex justify-between mt-4">
            <a href="/login/quen_mat_khau" className="link link-hover text-sm">
              Quên mật khẩu?
            </a>
            <a href="/dang_ki" className="link link-hover text-sm">
              Chưa có tài khoản?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}