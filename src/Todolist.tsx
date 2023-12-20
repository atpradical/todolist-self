import React, {memo, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {Btn} from "./Btn";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
}

export const Todolist = memo((props: PropsType) => {

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id);
    }, [])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id),
        [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id),
        [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id),
        [props.changeFilter, props.id])

    let tasksForTodolist = props.tasks

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }

    const btnAllVariant = props.filter === 'all' ? 'outlined' : 'text'
    const btnActiveVariant = props.filter === 'active' ? 'outlined' : 'text'
    const btnCompletedVariant = props.filter === 'completed' ? 'outlined' : 'text'

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(task => <Task
                        key={task.id}
                        task={task}
                        todolistId={props.id}
                        changeTaskStatus={props.changeTaskStatus}
                        removeTask={props.removeTask}
                        changeTaskTitle={props.changeTaskTitle}
                    />
                )
            }
        </div>
        <div style={{paddingTop: "10px"}}>
            <Btn
                name={'All'}
                onClick={onAllClickHandler}
                color={'inherit'}
                variant={btnAllVariant}
            />
            <Btn
                name={'Active'}
                onClick={onActiveClickHandler}
                color={'primary'}
                variant={btnActiveVariant}
            />
            <Btn
                name={'Completed'}
                onClick={onCompletedClickHandler}
                color={'secondary'}
                variant={btnCompletedVariant}
            />
        </div>
    </div>
})

