import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./NavBar";
import RegistrationDialog from "./components/ui/RegistrationDialog";
import { useState } from "react";

const App = () => {
  const [registerModal, setRegisterModal] = useState(false);

  const handleRegistrationModal = (modalState: boolean) => {
    setRegisterModal(modalState);
  };
  return (
    <>
      <RegistrationDialog
        registerModal={registerModal}
        setRegisterModal={handleRegistrationModal}
      />
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          sm: `"nav" "main"`,
          md: `"nav nav" "side main"`,
          lg: `"nav nav" "side main"`,
        }}
        templateColumns={{
          base: "1fr",
          md: "200px 1fr",
          lg: "200px 1fr",
        }}
      >
        <GridItem area="nav" bg="gray.50">
          <NavBar setRegisterModal={handleRegistrationModal} />
        </GridItem>
        <GridItem area="side" bg="green.100" hideBelow="md" height="80vh">
          Side
        </GridItem>
        <GridItem area="main" bg="orange.100">
          Main
        </GridItem>
      </Grid>
    </>
  );
};

export default App;
