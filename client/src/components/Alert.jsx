import React from 'react';
import {
  Alert as ChakraAlert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

interface Alert {
  status: 'info' | 'warning' | 'success' | 'error';
  title: string;
  text: string;
  withCloseButton: boolean;
}

export default function AlertMessage({
  status,
  title = '',
  text,
  withCloseButton = false,
}: Alert) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '15px',
      }}
    >
      <ChakraAlert status={status}>
        <AlertIcon />
        {title && <AlertTitle mr={2}>{title}</AlertTitle>}
        <AlertDescription>{text}</AlertDescription>
        {withCloseButton && (
          <CloseIcon
            position="absolute"
            right="15px"
            top="50%"
            transform="translate(0, -50%);"
          />
        )}
      </ChakraAlert>
    </div>
  );
}
