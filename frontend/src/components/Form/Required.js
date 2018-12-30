import React from 'react';
import styled from 'styled-components';

const Span = styled.span`
  color: #ff3333;
  font-size: 0.8rem;
  padding: 0 0 1rem 0.3rem;
`;

const Required = () => {
  return (
    <Span>*</Span>
  )
}

export default Required;