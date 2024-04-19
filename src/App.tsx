import { useEffect, useMemo, useReducer } from "react"
import { Form } from "./components/Form"
import { CaloriesList } from "./components/CaloriesList"
import { CalorieTracker } from "./components/CalorieTracker"
import { caloriesReducer, initialState } from "./reducers/caloriesReducer"

function App() {

    const [state, dispatch] = useReducer(caloriesReducer, initialState) // Revisar el archivo caloriesReducer.ts

    useEffect(() => {
        localStorage.setItem('caloriesState', JSON.stringify(state.caloriesState))
    }, [state.caloriesState])

    const restartApp = () => useMemo(() => state.caloriesState.length > 0, [state.caloriesState])
    
    return (
        <>
            <header className=" bg-lime-600 py-3">
                <div className=" max-w-4xl mx-auto flex justify-between items-center">
                    <h1 className=" text-center text-lg font-bold uppercase text-white">Contador de Calorías</h1>

                    <button
                        className=" bg-gray-800 hover:bg-gray-900 py-2 px-3 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10 disabled:cursor-default"
                        disabled={!restartApp()}
                        onClick={()=> dispatch({type: 'restar-app'})}
                    >
                        Reiniciar Contador
                    </button>
                </div>
            </header>

            <section className=" bg-lime-500 py-20 px-5">
                <div className=" max-w-4xl mx-auto">
                    <Form
                        dispatch={dispatch}
                        state={state}
                    />
                </div>
            </section>

            <section className=" bg-gray-800 py-10">
                <div className=" max-w-4xl mx-auto">
                    <CalorieTracker
                        activities={state.caloriesState}
                    />
                </div>
            </section>

            <section className=" p-10 mx-auto max-w-4xl">
                <CaloriesList
                    activities={state.caloriesState}
                    dispatch={dispatch}
                />
            </section>
        </>
    )
}

export default App
