'use client'

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([
    { description: 'task1', status: 'notCompleted' },
    { description: 'task 2', status: 'completed' }
  ]);
 

  const handleAddTask = () => {
    if (task.trim() === "") {
      alert("Please add the text.");
      return;
    }
  
   
  
   const newTasks ={description:task , status:'notCompleted'}
   setTasks([newTasks,...tasks])
   setTask('')
  };
 
  const tasksUpdated = (index) => {
    const updated =[...tasks];
    updated[index].status= updated[index].status=== 'completed' ? 'notCompleted' :'completed';
    setTasks(updated);
    setTask('');
  };
  
  const deleteTask = (index) => {
    const updated =[...tasks]
    if (updated[index].status == 'completed')
    {
    const update = tasks.filter((_,i)=> i !== index  );
    setTasks(update);
  }
  };



  return (
    <div className="p-10">
      <div className="flex gap-2 mb-4">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
          className="border px-4 py-2 rounded"
        />
        <button
          onClick={handleAddTask}
          className="bg-yellow-400 px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {tasks.sort((a,b)=>{
        if (a.status === "completed" && b.status !== "completed" )return 1;
        if (a.status !== "completed" && b.status === "completed") return -1;
         return 0;
        
      }).map((item, index) => (
        <div key={index} className="flex items-center gap-3 mb-2">
          <input
            type="checkbox"
            checked={item.status === 'completed'}
            onChange={() => tasksUpdated(index)}
          />
          <p className={item.status === 'completed' ? 'line-through text-gray-500' : ''}>
            {item.description}
          </p>
          <Image
            src="/assets/bin.png"
            width={20}
            height={20}
            alt="Delete"
            onClick={() => deleteTask(index)}
            className="cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
}
