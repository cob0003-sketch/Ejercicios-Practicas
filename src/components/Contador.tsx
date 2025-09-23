import { useState } from "react"

export default function Contador() {

    const [contador, setContador] = useState<number>(0)

    const incremetar = () => {
        setContador(contador + 1)
    }

    const decrementar = () => {
        setContador((prev)=> 
        Math.max(prev - 1, 0) //
        )
    }

    return (
        <div className="container-contador">
            <h2>{contador}</h2>

            <button
                type="button"
                className="incrementar"
                onClick={incremetar}
            >
                Incremetar +
            </button>

            <button
                type="button"
                className="decrementar"
                onClick={decrementar}
            >
                Decremetar -
            </button>

        </div>
    )
}
