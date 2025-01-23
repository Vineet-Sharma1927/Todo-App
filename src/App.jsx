import Auth from './components/Auth';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './index.css';

const App = () => {
  return (
    <div className="w-[95%] lg:w-[60%] m-auto border-2 rounded-4xl p-1 lg:p-3 mt-1 bg-amber-100/30">
      <h1 className='text-center font-bold text-4xl'>Advanced To-Do Application</h1>
      <Auth/>
      <TaskInput />
      <TaskList />
    </div>
  );
};

export default App;
