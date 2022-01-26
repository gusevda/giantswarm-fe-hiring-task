import styled from 'styled-components';

const Button = styled.button`
  display: block;
  color: ${(props) => props.theme.colors['slate-700']};
  border-radius: 4px;

  &:hover {
    color: ${(props) => props.theme.colors['slate-900']};
  }

  &:focus,
  &:active {
    border: 1px solid ${(props) => props.theme.colors['slate-700']};
  }
`;

export default Button;
