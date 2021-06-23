import React, { useState } from 'react'
import { NewItemForm } from './NewItemForm'
import styled from 'styled-components'

interface AddNewItemProps {
    onAdd(text: string) : void
    toggleButtonText: string
    dark?: boolean
}

interface AddItemButtonProps {
    dark?: boolean
}

export const AddNewItem = (props: AddNewItemProps) => {
    const [showForm, setShowForm] = useState(false)
    const { onAdd, toggleButtonText, dark } = props

    if (showForm) {
        return (
            <NewItemForm
                onAdd={ text => {
                    onAdd(text)
                    setShowForm(false)
                }}
            />
        )
    }

    return (
        <AddItemButton dark={ dark } onClick={() => setShowForm(true)}>
            { toggleButtonText }
        </AddItemButton>
    )
}

const AddItemButton = styled.button<AddItemButtonProps>`
  background-color: #ffffff3d;
  border-radius: 3px;
  border: none;
  color: ${props=>(props.dark ? "#000" : "#fff")};
  cursor: pointer;
  max-width: 300px;
  padding: 10px 12px;
  text-align: left;
  transition: background 85ms ease-in;
  width: 100%;
  &:hover { background-color: #ffffff52; }
`