import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const forTablet = '@media only screen and (min-width: 768px)';
export const forDesktop = '@media only screen and (min-width: 1280px)';

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  *,
  ::before,
  ::after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: currentColor;
  }

  html {
    height: 100%;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 16px;
    line-height: 1.5;
  }

  body {
    display: flex;
    flex-direction: column;
    padding-bottom: 116px;
    min-height: 100%;
    line-height: inherit;
    color: ${(props) => props.theme.colors['slate-900']};

    ${forTablet} {
      padding: 0;
    }
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  blockquote,
  dl,
  dd,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  figure,
  p,
  pre {
    margin: 0;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: inherit;
    color: inherit;
    margin: 0;
    padding: 0;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: button;
    background-color: transparent;
    background-image: none;
  }

  button,
  [role="button"] {
    cursor: pointer;
  }

  :disabled {
    cursor: default;
  }

  #root {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1
  }
`;
