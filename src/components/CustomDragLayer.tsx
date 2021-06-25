import React from 'react'
import { XYCoord, useDragLayer } from 'react-dnd'
import styled from 'styled-components'
import { Column } from './Column'

function getItemStyles(currentOffset: XYCoord | null ): React.CSSProperties {
    if (!currentOffset) {
        return {
            display: "none"
        }
    }

    const { x, y } = currentOffset

    const transform = `translate(${x}px, ${y}px)`
    return {
        transform,
        WebkitTransform: transform
    }
}

export const CustomDragLayer: React.FC = () => {
    const { isDragging, item, currentOffset } = useDragLayer(monitor => ({
        item: monitor.getItem(),
        isDragging: monitor.isDragging(),
        currentOffset: monitor.getSourceClientOffset()
    }))

    return isDragging ? (
        <CustomDragLayerContainer>
            <div style={getItemStyles(currentOffset)}>
                <Column
                    text={ item.id }
                    index={ item.index }
                    id={ item.id }
                />
            </div>
        </CustomDragLayerContainer>
    ) : null
}

export const CustomDragLayerContainer = styled.div`
    height: 100%;
    left: 0;
    pointer-events: none;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
`