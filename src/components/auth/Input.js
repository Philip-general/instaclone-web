import React from 'react'
import styled from 'styled-components'

const Sinput = styled.input`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid ${props => props.theme.borderColor};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
`

const Input = props => {
  return <Sinput {...props} />
}

export default Input
