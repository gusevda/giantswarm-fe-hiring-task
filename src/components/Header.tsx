import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Box, Container } from '../styles/components';
import Navigation from './Navigation';
import { forTablet } from '../styles';
import mobileLogoSrc from '../assets/images/gs-logo-sq.svg';
import desktopLogoSrc from '../assets/images/gs-logo.svg';
import { AppRoutes } from '../constants/routes';

const StyledHeader = styled.header`
  width: 100%;
  position: fixed;
  z-index: 1;
  bottom: 0;
  padding: 16px 0;
  background-color: ${(props) => props.theme.colors['slate-50']};
  border-top: 1px solid ${(props) => props.theme.colors['slate-100']};

  ${forTablet} {
    position: static;
    border-top: none;
    border-bottom: 1px solid ${(props) => props.theme.colors['slate-100']};
  }
`;

const MobileLogo = styled.img`
  display: block;
  width: 32px;
  height: 32px;

  ${forTablet} {
    display: none;
  }
`;

const DesktopLogo = styled.img`
  display: none;
  width: 160px;
  height: 29px;

  ${forTablet} {
    display: block;
  }
`;

const Header = () => (
  <StyledHeader>
    <Container>
      <Box>
        <Link to={AppRoutes.Home}>
          <DesktopLogo
            src={desktopLogoSrc}
            width="160"
            height="29"
            alt="Giant Swarm"
          />
          <MobileLogo
            src={mobileLogoSrc}
            width="32"
            height="32"
            alt="Giant Swarm"
          />
        </Link>
        <Navigation />
      </Box>
    </Container>
  </StyledHeader>
);

export default Header;
