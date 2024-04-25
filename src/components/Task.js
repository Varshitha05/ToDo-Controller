import {FaTimes} from 'react-icons/fa'

const Task = ({task, onDelete, onToggle}) => {
    const priorityColor = task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'orange' : 'green'
    return (
        <div className={`task ${task.reminder ? 'reminder': ''}`} 
        style={{ borderLeft: `4px solid ${priorityColor}` }} 
        onDoubleClick={
            () => onToggle(task.id)
        }>
            <h3>{task.text}
            <FaTimes style={{color:'red', cursor: 'pointer'}} 
            onClick={() => onDelete(task.id)}/>
            </h3>
            <p>{task.sTime} - {task.eTime}</p>
            
            
        </div>
    )
}

export default Task
