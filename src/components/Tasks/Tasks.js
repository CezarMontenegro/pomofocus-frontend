import styles from './Tasks.module.css';

function Tasks() {
  return (
    <div className={styles.tasks_container}>
      <div className="tasks_header">
        <span>Tasks</span>
        <span>Icones</span>
      </div>
      <div className="tasks_list">
        <span>Logica com map para puxar as tarefas</span>
      </div>
      <div className="add_task">
        <span>Add Task</span>
      </div>
    </div>
  )
}

export default Tasks;