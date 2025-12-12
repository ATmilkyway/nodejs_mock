import logo from "@/assets/react.svg";
import { Avatar, Button, HStack, Image, Menu, Portal } from "@chakra-ui/react";

interface Props {
  isLogin: boolean;
  user?: { username: string };
  setRegisterModal: (modalState: boolean) => void;
  setLoginModal: (modalState: boolean) => void;
}

const NavBar = ({ isLogin, user, setRegisterModal, setLoginModal }: Props) => {
  return (
    <HStack padding={5} justifyContent="space-between">
      <Image src={logo} alt="Logo" />
      {isLogin ? (
        <Menu.Root positioning={{ placement: "right-end" }}>
          <Menu.Trigger rounded="full" focusRing="outside">
            <Avatar.Root size="sm">
              <Avatar.Fallback name={user?.username || "User"} />
            </Avatar.Root>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item
                  value="logout"
                  onSelect={() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("user");
                    window.location.reload(); // simple page reload to reset state
                  }}
                >
                  Logout
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      ) : (
        <HStack>
          <Button variant="ghost" onClick={() => setRegisterModal(true)}>
            Register
          </Button>
          <Button variant="ghost" onClick={() => setLoginModal(true)}>
            Log in
          </Button>
        </HStack>
      )}
    </HStack>
  );
};

export default NavBar;
