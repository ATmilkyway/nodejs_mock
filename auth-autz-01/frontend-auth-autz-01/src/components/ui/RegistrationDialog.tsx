import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

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
              <p></p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Save</Button>
            </Dialog.Footer>
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
