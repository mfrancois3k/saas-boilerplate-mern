import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, Box } from "@chakra-ui/react";

export default function Logo(props) {
  return (
    <Box {...props}>
      <Link
        as={RouterLink}
        to="/"
        fontSize="lg"
        fontWeight="bold"
        _hover={{ textDecoration: "none" }}
      >
        Logo SaaS
      </Link>
    </Box>
  );
}
