import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

// export type RemoveTaskACType = {
//     type: 'REMOVE-TASK'
//     taskId: string
//     todolistId: string
// }
//
// export type AddTaskACType = {
//     type: 'ADD-TASK'
//     title: string
//     todolistId: string
// }
//
// export type ChangeStatusACType = {
//     type: 'CHANGE-TASK-STATUS'
//     taskId: string
//     todolistId: string
//     isDone: boolean
// }
//
// export type changeTaskTitleACType = {
//     type: 'CHANGE-TASK-TITLE'
//     taskId: string
//     todolistId: string
//     newTitle: string
// }

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeStatusACType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>


type ActionsTypes =
    RemoveTaskACType
    | AddTaskACType
    | ChangeStatusACType
    | ChangeTaskTitleACType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsTypes): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(el => el.id !== action.taskId)
            }
        case "ADD-TASK":
            const newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: [...state[action.todolistId], newTask]}
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId
                    ? {...el, isDone: action.isDone}
                    : el)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId
                    ? {...el, title: action.newTitle}
                    : el)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistsId]: []
            }
        case "REMOVE-TODOLIST":
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        default:
            throw new Error("I don't understand this action type")
    }
}


export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK",
        taskId,
        todolistId
    } as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: "ADD-TASK",
        title,
        todolistId
    } as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: "CHANGE-TASK-STATUS", taskId, todolistId, isDone} as const
}

export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => {
    return {type: "CHANGE-TASK-TITLE", taskId, todolistId, newTitle} as const
}


// export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskACType=> {
//     return {
//         type: "REMOVE-TASK",
//         taskId,
//         todolistId
//     } as const
// }
//
// export const addTaskAC = (title: string, todolistId: string): AddTaskACType => {
//     return {
//         type: "ADD-TASK",
//         title,
//         todolistId
//     } as const
// }
//
// export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeStatusACType => {
//     return {type: "CHANGE-TASK-STATUS", taskId, todolistId, isDone}
// }
//
// export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string): changeTaskTitleACType => {
//     return {type: "CHANGE-TASK-TITLE", taskId, todolistId, newTitle}
// }