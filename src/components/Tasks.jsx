import Task from './Task'

export const Tasks = ({ tasks, onDelete, onToggleReminder }) => {
    return (
        <>
            {tasks.map(task => (
                <Task key={task.id} onDelete={onDelete} onToggleReminder={onToggleReminder} task={task} />
            ))}
        </>
    )
}
