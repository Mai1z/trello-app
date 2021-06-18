import React from 'react'
import { AddNewItem } from './AddNewItem'
import styled from 'styled-components'

interface ColumnProps {
    text: string
}

export const Column = ({
   text,
   children
} : React.PropsWithChildren<ColumnProps>) => {
    return (
        <ColumnContainer>
            <ColumnTitle>{ text }</ColumnTitle>
            { children }
            <AddNewItem
                onAdd={ console.log }
                toggleButtonText='+ Add task'
                dark
            />
        </ColumnContainer>
    )
}

const ColumnContainer = styled.div`
  background-color: #ebecf0;
  width: 300px;
  min-height: 40px;
  margin-right: 20px;
  border-radius: 3px;
  padding: 8px 8px;
  flex-grow: 0;
`

const ColumnTitle = styled.div`
  padding: 6px 16px 12px;
  font-weight: bold;
`