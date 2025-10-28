import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import { loginUser } from "@/services/apiClient";
import { useNavigate } from "react-router-dom";
import { GridLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";
import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formStatus, setFormStatus] = useState({ success: false, message: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const notify = ({
    message = "",
    type = "default",
    duration = 6000,
  }: {
    message: string;
    type: "success" | "error" | "loading" | "default";
    duration?: number;
  }) => {
    if (type in toast) {
      (toast[type as keyof typeof toast] as Function)(message, {
        duration,
        position: "bottom-right",
      });
    } else {
      toast(message, {
        duration,
        position: "bottom-right",
      });
    }
  };
  
  async function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    const credentials = {
      email: values.email,
      password: values.password,
    };

    try {
      setLoading(true);
      const response = await loginUser(credentials);
      console.log(response);
      console.log(credentials);

      if (!response || !response.accessToken) {
        setFormStatus({
          success: false,
          message: "Invalid login credentials. Please try again.",
        });

        setLoading(false);
        return;
      }
      if (response.error) {
        notify({
          message:
            typeof response.error === "string"
              ? response.error
              : JSON.stringify(response.error),
          type: "error",
          duration: 3000,
        });
      }
      // Dispatch login action with user and token
      dispatch(
        login({
          user: {
            email: response.user.email || "",
            username: response.user.username || "",
            role: response.user.role || "",
          },
          accessToken: response.accessToken,
        })
      );
      notify({
        message: "Logged in successfully!",
        type: "success",
        duration: 3000,
      });
      //Set Token to local storage
      localStorage.setItem("token", response.accessToken);
      setFormStatus({ success: true, message: "Logged in successfully!" });
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setFormStatus({
        success: false,
        message: "Something went wrong. Please try again.",
      });
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <GridLoader color="#d64218" size={10} />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onLoginSubmit)}
            className="space-y-4"
          >
            {/* Display Success/Error Message */}
            {formStatus.message && (
              <div
                className={`text-center text-sm p-2 rounded-md ${
                  formStatus.success &&
                    "bg-green-200 text-green-700"
                    // : "bg-red-200 text-red-700"
                }`}
              >
                {formStatus.message}
              </div>
            )}
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className="bg-white/50 dark:bg-gray-800/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                        className="bg-white/50 dark:bg-gray-800/50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 bg-transparent border-0 right-0 pr-3 flex items-center text-gray-700 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 opacity-70 hover:opacity-100" />
                        ) : (
                          <Eye className="h-4 w-4 opacity-70 hover:opacity-100" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                      <span className="text-sm text-red-600"> This functionality is disabled by the owner .</span>
            <Button type="submit" className="text-white w-full" >
              Log in
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
