import React from 'react';
import styled from 'styled-components';
import { Box } from '../styles/components';

interface IErrorMessageProps {
  error?: string;
}

const Title = styled.p`
  text-align: center;
  font-size: 16px;
  margin-bottom: 4px;
`;

const Message = styled.p`
  text-align: center;
  font-size: 12px;
  color: ${(props) => props.theme.colors['slate-600']};
`;

const ErrorMessage: React.FC<IErrorMessageProps> = ({ error, children }) => {
  return (
    <Box direction="column">
      <Title>{children}</Title>
      {error !== undefined ? <Message>{error}</Message> : null}
    </Box>
  );
};

export default ErrorMessage;
