import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
} from "@chakra-ui/react";
 
import { useForm } from "react-hook-form";
import apiClient from "@/service.ts/apiClient";
import { toaster } from "./ui/toaster";
import { PasswordInput } from "./ui/password-input";
 

interface Props {
  setLogin: (loginStatus: boolean) => void;
  loginModal: boolean;
  setLoginModal: (modalState: boolean) => void;
}

interface FormValues {
  username: string;
  password: string;
}

const LoginDialog = ({ setLogin, loginModal, setLoginModal }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const showToast = (description: string, type: "success" | "error") => {
    toaster.create({ description, type, closable: true });
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await apiClient.post("/api/login", data);

      console.log("Login response:", res.data); // DEBUG

      // Check if API indicates success
      if (!res.data.success) {
        return showToast(res.data.message || "Invalid username or password", "error");
      }

      // Extract token and user
      const token = res.data.data.accessToken;
      const user = res.data.data.user;

      if (!token) {
        return showToast("Invalid username or password", "error");
      }

      // Save token and user in localStorage
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      showToast(`Welcome, ${user.username}!`, "success");
      setLogin(true);
      setLoginModal(false);
      reset();
    } catch (error: any) {
      console.error("Login error:", error);
      const message = error?.response?.data?.message || "Login failed";
      showToast(message, "error");
    }
  };

  return (
    <Dialog.Root
      placement="center"
      lazyMount
      open={loginModal}
      onOpenChange={(e) => setLoginModal(e.open)}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Login</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <Field.Root invalid={!!errors.username}>
                  <Field.Label>Username</Field.Label>
                  <Input
                    {...register("username", { required: "Username is required" })}
                    placeholder="Username"
                    size="xs"
                    autoComplete="off"
                  />
                  <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root paddingY={5} invalid={!!errors.password}>
                  <Field.Label>Password</Field.Label>
                  <PasswordInput
                    {...register("password", { required: "Password is required" })}
                    placeholder="Password"
                    size="xs"
                    autoComplete="new-password"
                  />
                  <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
                </Field.Root>

                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline" onClick={() => setLoginModal(false)}>
                      Cancel
                    </Button>
                  </Dialog.ActionTrigger>
                  <Button type="submit">Login</Button>
                </Dialog.Footer>
              </form>
            </Dialog.Body>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default LoginDialog;
