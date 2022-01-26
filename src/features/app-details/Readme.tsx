import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import {
  fetchReadmeAsync,
  selectReadme,
  selectReadmeStatus,
} from './appDetailsSlice';
import { forTablet } from '../../styles';

const ReadmeWrapper = styled.div`
  margin: 32px -16px 0;
  border-top: 1px solid ${(props) => props.theme.colors['slate-300']};
  border-bottom: 1px solid ${(props) => props.theme.colors['slate-300']};

  ${forTablet} {
    margin-left: 0;
    margin-right: 0;
    border-radius: ${(props) => props.theme.borderRadius};
    overflow: hidden;
    border: 1px solid ${(props) => props.theme.colors['slate-300']};
  }
`;

const ReadmeHeading = styled.div`
  padding: 8px 16px;
  font-weight: 700;
  font-size: 14px;
  background-color: ${(props) => props.theme.colors['slate-200']};
`;

const ReadmeContent = styled.div`
  padding: 16px;
  min-height: 100px;
`;

interface IReadmeProps {
  url: string;
}

const Readme: React.FC<IReadmeProps> = ({ url }) => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(selectReadmeStatus);
  const readme = useAppSelector(selectReadme);

  React.useEffect(() => {
    dispatch(fetchReadmeAsync(url));
  }, [dispatch, url]);

  return (
    <ReadmeWrapper>
      <ReadmeHeading>README.MD</ReadmeHeading>
      <ReadmeContent>
        {status === 'loading' ? <Spinner delay={300} /> : null}
        {status === 'idle' && readme !== undefined ? (
          <ReactMarkdown>{readme}</ReactMarkdown>
        ) : null}
        {status === 'failed' ? (
          <ErrorMessage error={error}>Failed to load README</ErrorMessage>
        ) : null}
      </ReadmeContent>
    </ReadmeWrapper>
  );
};

export default Readme;
