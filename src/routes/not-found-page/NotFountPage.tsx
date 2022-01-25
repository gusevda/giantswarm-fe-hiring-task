import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AppRoutes } from '../../constants/routes';
import { Container, Section } from '../../styles/components';

const Content = styled.div`
  text-align: center;
  font-size: 18px;

  a:hover {
    text-decoration: underline;
  }
`;

const Heading = styled.h1`
  font-size: 64px;
  font-weight: 700;
  color: ${(props) => props.theme.colors['slate-600']};
`;

const Subheading = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: ${(props) => props.theme.colors['slate-600']};
  margin-bottom: 32px;
`;

export default function NotFoundPage() {
  return (
    <Section>
      <Container>
        <Content>
          <Heading>404</Heading>
          <Subheading>Requested page is not found</Subheading>
          Try going to <Link to={AppRoutes.Home}>Home page</Link>
        </Content>
      </Container>
    </Section>
  );
}
