import styled from 'styled-components';
import { Box, Container } from '../styles/components';
import { forTablet } from '../styles';

const StyledFooter = styled.footer`
  padding: 8px 0;
  color: white;
  background-color: ${(props) => props.theme.colors['slate-700']};
  font-size: 14px;

  ${forTablet} {
    padding: 16px 0;
  }
`;

const Footer = () => (
  <StyledFooter>
    <Container>Hiring Task, 2022</Container>
  </StyledFooter>
);

export default Footer;
