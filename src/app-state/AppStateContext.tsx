import React, { createContext, useReducer, useContext } from 'react'
import { nanoid } from 'nanoid'
import { findItemIndexById, moveItem, overrideItemAtIndex } from '../utils/arrayUtils'
import { DragItem } from '../dnd/DragItem'

interface Task {
    id: string
    text: string
}

interface List {
    id: string
    text: string
    tasks: Task[]
}

export interface AppState {
    lists: List[]
    draggedItem: DragItem | undefined
}

interface AppStateContextProps {
    state: AppState
    dispatch: React.Dispatch<Action>
}

type Action =
    | {
    type: "ADD_LIST"
    payload: string
}
    | {
    type: "ADD_TASK"
    payload: { text: string; listId: string}
}
    | {
    type: "MOVE_LIST"
    payload: { dragIndex: number; hoverIndex: number}
}
    | {
    type: "SET_DRAGGED_ITEM"
    payload: DragItem | undefined
}


const appData: AppState = {
    draggedItem: undefined,
    lists: [
        {
            id: "0",
            text: "To Do",
            tasks: [{ id: "c0", text: "Generate app"}]
        },
        {
            id: "1",
            text: "In Progress",
            tasks: [{ id: "c2", text: "Learn TS"}]
        },
        {
            id: "2",
            text: "Done",
            tasks: [{ id: "c3", text: "Begin to use static typing"}]
        }
    ]
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(appStateReducer, appData)
    return (
        <AppStateContext.Provider value={{ state, dispatch}}>
            { children }
        </AppStateContext.Provider>
    )
}

export const useAppState = () => {
    return useContext(AppStateContext)
}

const appStateReducer = (state: AppState, action: Action) => {
    switch (action.type) {
        case "ADD_LIST": {
            return {
                ...state,
                lists: [
                    ...state.lists,
                    { id: nanoid(), text: action.payload, tasks: []}
                ]
            }
        }
        case "ADD_TASK": {
            const targetLaneIndex = findItemIndexById(
                state.lists,
                action.payload.listId
            )

            const targetList = state.lists[targetLaneIndex]

            const updatedTargetList = {
                ...targetList,
                tasks: [
                    ...targetList.tasks,
                    { id: nanoid(), text: action.payload.text }
                ]
            }
            return {
                ...state,
                lists: overrideItemAtIndex(
                    state.lists,
                    updatedTargetList,
                    targetLaneIndex
                )
            }
        }
        case "MOVE_LIST": {
            const { dragIndex, hoverIndex } = action.payload
            return {
                ...state,
                lists: moveItem(state.lists, dragIndex, hoverIndex)
            }
        }
        case "SET_DRAGGED_ITEM": {
            return {
                ...state,
                draggedItem: action.payload
            }
        }
        default: {
            return state
        }
    }
}
