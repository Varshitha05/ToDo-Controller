import React, {useState} from 'react'


const AddTask = ({onAdd}) => {

    const [text, setText] = useState('')
    const [hoursStart, setHoursStart] = useState('');
    const [minutesStart, setMinutesStart] = useState('');
    const [amPmStart, setAmPmStart] = useState('AM');
    const [hoursEnd, setHoursEnd] = useState('');
    const [minutesEnd, setMinutesEnd] = useState('');
    const [amPmEnd, setAmPmEnd] = useState('AM');
    const [reminder, setReminder] = useState(false)
    const [priority, setPriority] = useState('low');

    const handleHourChange = (value, setter) => {
        if (value === '' || (value.match(/^\d+$/) && parseInt(value, 10) >= 1 && parseInt(value, 10) <= 12)) {
            setter(value);
        }
    };

    const handleMinuteChange = (value, setter) => {
        if (value === '' || (value.match(/^\d+$/) && parseInt(value, 10) >= 0 && parseInt(value, 10) <= 59)) {
            setter(value);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault()
        if(!text || !hoursStart){
            alert('Please add correct details')
            return
        }
        const formattedStartTime = `${hoursStart.padStart(2, '0')}:${minutesStart.padStart(2, '0')} ${amPmStart}`
        const formattedEndTime = `${hoursEnd.padStart(2, '0')}:${minutesEnd.padStart(2, '0')} ${amPmEnd}`
        onAdd({ text, sTime: formattedStartTime, eTime: formattedEndTime, reminder, priority})

        setHoursStart('');
        setMinutesStart('');
        setAmPmStart('AM');
        setHoursEnd('');
        setMinutesEnd('');
        setAmPmEnd('AM');
        setReminder(false)
        setText('')
        setPriority('low')

    }


    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task Name: </label>
                <input type='text' placeholder='e.g., Team Meeting' value={text} onChange={(e) => setText(e.target.value)}/>

            </div>
            <div className='form-control'>
                <label>Start time:</label>
                <input type='text' placeholder='HH' value={hoursStart} onChange={(e) => handleHourChange(e.target.value, setHoursStart)} style={{ width: '125px' }}/>
                <input type='text' placeholder='MM' value={minutesStart} onChange={(e) => handleMinuteChange(e.target.value, setMinutesStart)} style={{ width: '125px' }}/>
                <select value={amPmStart} onChange={(e) => setAmPmStart(e.target.value)}>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </select>
            </div>
            <div className='form-control'>
                <label>End time:</label>
                <input type='text' placeholder='HH' value={hoursEnd} onChange={(e) => handleHourChange(e.target.value, setHoursEnd)} style={{ width: '125px' }}/>
                <input type='text' placeholder='MM' value={minutesEnd} onChange={(e) => handleMinuteChange(e.target.value, setMinutesEnd)} style={{ width: '125px' }}/>
                <select value={amPmEnd} onChange={(e) => setAmPmEnd(e.target.value)}>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </select>
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox'
                checked={reminder}
                value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}></input>
            </div>
            <div className='form-control'>
                <label>Priority</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <input type='submit' value='Save Task' className='btn btn-block' ></input>
        </form>
        
    )
}

export default AddTask
