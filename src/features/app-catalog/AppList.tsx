import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../constants/routes';
import { createPath } from '../../utils';
import { Box, List, ListItem } from '../../styles/components';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { forTablet } from '../../styles';

const StyledList = styled(List)`
  display: block;
  width: 100%;
`;

const StyledListItem = styled(ListItem)`
  border-bottom: 1px solid ${(props) => props.theme.colors['slate-100']};
  border-top: 1px solid transparent;
  padding: 16px 0;
  cursor: pointer;

  ${forTablet} {
    padding: 16px;
  }

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    ${forTablet} {
      background-color: ${(props) => props.theme.colors['slate-50']};
    }
  }
`;

const Name = styled.h3`
  font-size: 16px;
`;
const Description = styled.p`
  font-size: 16px;
`;

const Author = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin-top: 4px;
  color: ${(props) => props.theme.colors['slate-700']};
`;

const Meta = styled(List)`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  font-size: 14px;
  color: ${(props) => props.theme.colors['slate-700']};
`;

const MetaItem = styled(ListItem)`
  margin-right: 16px;

  &:last-child {
    margin-right: 0;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  display: inline-block;
  vertical-align: baseline;
`;

interface IAppProps {
  app: IApp;
}

const App: React.FC<IAppProps> = ({ app }) => {
  const navigate = useNavigate();
  const { slug, name, description, version, author, url } = app;

  function handleClick(e: React.MouseEvent) {
    if (!(e.target instanceof HTMLAnchorElement)) {
      e.preventDefault();
      navigate(createPath(AppRoutes.AppDetails, { slug }));
    }
  }

  return (
    <StyledListItem onClick={handleClick}>
      <Box direction="column">
        <Name>{name}</Name>
        <Description>{description}</Description>
        {author !== undefined ? <Author title="Author">{author}</Author> : null}
        <Meta>
          <MetaItem title="Version">{version}</MetaItem>
          {url !== undefined ? (
            <MetaItem>
              <a href={url} target="_blank" rel="noopener noreferrer">
                <StyledIcon icon={faExternalLinkAlt} size="sm" /> Website
              </a>
            </MetaItem>
          ) : null}
        </Meta>
      </Box>
    </StyledListItem>
  );
};

interface IAppListProps {
  apps: IApp[];
}

const AppList: React.FC<IAppListProps> = ({ apps }) => {
  return (
    <StyledList data-testid="app-list">
      {apps.map((app) => (
        <App key={app.id} app={app} />
      ))}
    </StyledList>
  );
};

export default AppList;
