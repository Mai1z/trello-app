import React, {useRef} from 'react'
import { AddNewItem } from './AddNewItem'
import { useAppState } from '../app-state/AppStateContext'
import { Card } from './Card'
import { useItemDrag } from '../hooks/useItemDrag'
import { useDrop } from 'react-dnd'
import { DragItem } from '../dnd/DragItem'
import { isHidden } from '../utils/isHidden'
import styled from 'styled-components'

interface ColumnProps {
    text: string
    index: number
    id: string
    isPreview?: boolean
}

interface DragPreviewContainerProps {
    isHidden?: boolean
    isPreview?: boolean
}

export const Column = ({
    text,
    index,
    id,
    isPreview
} : ColumnProps) => {
    const { state, dispatch } = useAppState()
    const ref = useRef<HTMLDivElement>(null)

    const { drag } = useItemDrag({ type: "COLUMN", id, index, text})

    const [, drop] = useDrop({
        accept: "COLUMN",
        hover(item: DragItem) {
            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) {
                return
            }

            dispatch({ type: "MOVE_LIST", payload: { dragIndex, hoverIndex }})
            item.index = hoverIndex
        }
    })

    drag(drop(ref))

    return (
        <ColumnContainer
            isPreview={ isPreview }
            ref={ ref }
            isHidden={ isHidden(isPreview, state.draggedItem, "COLUMN", id) }
        >
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

const DragPreviewContainer = styled.div<DragPreviewContainerProps>`
  opacity: ${props => (props.isHidden ? 0.3 : 1)};
  transform:${props=>(props.isPreview ? "rotate(5deg)" : undefined)};
`

const ColumnContainer = styled(DragPreviewContainer)`
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

