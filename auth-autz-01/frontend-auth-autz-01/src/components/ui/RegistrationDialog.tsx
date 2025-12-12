import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
} from "@chakra-ui/react";
import { PasswordInput } from "./password-input";

interface Props {
  registerModal: boolean;
  setRegisterModal: (modalState: boolean) => void;
}

const RegistrationDialog = ({ registerModal, setRegisterModal }: Props) => {
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
              {/* form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log(e);
                }}
              >
                <Field.Root>
                  <Field.Label>UserName</Field.Label>
                  <Input placeholder="UserName" size="xs" />
                </Field.Root>

                <Field.Root paddingY={5}>
                  <Field.Label>Password</Field.Label>
                  <PasswordInput placeholder="Password" size="xs" />
                </Field.Root>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
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
