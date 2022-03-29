import { actions } from './todo-actions'

export default function reducer(state, action) {
    switch (action.type) {

        case actions.INIT:
            return [...action.data]

        case actions.ADD_TODO_ITEM:
            return [...state, action.todoItemLabel]

        case actions.REMOVE_TODO_ITEM: {
            return (state.filter(
                (todoItem) => {
                    console.log(todoItem)
                    return (
                        todoItem._id !== action.todoItemId
                    )
                }
            ))
        }

        case actions.TOGGLE_COMPLETED: {
            return (state.map((todoItem) =>
                todoItem._id === action.todoItemId
                    ? { ...todoItem, isComplete: !todoItem.isComplete }
                    : todoItem
            ))
        }

        case actions.UPDATE: {
            return (state.map((todoItem) => {
                return todoItem._id === action.todoItem._id
                    ? { ...todoItem, 
                        name: action.todoItem.name, 
                        summary: action.todoItem.summary,
                        description: action.todoItem.description
                     }
                    : todoItem
            }
            ))
        }

        default:
            return state;
    }
};
