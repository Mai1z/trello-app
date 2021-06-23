import React from 'react'
import { AddNewItem } from './AddNewItem'
import { useAppState } from '../app-state/AppStateContext'
import { Card } from './Card'
import styled from 'styled-components'

interface ColumnProps {
    text: string
    index: number
    id: string
}

export const Column = ({
    text,
    index,
    id
} : ColumnProps) => {
    const { state, dispatch } = useAppState()

    return (
        <ColumnContainer>
            <ColumnTitle>{ text }</ColumnTitle>
            { state.lists[index].tasks.map((task, i) => (
                <Card text={ task.text } key={ task.id } index={ i }/>
            )) }
            <AddNewItem
                onAdd={ text => dispatch({ type: "ADD_TASK", payload: { text, listId: id}}) }
                toggleButtonText="+ Add task"
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