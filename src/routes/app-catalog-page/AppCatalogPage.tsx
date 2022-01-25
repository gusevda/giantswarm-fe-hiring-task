import React from 'react';
import AppCatalog from '../../features/app-catalog/AppCatalog';
import { Container, Section } from '../../styles/components';

export default function AppCatalogPage() {
  return (
    <Section>
      <Container>
        <AppCatalog />
      </Container>
    </Section>
  );
}
