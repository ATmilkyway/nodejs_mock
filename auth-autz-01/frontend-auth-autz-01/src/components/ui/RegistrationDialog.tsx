import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
} from "@chakra-ui/react";
import { PasswordInput } from "./password-input";
import { useForm } from "react-hook-form";
import apiClient from "@/service.ts/apiClient";
import { toaster } from "./toaster";

interface Props {
  setLogin: (loginStatus: boolean) => void;
  registerModal: boolean;
  setRegisterModal: (modalState: boolean) => void;
}

interface FormValues {
  username: string;
  password: string;
}

const RegistrationDialog = ({ setLogin, registerModal, setRegisterModal }: Props) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();

  const showToast = (description: string, type: "success" | "error") => {
    toaster.create({ description, type, closable: true });
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await apiClient.post("/api/register", data);

      if (!res) {
        return showToast("Error while creating user", "error");
      }

      showToast("User created successfully", "success");
      setLogin(true);
      setRegisterModal(false);
      reset();
    } catch (error: any) {
      console.error("API error:", error);
      const message = error?.response?.data?.message || "User already exists";
      showToast(message, "error");
    }
  };

  return (
    <Dialog.Root
      placement="center"
      lazyMount
      open={registerModal}
      onOpenChange={(e) => setRegisterModal(e.open)}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Registration Form</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                {/* Username */}
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

                {/* Password */}
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

                {/* Footer */}
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline" onClick={() => setRegisterModal(false)}>
                      Cancel
                    </Button>
                  </Dialog.ActionTrigger>
                  <Button type="submit">Register</Button>
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

export default RegistrationDialog;
