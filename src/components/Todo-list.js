function TodoList() {
  return (
    <div class="container">
      <h1>Minha Lista de Tarefas</h1>
    <div class="todo-list">
        <ul>
            <li>
                <input type="checkbox" id="task1"/>
                <label for="task1">Tarefa 1</label>
                <button class="delete">Apagar</button>
            </li>
            <li>
                <input type="checkbox" id="task2"/>
                <label for="task2">Tarefa 2</label>
                <button class="delete">Apagar</button>
            </li>
        </ul>
    </div>
    </div>
  )
}

export default TodoList;