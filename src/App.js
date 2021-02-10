import Header from "./components/Header";
import { Tasks } from "./components/Tasks";
import { useState, useEffect } from 'react'
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import About from "./components/About";


export default function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks();
  }, [])

  //Fetch task
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json()

    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json()

    return data
  }

  //Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    setTasks(tasks.filter(task => task.id !== id))
  }

  //Task remainder
  const toggleReminder = async (id) => {
    const taskFromServer = await fetchTask(id);
    const updTask = {...taskFromServer, reminder: !taskFromServer.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json();
    console.log(data);


    setTasks(
      tasks.map(task => 
        task.id === id 
          ? {...task, reminder: data.reminder} 
          : task
      )
    )
  }

  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks, data])

    // let id = Math.floor(Math.random() * 10000) + 1
    // let newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  }

  const showHideAddTask = () => {
    setShowAddTask( !showAddTask )
  }

  return (
    <Router>
      <div className='container'>
        <Header showAddTask={showAddTask} showHideAddTask={showHideAddTask}/>

        <Route path='/' exact render={(props) => (
          <>
            {showAddTask && <AddTask onAddTask={addTask} />}
            {tasks.length > 0
              ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggleReminder={toggleReminder} />)
              : ('No tasks')}
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}
