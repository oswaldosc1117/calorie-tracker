import { useMemo } from "react"
import { formCalories } from "../types"
import { CaloriesDisplay } from "./CaloriesDisplay"

type calorieTrackerProps = {
    activities: formCalories[]
}

export const CalorieTracker = ({activities}: calorieTrackerProps) => {

    const caloriesConsumed = useMemo(() => activities.reduce((total, e) => e.category === 1 ? total + e.calories : total, 0), [activities])

    const caloriesBurned = useMemo(() => activities.reduce((total, e) => e.category === 2 ? total + e.calories : total, 0), [activities])

    const ResumeCalories = useMemo(() => caloriesConsumed - caloriesBurned, [caloriesConsumed, caloriesBurned])
    return (
        <>
            <h2 className=" text-4xl text-white font-black text-center">Resumen de Calorías</h2>

            <div className=" flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <CaloriesDisplay
                    valor={caloriesConsumed}
                    description="Consumidas"
                />

                <CaloriesDisplay
                    valor={caloriesBurned}
                    description="Quemadas"
                />

                <CaloriesDisplay
                    valor={ResumeCalories}
                    description="Diferencia"
                />
            </div>
        </>
    )
}
