import { useMemo, Dispatch } from "react"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import { formCalories } from "../types"
import { formCaloriesActions } from "../reducers/caloriesReducer"
import { categories } from "../data/categories"

type CaloriesListProps = {
    activities: formCalories[],
    dispatch: Dispatch<formCaloriesActions>,
}

export const CaloriesList = ({activities, dispatch}: CaloriesListProps) => {

    const categoryName = useMemo( () => (category: formCalories['category']) => categories.map(e => e.id === category ? e.name : ''), [activities]
    )

    const isEmptyActivities = useMemo(() => activities.length === 0, [activities])

    return (
        <>
            <h2 className=" text-4xl font-bold text-slate-600 text-center">Comida y Actividades</h2>

            {isEmptyActivities ?
            <p className=" text-center my-4 text-xl">No hay actividades aún</p> : 
            activities.map(e => (
                <div key={e.id} className=" flex justify-between mt-5 bg-white px-5 py-10 shadow">
                    <div className=" space-y-2 relative">
                        <p className={`absolute -top-8 -left-8 px-10 py-2 uppercase font-bold text-lg ${e.category === 1 ? ' text-lime-500' : ' text-orange-500'}`}>
                            {categoryName(+e.category)}</p>
                        <p className=" text-2xl font-bold pt-5">{e.activity}</p>
                        <p className={` text-4xl font-black ${e.category === 1 ? 'text-lime-500' : 'text-orange-500'}`}>
                            {e.calories} {' '}<span>Calorías</span>
                        </p>
                    </div>
                    <div className=" flex gap-5 items-center">
                        <button onClick={() => dispatch({type: "setActiveId", payload: {id: e.id}})}>
                            <PencilSquareIcon
                                className=" h-8 w-8 text-gray-800"
                            />
                        </button>

                        <button onClick={() => dispatch({type: "deleteActiveId", payload: {id: e.id}})}>
                            <TrashIcon
                                className=" h-8 w-8 text-red-600"
                            />
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}