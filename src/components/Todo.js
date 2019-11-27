import React, { Component } from 'react'
import Form from './Form'
import todoService from '../services/tasks'


class Todo extends Component {
  state = {
    myTasksList: "",
    titleTask: "",
    descriptionTask: "",
  }


  componentDidMount = async () => {
    const getTodos = await todoService.getAllTodos();
    this.setState({
      myTasksList: getTodos,
    })
  }


  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { titleTask, descriptionTask, myTasksList} = this.state;

    const newTodo = {
      title: titleTask,
      body: descriptionTask,
    }

   await todoService.createTodo(newTodo)
    const allTodos = [...myTasksList, newTodo]

    this.setState({
     myTasksList: allTodos,
     titleTask: "",
     descriptionTask: "",
    })
  }

  
  handleChange = (event) => {
    event.preventDefault();
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  deleteTask = async (id) => {
    const {myTasksList} = this.state
    await todoService.deleteTodo(id);
    const newList = myTasksList.filter((item => item._id !== id));
    
    this.setState ({
      myTasksList: newList
    })
  }



  render() {
    const {titleTask, descriptionTask, myTasksList} = this.state
    return (
      <div className="container">

        <Form handleChange={this.handleChange} handleFormSubmit={this.handleFormSubmit} titleTask={titleTask} descriptionTask={descriptionTask}/>

        
        {myTasksList &&
          <div className="cell">
          <h2>To do</h2>
          {myTasksList.map((task, index) => (
            <div className="card-task" key={index}>
              <div>
                <h3>{task.title}</h3>
                <p>{task.body}</p>
              </div>
              <div className="buttons">
                <button className="btn">Edit</button>
              {/* Si no pasaba el task_id no funcionaba antes lo tenia asi onClick={this.deleteTask} */}
                <button className="btn" onClick={(e) => this.deleteTask(task._id)}>delete</button>
              </div>
            </div>
          ))}
        </div>
        }
      </div>
    )
  }
}

export default Todo;