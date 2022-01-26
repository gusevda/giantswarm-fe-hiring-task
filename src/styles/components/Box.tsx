import styled from 'styled-components';

interface IBoxProps {
  direction?: 'row' | 'column';
}

const Box = styled.div<IBoxProps>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: space-between;
`;

Box.defaultProps = {
  direction: 'row',
};

export default Box;
