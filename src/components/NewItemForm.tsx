import React, { useState } from 'react'
import { useFocus } from '../hooks/useFocus'
import styled from 'styled-components'

interface NewItemFormProps {
   onAdd(text: string): void
}

export const NewItemForm = ({ onAdd }: NewItemFormProps) => {
    const [text, setText] = useState('')
    const inputRef = useFocus()
    const handleAddText = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === 'Enter') {
            onAdd(text)
        }
    }

    return (
        <NewItemFormContainer>
            <NewItemInput
                ref={ inputRef }
                value={ text }
                onChange={ e => setText(e.target.value) }
                onKeyPress={ handleAddText }
            />
            <NewItemButton onClick={() => onAdd(text)}>
                Create
            </NewItemButton>
        </NewItemFormContainer>
    )
}

const NewItemFormContainer = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`

const NewItemButton = styled.button`
  background-color: #5aac44;
  border-radius: 3px;
  border: none;
  box-shadow: none;
  color: #fff;
  padding: 6px 12px;
  text-align: center;
`

const NewItemInput = styled.input`
  border-radius: 3px;
  border: none;
  box-shadow: #091e4240 0 1px 0 0;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  width: 100%;
`
