import styled from 'styled-components';
import { forTablet, forDesktop } from '..';

const Container = styled.div`
  padding: 0 16px;

  ${forTablet} {
    padding-left: 32px;
    padding-right: 32px;
  }

  ${forDesktop} {
    max-width: 1216px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 0;
    padding-right: 0;
  }
`;

export default Container;
