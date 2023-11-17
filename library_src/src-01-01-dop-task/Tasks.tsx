import React from 'react';
import {DataType} from "./App";

type TasksPropsType = {
    data: DataType
}
export const Tasks: React.FC<TasksPropsType> = ({data}) => {

    const tasksList = data.tasks.map((el) => <li key={el.taskId}>{el.title}</li>)
    const studentList = data.students.map((el, index) => <li key={index}>{el}</li>)

    return (
        <div>
            <h1>{data.title}</h1>
            <ul>{tasksList}</ul>
            <ul>{studentList}</ul>
        </div>
    );
};