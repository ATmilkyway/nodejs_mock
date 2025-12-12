import logo from "@/assets/react.svg";
import { Avatar, Button, HStack, Image, Menu, Portal } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  setRegisterModal: (modalState: boolean) => void;
}

const NavBar = ({ setRegisterModal }: Props) => {
  const [isLogin, setLogin] = useState(false);
  return (
    <HStack padding={5} justifyContent="space-between">
      <Image src={logo} alt="" />
      {isLogin ? (
        <Menu.Root positioning={{ placement: "right-end" }}>
          <Menu.Trigger rounded="full" focusRing="outside">
            <Avatar.Root size="sm">
              <Avatar.Fallback name="Segun Adebayo" />
              <Avatar.Image src="https://bit.ly/sage-adebayo" />
            </Avatar.Root>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="account">Logout</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      ) : (
        <HStack>
          <Button variant="ghost" onClick={() => setRegisterModal(true)}>
            Register
          </Button>
          <Button variant="ghost">Singin</Button>
        </HStack>
      )}
    </HStack>
  );
};

export default NavBar;
