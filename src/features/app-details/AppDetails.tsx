import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import Readme from './Readme';
import { fetchAppAsync, selectApp, selectStatus } from './appDetailsSlice';

const AppInfoWrapper = styled.div``;

const Image = styled.img`
  height: 50px;
  width: auto;
  margin-bottom: 16px;
`;

const Name = styled.h3`
  font-size: 16px;
`;
const Description = styled.p`
  font-size: 16px;
  margin-bottom: 16px;
`;

const Label = styled.span`
  font-weight: 600;
`;
interface IAppInfoRowProps {
  label: string;
}

const AppInfoRow: React.FC<IAppInfoRowProps> = ({ label, children }) => {
  return (
    <p>
      <Label>{label}:</Label> {children}
    </p>
  );
};

interface IAppInfoProps {
  app: IApp;
}

const AppInfo: React.FC<IAppInfoProps> = ({ app }) => {
  const { name, description, version, iconURL, url, author, readmeURL } = app;
  return (
    <AppInfoWrapper>
      {iconURL !== undefined ? <Image src={iconURL} alt={name} /> : null}
      <Name>{name}</Name>
      <Description>{description}</Description>
      {author !== undefined ? (
        <AppInfoRow label="Author">{author}</AppInfoRow>
      ) : null}
      <AppInfoRow label="Version">{version}</AppInfoRow>
      {url !== undefined ? (
        <AppInfoRow label="Website">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        </AppInfoRow>
      ) : null}

      {readmeURL !== undefined ? <Readme url={readmeURL} /> : null}
    </AppInfoWrapper>
  );
};

export default function AppDetails() {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(selectStatus);
  const app = useAppSelector(selectApp);

  const urlParams = useParams();
  const slug = urlParams.slug || '';

  React.useEffect(() => {
    dispatch(fetchAppAsync(slug));
  }, [dispatch, slug]);

  return (
    <>
      {status === 'loading' ? <Spinner delay={300} /> : null}
      {status === 'idle' && app !== undefined ? <AppInfo app={app} /> : null}
      {status === 'failed' ? (
        <ErrorMessage error={error}>
          Something bad happened while loading application info
        </ErrorMessage>
      ) : null}
    </>
  );
}
