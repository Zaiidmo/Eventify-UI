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
import { registerUser } from "@/services/apiClient";
import { useNavigate } from "react-router-dom";
import { GridLoader } from "react-spinners";

const formSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formStatus, setFormStatus] = useState({ success: false, message: "" });
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const userData = {
      username: values.username,
      email: values.email,
      password: values.password,
      role: "organizer",
    };
    try {
      setLoading(true);
      registerUser(userData);
      setFormStatus({ success: true, message: "Registration successful!" });
      setLoading(false);
      alert("Registration successful!");
      Navigate("/login");
    } catch (error) {
      setFormStatus({
        success: false,
        message: "Something went wrong. Please try again.",
      });
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <GridLoader color="#D64218" size={15} />
      </div>
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {/* Display Success/Error Message */}
        {formStatus.message && (
          <div
            className={`text-center text-sm p-2 rounded-md ${
              formStatus.success
                ? "bg-green-200 text-green-700"
                : "bg-red-200 text-red-700"
            }`}
          >
            {formStatus.message}
          </div>
        )}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="johndoe"
                  {...field}
                  className="bg-white/50 border-0 dark:bg-gray-800/50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="john@example.com"
                  {...field}
                  className="bg-white/50 border-0 dark:bg-gray-800/50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    {...field}
                    className="bg-white/50 border-0 dark:bg-gray-800/50 pr-10"
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="********"
                    {...field}
                    className="bg-white/50 border-0 dark:bg-gray-800/50 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showPassword)}
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
        <div>
          <span className="text-sm text-red-600"> This functionality is disabled by the owner .</span>
          <Button
            type="submit"
            className="w-full text-white bg-primary rounded-md"
            disabled={true}
          >
            Sign Up
          </Button>
        </div>{" "}
      </form>
    </Form>
  );
}
