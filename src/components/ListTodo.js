import React,{Fragment, useEffect, useState} from "react";

const ListTodo = () => {
    const [todos, setTodos] = useState([]);

    // delete todo function
    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`${process.env.REACT_APP_API_URL}/todos/${id}`, {
                method: "DELETE"
            });
            setTodos(todos.filter(todo => todo.todo_id !== id));
            console.log(deleteTodo);
        } catch (err) {
            console.error(err.message);
        }
    };
 
    const getTodos = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/todos`);
            const jsonData = await response.json();
          setTodos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getTodos();
    }, []);
    console.log(todos);
    return(
        <Fragment>
           <table className="table mt-5 text-center">
    <thead>
     {todos.map(todo => (
        <tr key={todo.todo_id}>
              <th>{todo.description}</th>
              <th>Edit</th>
              <th><button className="btn btn-danger" onClick={()=> deleteTodo(todo.todo_id)}>Delete</button>
              </th>
        </tr>
     ))}
    </thead>
    <tbody>

      {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
      {todos.map(todo => (
        <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>Edit</td>
              <td>Delete</td>
        </tr>
      
      ))}
      
    </tbody>
  </table>
        </Fragment>
    );
}

export default ListTodo;