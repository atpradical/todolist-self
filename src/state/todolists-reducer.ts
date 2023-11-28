import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListsType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListsType = {
    type: 'ADD-TODOLIST'
    title: string
}

export type ChangeTodoListsTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodoListsFilterType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

type ActionsTypes = RemoveTodoListsType | AddTodoListsType | ChangeTodoListsTitleType | ChangeTodoListsFilterType

export const todolistsReducer = (state: TodolistType[], action: ActionsTypes): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.id
                ? {...el, title: action.title}
                : el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        default:
            throw new Error("I don't understand this action type")
    }
}

export const RemoveTodoListsAC = (todolistId: string): RemoveTodoListsType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId
    } as const
}

export const AddTodoListsAC = (title: string): AddTodoListsType => {
    return {
        type: 'ADD-TODOLIST',
        title: title
    } as const
}

export const ChangeTodoListsTitleAC = (todolistId: string, title: string): ChangeTodoListsTitleType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId,
        title: title,
    } as const
}

export const ChangeTodoListsFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodoListsFilterType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId,
        filter: filter,
    } as const
}