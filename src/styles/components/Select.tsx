import styled from 'styled-components';
import { forTablet } from '..';

const Select = styled.select`
  padding: 4px 8px;
  border: 1px solid ${(props) => props.theme.colors['slate-500']};
  border-radius: ${(props) => props.theme.borderRadius};

  ${forTablet} {
    padding: 8px;
  }

  &:hover {
    border-color: ${(props) => props.theme.colors['slate-700']};
  }
`;

export default Select;
