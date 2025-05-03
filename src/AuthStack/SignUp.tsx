import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import "../styles.css";
import { CircleUser, Home, KeyRoundIcon, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import L_pic from "../assets/Abstraction.png";
import logo from "../assets/Logo.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    gender: "",
    birthdate: null as Date | null,
  });
  const isFormValid = Object.values(formData).every(
    (v) => v !== "" && v !== null
  );
  const validateForm = (data: typeof formData) => {
    if (Object.values(data).some((v) => v === "" || v === null)) {
      return "Please fill in all fields.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return "Please enter a valid email address.";
    }

    if (data.password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    return null; // No error
  };
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    console.log("Submitting:", formData);
  };

  return (
    <div className="bg-[#92CBCE] h-screen grid lg:grid-cols-3 basis-1">
      <img src={logo} alt="" className="absolute top-5 right-50" />
      <div className="hidden relative lg:block shrink">
        <img src={L_pic} alt="" className="absolute bottom-0 left-16" />
      </div>
      <div className="bg-white h-screen col-span-2 lg:rounded-tl-[36px] lg:rounded-bl-[36px] flex justify-center">
        <div className="w-[600px] flex flex-col  py-30 gap-10">
          {error && <Alert message={error} />}
          <h1 className="font-bold text-3xl">Create Account</h1>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-5">
              <div className="grid gap-5">
                <Inputs
                  type="text"
                  placeholder="First Name"
                  icon={<CircleUser color="gray" size={28} />}
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
                <Inputs
                  type="email"
                  placeholder="Email Address"
                  icon={<Mail color="gray" size={28} />}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <Inputs
                  type="password"
                  placeholder="Password"
                  icon={<KeyRoundIcon color="gray" size={28} />}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <Inputs
                  type="text"
                  placeholder="Home Address"
                  icon={<Home color="gray" size={28} />}
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-5">
                <Inputs
                  type="text"
                  placeholder="Last Name"
                  icon={<CircleUser color="gray" size={28} />}
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
                <Inputs
                  type="number"
                  placeholder="Phone Number"
                  icon={<Phone color="gray" size={28} />}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />

                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, gender: value })
                  }
                >
                  <SelectTrigger className="w-[100%]">
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !formData.birthdate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {formData.birthdate ? (
                        format(formData.birthdate, "PPP")
                      ) : (
                        <span>Date of Birth</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.birthdate ?? undefined}
                      onSelect={(date) =>
                        setFormData({ ...formData, birthdate: date || null })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <button
              disabled={!isFormValid}
              className={`p-2 rounded-2xl font-bold text-2xl text-white transition 
    ${
      isFormValid
        ? "bg-[#5BBAC9] hover:bg-[#48A9B8]"
        : "bg-gray-400 cursor-not-allowed"
    }`}
            >
              Create Account
            </button>
          </form>

          <div className="text-center text-base">
            <span className="text-gray-500">Already have an account? </span>
            <span
              className="text-[#5BBAC9] hover:text-[#48A9B8] font-semibold cursor-pointer hover:underline transition-colors duration-200"
              onClick={() => navigate("/")}
            >
              Log In
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const Inputs = ({
  type,
  placeholder,
  icon,
  value,
  onChange,
}: {
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="border-b flex gap-3">
    {icon}
    <input
      type={type}
      className="p-1 text-lg number w-full"
      placeholder={placeholder}
      name={value}
      value={value}
      onChange={onChange}
    />
  </div>
);

const Alert = ({ message }: { message: string }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
    {message}
  </div>
);
