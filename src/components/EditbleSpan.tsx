import React, {ChangeEvent, useState} from "react";

type EditbleSpanType = {
    title: string
    onChange: (newTaskTitle: string) => void
}

export function EditbleSpan(props: EditbleSpanType) {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState("")

    const activateEditableMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const disableEditableMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
    }

    return editMode
        ? <input value={title} onChange={onChangeHandler} onBlur={disableEditableMode} autoFocus/>
        : <span onDoubleClick={activateEditableMode}>{props.title}</span>
}