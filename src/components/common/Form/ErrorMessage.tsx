import React from 'react';
import { Text } from '~/components/atom';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Text color="tomato" size="xs">
      {message}
    </Text>
  );
};

export default React.memo(ErrorMessage);
