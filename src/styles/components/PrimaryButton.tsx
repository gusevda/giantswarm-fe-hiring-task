import styled from 'styled-components';
import { Button } from '.';
import { forTablet } from '..';

const PrimaryButton = styled(Button)`
  padding: 4px 8px;
  background-color: ${(props) => props.theme.colors['amber-600']};
  border: 1px solid ${(props) => props.theme.colors['amber-600']};
  color: white;

  ${forTablet} {
    padding: 8px 16px;
  }

  &:hover {
    color: white;
    border-color: ${(props) => props.theme.colors['amber-700']};
  }

  &:focus {
    border-color: ${(props) => props.theme.colors['amber-800']};
  }

  &:active {
    background-color: ${(props) => props.theme.colors['amber-700']};
  }
`;

export default PrimaryButton;
