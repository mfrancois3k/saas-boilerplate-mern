import { useEffect } from "react";
import saasApi from "../api/saas";
import { Container, Flex, Box, Heading, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";

const Dashboard = () => {
  const auth = useSelector((state) => state.firebase.auth);
  const user = useSelector((state) => state.user);

  return (
    <Container>
      <Flex>
        <Box>
          <Heading as="h1" mb="2">
            Dashboard
          </Heading>
          <Text>
            {!isLoaded(auth) ? (
              <span>Loading...</span>
            ) : isEmpty(auth) ? (
              "Not logged in"
            ) : (
              "Logged in"
            )}
          </Text>
          <Text>Name: {user.name}</Text>
        </Box>
      </Flex>
    </Container>
  );
};

export default Dashboard;
