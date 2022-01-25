import styled from 'styled-components';
import { forTablet } from '..';

const Section = styled.section`
  padding: 32px 0;

  ${forTablet} {
    padding: 64px 0;
  }
`;

export default Section;
