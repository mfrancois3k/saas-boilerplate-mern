import { Text, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export const MenuItem = ({
  children,
  isLast,
  to = "/",
  button = false,
  ...rest
}) => {
  return (
    <RouterLink to={to}>
      {button ? (
        <Button colorScheme="blue">{children}</Button>
      ) : (
        <Text display="block" {...rest}>
          {children}
        </Text>
      )}
    </RouterLink>
  );
};
