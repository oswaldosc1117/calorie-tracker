import { formCalories } from "../types";

export type formCaloriesActions = 
    {type: 'saveFormCalories', payload: {newFormCalories: formCalories}} |
    {type: 'setActiveId', payload: {id: formCalories['id']}} |
    {type: 'deleteActiveId', payload: {id: formCalories['id']}} |
    {type: 'restar-app'} // No es obligatorio que las acciones tomen un payload

 export type formCaloriesState = {
    caloriesState: formCalories[],
    activeId: formCalories['id']
}

const localStorageActivities = () : formCalories[] => {
    const caloriesState = localStorage.getItem('caloriesState')
    return caloriesState ? JSON.parse(caloriesState) : []
}

export const initialState: formCaloriesState = {
    caloriesState: localStorageActivities(),
    activeId: ''
}

export const caloriesReducer = (state: formCaloriesState = initialState, actions: formCaloriesActions) => {

    if(actions.type === 'saveFormCalories'){

        // Este codigo maneja la logica para actualizar el state.
        let updateState: formCalories[] = []

        if(state.activeId){
            updateState = state.caloriesState.map(e => e.id === state.activeId ? actions.payload.newFormCalories : e )
        } else{
            updateState = [...state.caloriesState, actions.payload.newFormCalories]
        }

        return {
            ...state,
            caloriesState: updateState,
            activeId: '' // Dado que el ActiveId sigue activo luego de realizar la comprobacion, lo reiniciamos para continuar agregando actividades al contador.
        }
    }

    if(actions.type === 'setActiveId'){

        return {
            ...state,
            activeId: actions.payload.id
        }
    }

    if(actions.type === 'deleteActiveId'){

        const deleteState = state.caloriesState.filter(e => e.id !== actions.payload.id)

        return{
            ...state,
            caloriesState: deleteState // El key del objeto debe tener el mismo nombre definido en la variable. En este caso, en initialState.
        }
    }

    if(actions.type === 'restar-app'){
        return initialState
    }

    return state
}

/** NOTAS GENERALES
 * 
 * El useReducer es una funcion de React que se emplea cuando queremos manejar un estado mas complejo. Para ello, toma una serie de valores. Dentro de la tupla ([])
 * va a tomar un state y una funcion dispatch. Esta funcion es la que se encargara de modificar el state. Luego en el useReducer() este toma dos valores. El primero
 * es el reducer que toma el state actual y una accion para devolver un nuevo estado. Y el segundo es el valor inicial del state.
*/