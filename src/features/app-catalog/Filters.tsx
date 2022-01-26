import React from 'react';
import styled from 'styled-components';
import { forTablet } from '../../styles';
import { Box, Select } from '../../styles/components';

const Wrapper = styled.div`
  padding: 16px;
  margin: 0 -16px;
  background-color: ${(props) => props.theme.colors['slate-200']};
  border-top: 1px solid ${(props) => props.theme.colors['slate-300']};
  border-bottom: 1px solid ${(props) => props.theme.colors['slate-300']};

  ${forTablet} {
    margin: 0;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.colors['slate-300']};
  }
`;

const Headings = styled(Box)`
  margin-bottom: 16px;
  align-items: baseline;
`;

const Heading = styled.h3`
  font-size: 16px;
`;

const FilterWrapper = styled.div`
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.colors['slate-700']};
  margin-bottom: 8px;
`;

const SelectBox = styled(Select)`
  display: block;
  width: 100%;
`;

const ClearAll = styled.a`
  font-size: 14px;
`;

interface IFilterProps {
  label: string;
  labelFor: string;
}

const Filter: React.FC<IFilterProps> = ({ label, labelFor, children }) => {
  return (
    <FilterWrapper>
      <Label htmlFor={labelFor}>{label}</Label>
      {children}
    </FilterWrapper>
  );
};

interface IFiltersProps {
  filters: IAppCatalogFilters;
  authorOptions: ISelectOption[];
  onChange: (filter: string, value: string | null) => void;
  onClear: () => void;
}

const Filters: React.FC<IFiltersProps> = (props) => {
  const { filters, authorOptions, onChange, onClear } = props;

  function handleClearAllClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    onClear();
  }

  function handleAuthorChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value === 'Select author' ? null : e.target.value;
    onChange('author', value);
  }

  return (
    <Wrapper data-testid="filters">
      <Headings>
        <Heading>Filters</Heading>
        <ClearAll href="#" onClick={handleClearAllClick}>
          Clear all
        </ClearAll>
      </Headings>

      <Filter label="By Author:" labelFor="author">
        <SelectBox
          id="author"
          onChange={handleAuthorChange}
          value={filters.author || 'Select author'}
        >
          <option>Select author</option>
          {authorOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </SelectBox>
      </Filter>
    </Wrapper>
  );
};

export default Filters;
