import logo from "@/assets/react.svg";
import { Avatar, Button, HStack, Image, Menu, Portal } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  isLogin: boolean;
  setRegisterModal: (modalState: boolean) => void;
}

const NavBar = ({ isLogin, setRegisterModal }: Props) => {
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
          <Button variant="ghost">Log in</Button>
        </HStack>
      )}
    </HStack>
  );
};

export default NavBar;
