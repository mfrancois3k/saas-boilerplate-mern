// custom components
import Profile from "../components/settings/Profile";
import Subscription from "../components/settings/Subscription";
import ChangePassword from "../components/settings/ChangePassword";
import DeleteAccount from "../components/settings/DeleteAccount";

// styled components
import { Container, Heading } from "@chakra-ui/react";

const Settings = () => {
  return (
    <Container maxW="container.xl">
      <Heading mb={6}>Settings</Heading>
      <Profile />
      <Subscription />
      <ChangePassword />
      <DeleteAccount />
    </Container>
  );
};

export default Settings;
