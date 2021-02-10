import { useState } from 'react'

const AddTask = ({ onAddTask }) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);

    const AddTaskNoSubmit = (e) => {
        e.preventDefault();

        if(!text || !day) {
            return alert("Please add task text and day & time")
        }
        
        onAddTask({text, day, reminder});

        setText('');
        setDay('');
        setReminder('');
    }

    return (
        <form className="add-form" onSubmit={AddTaskNoSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input
                    type="text"
                    placeholder="Add Task"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label>Day & Time</label>
                <input
                    type="text"
                    placeholder="Add Day & Time"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                />
            </div>
            <div className="form-control form-control-check">
                <label>Set reminder</label>
                <input
                    type="checkbox"
                    placeholder="Add task"
                    checked={reminder}
                    onChange={(e) => setReminder(e.currentTarget.checked)}
                />
            </div>
            <input type="submit" value="Save Task" className="btn btn-block" />
        </form>
    );
}

export default AddTask;
