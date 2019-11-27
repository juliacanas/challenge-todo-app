import React from 'react'

const Form = (props) => {
  const { handleFormSubmit, handleChange, titleTask, descriptionTask} = props
  return (
    <div className="cell">
      <h2>New task</h2>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name='titleTask' placeholder="title" value={titleTask} onChange={(e) => handleChange (e)}/>

        <textarea type="text" rows="3" name='descriptionTask' placeholder="description" value={descriptionTask} onChange={(e) => handleChange(e)}/>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Form

