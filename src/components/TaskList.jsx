import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, fetchWeather, toggleTaskCompletion } from '../redux/tasksSlice';
import { useEffect } from 'react';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const weather = useSelector((state) => state.tasks.weather);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWeather('New Delhi'));
  }, [dispatch]);

  if (!isAuthenticated) {
    return <p className='text-xl font-bold text-center'>Please log in to view your tasks.</p>;
  }
  return (
    <div className="task-list border-t border-r border-l lg:border flex flex-col rounded-xl p-2 lg:p-5 mt-7">
      <div className='text-lg lg:text-xl font-semibold mt-2 border rounded-2xl p-2'>
        <h3 >Weather in New Delhi: {weather?.weather[0]?.description}</h3>
        <p className='flex flex-col md:flex-row  gap-3 mt-2  '>
          <span>• Humidity: {weather?.main?.humidity}</span>
          <span>• Pressure: {weather?.main?.pressure}</span>
          <span>• Temp: {weather?.main?.temp} C</span>
        </p>
      </div>
      <ul className='text-lg mt-7 flex flex-col gap-4'>
        {tasks.map((task) => (

          <div className='flex justify-between mx-1 lg:mx-4 ' key={task.id}>
            <div className='flex gap-3 items-center'>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggleTaskCompletion(task.id))}
                />
                <p className={`task ${task.completed ? 'line-through' : ''}`}><span>{task.text}</span> - <span className='font-semibold'>{task.priority}</span></p>
              </div>
            <button className='border rounded-full bg-red-500  lg:p-2 px-2 lg:px-4 text-lg lg:text-xl font-bold hover:bg-red-600 hover:scale-105 transition-all cursor-pointer' onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
