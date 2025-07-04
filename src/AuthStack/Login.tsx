import React from "react";
import "../styles.css";
import { KeyRoundIcon, Mail } from "lucide-react";
import L_pic from "../assets/Abstraction.png";
import logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoginMutation } from "@/api/requests/auth.request";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [login] = useLoginMutation();

  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) return "Fill all fields";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Input a valid email";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    login({
      email: formData.email,
      password: formData.password,
    })
      .unwrap()
      .then((data:any) => {
        toast.success("Logged in successfully");
        console.log("Login Successful:", data);

        localStorage.setItem("token", data.data.accessToken); 
        localStorage.setItem("user", JSON.stringify(data.data.user)); 
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log("Login error:", JSON.stringify(error, null, 2));
        toast.error(error.data?.error || "An error occurred");
      });
  };

  return (
    <div className="bg-[#92CBCE] h-screen grid lg:grid-cols-3 basis-1">
      <ToastContainer />
      <img src={logo} alt="" className="absolute top-5 right-50" />
      <div className="hidden relative lg:block shrink">
        <img src={L_pic} alt="" className="absolute bottom-0 left-16" />
      </div>
      <div className="bg-white h-screen col-span-2 lg:rounded-tl-[36px] lg:rounded-bl-[36px] flex justify-center">
        <div className="w-[600px] flex flex-col justify-center gap-10">
          <h1 className="font-bold text-3xl">Sign In</h1>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex gap-3 border-b">
              <Mail color="gray" size={28} />
              <input
                type="text"
                className="p-1 text-lg"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="flex gap-3 border-b">
              <KeyRoundIcon color="gray" size={28} />
              <input
                type="password"
                className="p-1 text-lg"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <button className="bg-[#5BBAC9] hover:bg-[#48A9B8] text-white font-bold text-2xl p-2 rounded-2xl transition-colors duration-200">
              Sign In
            </button>
          </form>

          <div className="text-center text-base">
            <span className="text-gray-500">No Account? </span>
            <span
              className="text-[#5BBAC9] hover:text-[#48A9B8] font-semibold cursor-pointer hover:underline transition-colors duration-200"
              onClick={() => navigate("/Signup")}
            >
              Create One
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
