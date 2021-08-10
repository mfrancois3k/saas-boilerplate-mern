import React from 'react';
import { Container, Flex, Box, Heading, Text } from '@chakra-ui/react';

const Home = () => {
  return (
    <Container>
      <Flex>
        <Box>
          <Heading as="h1" mb="2">
            Start your project now
          </Heading>
          <Text>Firebase Auth, Chakra UI</Text>
        </Box>
      </Flex>
    </Container>
  );
};

export default Home;
