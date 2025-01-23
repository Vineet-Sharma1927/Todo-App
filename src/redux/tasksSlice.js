import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

export const fetchWeather = createAsyncThunk('tasks/fetchWeather', async (location) => {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=08a6fcfb83c99d8c3f0463ea9a4948a1&units=metric`);
  // console.log(response.data)
  return response.data;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({ ...action.payload, completed: false });
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      toast.success("Task Deleted")
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addTask, deleteTask,toggleTaskCompletion } = tasksSlice.actions;

export default tasksSlice.reducer;
