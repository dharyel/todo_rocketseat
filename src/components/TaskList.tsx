import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (newTaskTitle.trim() == '') {
      console.log('Título vazio! Deve ser preenchido com algum título.');
      return;
    }

    let newTasks:Task[] = [...tasks];

    let nextId:number = 0;
    if (newTasks.length>0)
      nextId = (newTasks[newTasks.length-1]?.id)+1;

    let newTask:Task = {
        id: nextId,
        title:newTaskTitle,
        isComplete:false
    };

    newTasks.push(newTask);
    setTasks(newTasks);
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    console.log(`id é ${id}`);
    console.log(tasks);

    let newTasks:Task[] = [...tasks];
    newTasks.forEach((item, index)=> {
      if (item.id == id) {
        item.isComplete = !item.isComplete;
      }
    });
    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    let newTasks:Task[] = [...tasks];

    newTasks.forEach((item, index) => {
      if (item.id == id)
        newTasks.splice(index,1);
    })
      
    setTasks(newTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}