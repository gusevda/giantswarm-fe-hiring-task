import styled from 'styled-components';
import { forTablet } from '..';

const SectionHeading = styled.h1`
  font-size: 24px;
  margin-bottom: 36px;

  ${forTablet} {
    margin-bottom: 48px;
  }
`;

export default SectionHeading;
