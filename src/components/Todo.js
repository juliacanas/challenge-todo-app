import React, { Component } from 'react'
import Form from './Form'
import todoService from '../services/tasks'
import plus from '../images/icon-17.png'


class Todo extends Component {
  state = {
    formAppear: false,
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

    const newOne = await todoService.createTodo(newTodo)
    const allTodos = [...myTasksList, newOne]

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


  handleformAppear = () => {
    this.setState({
      formAppear: !this.state.formAppear
    })
  }

  render() {
    const {titleTask, descriptionTask, myTasksList, formAppear} = this.state
    return (
      <div className="container">
  
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
                <button className="btn" onClick={(e) => this.deleteTask(task._id)}>delete</button>
              </div>
            </div>
          ))}

          <button onClick={this.handleformAppear} className="plus-btn" ><img width='30' src={plus} alt="plus" /></button>

          {formAppear ?            
              <Form handleChange={this.handleChange} handleFormSubmit={this.handleFormSubmit} titleTask={titleTask} descriptionTask={descriptionTask} />
         : null}

        </div>        
        }

        <div className="cell">
          <h2>Done</h2>
        </div>
      </div>
    )
  }
}

export default Todo;