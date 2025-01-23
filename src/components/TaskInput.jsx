import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../redux/tasksSlice';
import toast from 'react-hot-toast';

const TaskInput = () => {
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState('Medium');
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const dispatch = useDispatch();

    const handleAddTask = () => {
        if (task.trim()) {
            dispatch(addTask({ id: Date.now(), text: task, priority }));
            setTask('');
        }
        toast.success("Task Added")
    };

    return (
        <div className="task-input mt-10 flex flex-col justify-center items-center">
        { isAuthenticated &&
        
            <>
                <div className='flex flex-col gap-2  sm:flex-row md:gap-1.5'>
                    <input
                        className='p-2 focus:outline-none text-lg lg:text-xl  border-2 rounded-4xl px-3 '
                        type="text"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                        placeholder="Add a new task..."

                    />
                    <button className='border-2 rounded-full bg-green-500 p-2 px-4 font-semibold cursor-pointer hover:scale-105 transition-all hover:bg-green-600' onClick={handleAddTask}>Add Task</button>
                </div>
                <div className='flex gap-2 mt-3 justify-start'>
                    <label className='text-lg font-semibold ml-0.5'>
                        <input
                            type="checkbox"
                            checked={priority === 'High'}
                            onChange={() => setPriority('High')}
                        />
                        High
                    </label>
                    <label className='text-lg font-semibold ml-0.5'>
                        <input
                            type="checkbox"
                            checked={priority === 'Medium'}
                            onChange={() => setPriority('Medium')}
                        />
                        Medium
                    </label>
                    <label className='text-lg font-semibold ml-0.5'>
                        <input
                            type="checkbox"
                            checked={priority === 'Low'}
                            onChange={() => setPriority('Low')}
                        />
                        Low
                    </label>
                </div>

                </>
        
        }
         </div>
        
    );
};

export default TaskInput;
