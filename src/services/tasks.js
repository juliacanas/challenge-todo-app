import axios from 'axios';

class TodoService {
  constructor() {
    this.todo = axios.create({
      baseURL: "http://localhost:4000/api/v1",
      withCredentials: true,
    })
  }

  getAllTodos(){
    return this.todo.get('/todos')
    .then(response => response.data)
  }

  createTodo(newTodo) {
    return this.todo.post('/todos', newTodo)
      .then(response => response.data)
  };

  getTodo(id){
    return this.todo.get(`/todos/${id}`)
    .then(response => response.data)
  }

  updateTodo(id){
    return this.todo.put(`/todos/${id}`)
    .then(response => response.data)
  }
  
  deleteTodo(id){
    return this.todo.delete(`/todos/${id}`)
      .then(response => response.data)
  }

}

const todoService = new TodoService();
export default todoService;