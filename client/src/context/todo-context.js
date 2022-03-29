import { createContext, useEffect, useReducer } from 'react'
import { useFetchTodo } from '../hooks/fetch-todo.hook';
import reducer from './todo-reducer'
import { actions } from './todo-actions'

export const TodoContext = createContext();

export const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer);
    const { fetchTodo } = useFetchTodo()

    useEffect(() => {
        fetchTodo().then(todos => {
            const data = todos.data
            dispatch({ type: actions.INIT, data })
        })
    }, [fetchTodo])

    const value = {
        todoList: state,

        addTodoItem: (todoItemLabel) => {
            dispatch({
                type: actions.ADD_TODO_ITEM,
                todoItemLabel
            })
        },

        removeTodoItem: (todoItemId) => {
            dispatch({
                type: actions.REMOVE_TODO_ITEM,
                todoItemId
            })
        },

        markAsCompleted: (todoItemId) => {
            dispatch({
                type: actions.TOGGLE_COMPLETED,
                todoItemId
            })
        },

        update: (todoItem) => {
            dispatch({
                type: actions.UPDATE,
                todoItem
            })
        }
    };

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    );
};