import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import { useState, useEffect} from 'react'
import { askNotificationPermission } from './utils/notifications'

function App() {

  const [showAddTask, setShowAddTask] = useState (false)   

  const [tasks, setTasks] = useState(() => {
    const localData = localStorage.getItem('tasks')
    return localData ? JSON.parse(localData) : []
  })

  const appStyle = {
    backgroundImage: 'url("/background.svg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    minWidth: '100vw'
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedNow = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      tasks.forEach(task => {
        const taskTime = new Date(now.toDateString() + ' ' + task.sTime);
        const formattedTaskTime = `${taskTime.getHours().toString().padStart(2, '0')}:${taskTime.getMinutes().toString().padStart(2, '0')}`;
        console.log(taskTime)
        console.log(now)
        if (task.reminder && formattedTaskTime === formattedNow) {
            alert(`Time to start task: ${task.text}`);
        }
    });
}, 60000); 
return () => clearInterval(interval);
}, [tasks]);
  

  // Save tasks to localStorage when tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    askNotificationPermission();
  }, []);

//add task
const addTask = (task) => {
  const id = Math.floor(Math.random() * 10000 )+ 1;
  const newTask = { id, ...task, priority: task.priority || 'low' }
  setTasks([...tasks,newTask])
  if (task.reminder) {
    alert(`Reminder set for ${task.text} at ${task.sTime}`)
  }
}

//delete task
const deleteTask = (id) => {
  setTasks(tasks.filter((task)=> task.id!== id))
}

//toggle reminder
const toggleReminder = (id) => {
  setTasks(tasks.map((task) => task.id === id ? 
  { ...task, reminder: !task.reminder} : task))
}

  return (
    <div style={appStyle}>
      <div className="container">
      <Header showAdd={showAddTask} onAdd={() => setShowAddTask(!showAddTask)} />

      {showAddTask && <AddTask onAdd={addTask} />}


      {tasks.length >0 ? (
        <Tasks tasks={tasks} onToggle={toggleReminder} onDelete={deleteTask} /> 
      ): (
        <div className="centered-content">
          <h3 className="centered-text">Start organizing your work by adding the tasks</h3>
          <p className="gap">No tasks to display</p>
        </div>
      )}
  
      </div>
    </div>
  );
}

export default App; 
