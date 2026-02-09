import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import p1 from "../../assets/login1.avif";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const navigate = useNavigate();

  /*  const {
    data: user,
    isLoading: isUserLoading,
  } = useUserInfoQuery(undefined, {
    skip: true, 
  });
 */
  const onSubmit = async (data: any) => {
    try {
      const res = await login(data).unwrap();
      if (res.success) {
        toast.success("User logged in successfully");

        navigate("/");
      }
      /* if (res.data?.user?.role) {
          navigate(`/${res.data.user.role.toLowerCase()}`);
        } else {
          navigate("/");
        } */
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  /*  const loadingErrorUI = handleLoadingError(
    isLoginLoading || isUserLoading,
    false
  );
  if (loadingErrorUI) return loadingErrorUI; */

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-6 md:p-8 space-y-6 w-full"
            >
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your account
                </p>
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        required
                        {...field}
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
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <Link
                        to="/"
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Login
              </Button>

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </form>
          </Form>

          <div className="bg-muted relative hidden md:block">
            <img
              src={p1}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
