import { useState } from "react"

export type ContadorPropsType = {
    contador: number
}

const initialState: ContadorPropsType = {
    contador: 0
}

export default function Contador() {

    const [state, setState] = useState<ContadorPropsType>(initialState)

    const incremetar = () => {
        setState((prev) => ({
            contador: prev.contador + 1
        }))
    }

    const decrementar = () => {
       setState((prev)=> ({
        contador: Math.max(prev.contador -1, 0)
       }))
    }

    return (
        <div className="container-contador">
            <h2>{state.contador}</h2>

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
