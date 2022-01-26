import React from 'react';
import AppDetails from '../../features/app-details/AppDetails';
import { Container, Section } from '../../styles/components';

export default function AppDetailsPage() {
  return (
    <Section>
      <Container>
        <AppDetails />
      </Container>
    </Section>
  );
}
