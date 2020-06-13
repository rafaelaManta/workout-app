import arrayMove from 'array-move';
import { insert, capitalizeFirstLetter } from './utils'

export const reducer = (state, action) => {

    switch (action.type) {
        case 'SEARCH_INPUT':
            const value = capitalizeFirstLetter(action.payload)
            return { ...state, search: { ...state.search, input: value, isSearching: true, results: [] },success:false };
        case 'ADD_WORKOUT_NAME':
            return { ...state, workout: { ...state.workout, name: action.payload },success:false  };
        case 'SAVE_BREAK':
            return { ...state, _break: { ...action.payload },success:false  }
        case 'ADD_BREAK':
            const newArray = insert(state.workout.program, action.payload, state._break)
            return { ...state, workout: { ...state.workout, program: [...newArray] } };
        case 'ADD_EXERCISE':
            return { ...state, workout: { ...state.workout, program: [...state.workout.program, { ...action.payload }] },success:false  };
        case 'DELETE_BREAK':
        case 'DELETE_EXERCISE':
            state.workout.program.splice(action.payload, 1)
            return { ...state, workout: { ...state.workout, program: [...state.workout.program] } ,success:false };
        case 'DRAGGING_HANDLER':
            const newOrder = arrayMove(state.workout.program, action.payload.oldIndex, action.payload.newIndex)
            return { ...state, workout: { ...state.workout, program: [...newOrder] },success:false  };
        case 'SAVE_SEARCH_RESULTS':
            if (action.payload.length == 0) {
                const empty = [{ 'fields': { 'Name': 'Not Found!' } }]
                return { ...state, search: { ...state.search, results: [...empty], isSearching: false, input: '' },success:false  }
            }
            return { ...state, search: { ...state.search, results: [...action.payload], isSearching: false, input: '' } ,success:false }
        case 'SUCCESS':
            return { ...state, search: { isSearching: false, results: [], input: '' }, workout: { program: [], name: '' }, error: null, success: true }
        case "ERROR": {
            return { ...state, error: action.payload, search: { isSearching: false, results: [], input: '' } ,success:false }
        }
        default:
            return { ...state };
    }
}
