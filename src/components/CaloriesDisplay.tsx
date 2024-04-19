type CaloriesDisplayProps = {
    valor: number,
    description: string
}

export const CaloriesDisplay = ({valor, description}: CaloriesDisplayProps) => {

    return (
        <>
            <p className=" text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center text-lg">
                <span className=" font-black text-6xl text-white">{valor}</span>
                {description}
            </p>
        </>
    )
}
