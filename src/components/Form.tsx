import { Dispatch, useState, useEffect } from "react"
import {v4 as uuidv4} from "uuid"
import { formCalories } from "../types"
import { categories } from "../data/categories"
import { formCaloriesActions, formCaloriesState } from "../reducers/caloriesReducer"

type FormProps = {
    dispatch: Dispatch<formCaloriesActions>,
    state: formCaloriesState
}

const initialState: formCalories = { // NG - 1.
    id: uuidv4(),
    category: 0,
    activity: '',
    calories: 0
}
export const Form = ({dispatch, state}: FormProps) => {

    const [formCalories, setFormCalories] = useState<formCalories>(initialState) // NG - 6.

    useEffect(() => {
        if(state.activeId){
            const selectActiveId = state.caloriesState.filter(e => e.id === state.activeId)[0]
            setFormCalories(selectActiveId)
        }
    }, [state.activeId])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => { // NG - 2 y 5.
        
        const isNumberField = ['category', 'calories'].includes(e.target.id)

        setFormCalories({
            ...formCalories, // NG - 3.
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    
    const isValidSubmit = () => {
        const {category, activity, calories} = formCalories
        return category > 0 && activity.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        dispatch({
            type: 'saveFormCalories',
            payload: {newFormCalories: formCalories}
        })

        setFormCalories({...initialState, id: uuidv4()})
    }
    
    return (
        <form className=" space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handleSubmit}>
            <div className=" grid grid-cols-1 gap-3">
                <label className=" font-bold" htmlFor="category">Categoría:</label>
                <select
                    className=" border border-slate-300 p-2 rounded-lg w-full"
                    id="category"
                    value={formCalories.category}
                    onChange={handleChange}
                    // onChange={e =>} // NG - 4.
                >
                    <option disabled value={0}>-- Seleccione --</option>

                    {categories.map(e => (
                        <option key={e.id} value={e.id}>{e.name}</option>
                    ))}
                </select>
            </div>

            <div className=" grid grid-cols-1 gap-3">
                <label className=" font-bold" htmlFor="activity">Actividad:</label>
                <input
                    className=" border border-slate-300 p-2 rounded-lg"
                    type="text"
                    id="activity"
                    placeholder="Ej.: Comida, ejercicio, deporte, etc."
                    value={formCalories.activity}
                    onChange={handleChange}
                    // onChange={e => } // NG - 4.
                />
            </div>

            <div className=" grid grid-cols-1 gap-3">
                <label className=" font-bold" htmlFor="calories">Calorías:</label>
                <input
                    className=" border border-slate-300 p-2 rounded-lg"
                    type="number"
                    id="calories"
                    placeholder="Ej.: 300"
                    value={formCalories.calories}
                    onChange={handleChange}
                />
            </div>

            <input
                className=" bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer rounded-lg disabled:opacity-10 disabled:cursor-not-allowed"
                type="submit"
                value={formCalories.category === 1 ? 'Guardar Comida' : formCalories.category === 2 ? 'Guardar Ejercicio' : 'Guardar'} // NG - 8.
                disabled={!isValidSubmit()} // NG - 7.
            />
        </form>
    )
}

/** NOTAS GENERALES
 * 
 * 1.- Cuando queramos tener un state mas complejo (es decir, que tome mas de un valor), podemos pasarlo como objeto. En este caso, estamos dandole valor a los
 * values del formulario mediante el atributo del objeto correspondiente.
 * 
 * 2.- Como estamos revisando un formulario, podemos acceder a su valor en el value mediante el e.target.value o a su id mediante el e.target.id y con un evento
 * onChange() revisar si hubo un cambio en este.
 * 
 * 3.- Al setear mediante la funcion del state, enviamos una copia primero del mismo mediante un spread Operator. En este caso, realizara una copia del state y
 * luego mediante key = value, asignamos los valores correspondientes. Notese que para un key, la sintaxis e.target.value no es valida por si sola. Por ello, se
 * le pasa mediante un arreglo.
 * 
 * 4.- Apoyandonos nuevamente del autocompletado de TypeScript, cuando queramos saber que tipo de dato es el parametro que le pasamos a una funcion, podemos
 * realizar esa sintaxis, pararnos sobre el elemento (e) y este nos dira el tipo de dato.
 * 
 * 5.- | es el operador logico "o".
 * 
 * 6.- Importamos el type y lo pasamos vía generic al useState para adoptar los tipos en los objetos del estado.
 * 
 * 7.- disabled es un props de React que desactiva un determinado elemento en caso de que este se cumpla. En este caso, va a desactivar la funcion que activa el
 * boton de submit si esta no se cumple. A su vez, nos apoyamos de tailwind para desactivar determinados estilos en caso de que efectivamente no se cumplan.
 * 
 * 8.- Puedo anidar un operador ternario con mas de una comprobacion. La forma de leerlo es la siguiente: Si el valor A es igual a B, ejecuta este codigo, si
 * el valor A es igual a C, ejecuta este otro codigo, si no, ejecuta este ultimo codigo.
*/
