import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Box } from '../styles/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors['slate-500']};

  > svg {
    animation: ${rotate} 2s linear infinite;
  }
`;

interface ISpinnerProps {
  delay?: number;
}

const Spinner: React.FC<ISpinnerProps> = ({ delay }) => {
  const [isVisible, setIsVisible] = React.useState(
    delay === undefined || delay === 0
  );

  React.useEffect(() => {
    if (delay === undefined || delay === 0) {
      return;
    }

    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  return isVisible ? (
    <Wrapper>
      <FontAwesomeIcon icon={faCircleNotch} size="2x" />
    </Wrapper>
  ) : null;
};

Spinner.defaultProps = {
  delay: 0,
};

export default Spinner;
