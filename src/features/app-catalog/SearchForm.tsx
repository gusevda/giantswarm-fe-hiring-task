import React from 'react';
import styled from 'styled-components';
import { useDebounce } from 'usehooks-ts';
import { forTablet } from '../../styles';
import { Input, PrimaryButton } from '../../styles/components';

const Form = styled.form`
  position: fixed;
  left: 0;
  bottom: 65px;
  width: 100%;
  padding: 8px 16px;
  background-color: ${(props) => props.theme.colors['slate-200']};
  border-top: 1px solid ${(props) => props.theme.colors['slate-300']};
  display: flex;

  ${forTablet} {
    position: static;
    left: unset;
    bottom: unset;
    width: auto;
    max-width: 500px;
    background-color: unset;
    border-top: unset;
    padding: 0;
  }
`;

const SearchInput = styled(Input)`
  flex: 1;
  margin-right: 8px;
`;

interface ISearchInputProps {
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
}

const SearchForm: React.FC<ISearchInputProps> = ({ onChange, onSubmit }) => {
  const [value, setValue] = React.useState('');
  const debouncedValue = useDebounce(value, 500);

  React.useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);

    if (e.target.value.trim() === '') {
      onChange('');
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(value);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <SearchInput
        placeholder="Search apps"
        value={value}
        onChange={handleChange}
      />
      <PrimaryButton>Search</PrimaryButton>
    </Form>
  );
};

export default SearchForm;
