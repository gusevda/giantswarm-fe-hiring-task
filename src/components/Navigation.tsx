import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { To, useNavigate } from 'react-router-dom';
import { Button, List, ListItem } from '../styles/components';
import { forTablet } from '../styles';
import { AppRoutes } from '../constants/routes';
import { useOnClickOutside } from 'usehooks-ts';

const Nav = styled.nav``;

interface INavMenuProps {
  isOpen: boolean;
}

const NavMenu = styled(List)<INavMenuProps>`
  position: absolute;
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  padding: 8px 16px;
  right: 0;
  bottom: 100%;
  background: ${(props) => props.theme.colors['slate-100']};

  ${forTablet} {
    position: static;
    display: flex;
    width: auto;
    height: auto;
    background: unset;
    flex-direction: row;
    align-items: normal;
    margin: 0 -16px;
    padding: 4px 0 0;
  }

  ${ListItem} {
    margin: 8px 0;
    ${forTablet} {
      margin: 0 16px;
    }
  }
`;

interface IMenuButtonProps {
  isActive: boolean;
}

const MenuButton = styled(Button)<IMenuButtonProps>`
  display: block;
  width: 32px;
  height: 32px;
  color: ${(props) =>
    props.isActive
      ? props.theme.colors['slate-900']
      : props.theme.colors['slate-700']};

  ${forTablet} {
    display: none;
  }
`;

const StyledLink = styled.a`
  font-weight: 600;
  color: ${(props) => props.theme.colors['slate-700']};

  &:hover {
    color: ${(props) => props.theme.colors['slate-900']};
  }
`;

const Navigation = () => {
  const navigate = useNavigate();
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const ref = React.useRef(null);
  useOnClickOutside(ref, handleClickOutside);

  function handleMenuButtonClick() {
    setMenuIsOpen(!menuIsOpen);
  }

  function handleClickOutside() {
    setMenuIsOpen(false);
  }

  function handleMenuItemClick(path: To) {
    setMenuIsOpen(false);
    navigate(path);
  }

  return (
    <Nav ref={ref}>
      <NavMenu isOpen={menuIsOpen}>
        <ListItem>
          <StyledLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleMenuItemClick(AppRoutes.AppCatalog);
            }}
          >
            App Catalog
          </StyledLink>
        </ListItem>
      </NavMenu>
      <MenuButton isActive={menuIsOpen} onClick={handleMenuButtonClick}>
        <FontAwesomeIcon icon={faBars} size="lg" />
      </MenuButton>
    </Nav>
  );
};

export default Navigation;
