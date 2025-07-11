'use client'
import { FormEvent } from "react";
import BackButton from "@/components/element/back_button";

interface LoginFormData {
  email: string;
  password: string;
}

export default function SignUp() {
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
      <BackButton href="/"/>
      <div className="card w-full max-w-md shadow-2xl bg-gray-800">
        <div className="card-body">
          <h1 className="text-2xl font-bold text-center">Đăng kí</h1>
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
                Đăng kí
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}