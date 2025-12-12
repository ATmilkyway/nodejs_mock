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

interface Props {
  registerModal: boolean;
  setRegisterModal: (modalState: boolean) => void;
}

interface FormValues {
  username: string;
  password: string;
}

const RegistrationDialog = ({ registerModal, setRegisterModal }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    setRegisterModal(false);
    reset();
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <Field.Root invalid={!!errors.username}>
                  <Field.Label>UserName</Field.Label>
                  <Input
                    {...register("username", {
                      required: "Username is required",
                    })}
                    placeholder="UserName"
                    size="xs"
                  />
                  <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
                </Field.Root>

                {/* Password */}
                <Field.Root paddingY={5} invalid={!!errors.password}>
                  <Field.Label>Password</Field.Label>
                  <PasswordInput
                    {...register("password", {
                      required: "Password is required",
                    })}
                    placeholder="Password"
                    size="xs"
                  />
                  <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
                </Field.Root>

                {/* Footer Buttons */}
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setRegisterModal(false)}
                    >
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
