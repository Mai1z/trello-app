import React from 'react'
import styled from 'styled-components'

interface CardProps {
    text: string
}

export const Card = ({ text } : CardProps) => {
    return <CardContainer>{ text }</CardContainer>
}

const CardContainer = styled.div`
  background-color: #fff;
  cursor: pointer;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  max-width: 300px;
  border-radius: 3px;
  box-shadow: #091e4240 0 1px 0 0;
`