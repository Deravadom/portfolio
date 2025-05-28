import { Dispatch, JSX, SetStateAction, useCallback, useMemo, useState } from "react"

export type CounterProps = {
    value: number
    setValue: Dispatch<SetStateAction<number>>
    increment: () => void
    decrement: () => void
    max: boolean
}

const useCounter = (start: number = 0, maxValue: number = 999, minValue: number = 0): CounterProps => {
    const [value, setValue] = useState(start);

    const increment = useCallback(() => {
        setValue(Math.min(value + 1, maxValue))
    }, [value, maxValue, setValue])

    const decrement = useCallback(() => {
        setValue(Math.max(value - 1, minValue))
    }, [value, minValue, setValue])

    const max = useMemo(() => value === maxValue, [maxValue, value])

    return { value, setValue, increment, decrement, max }
}

export type WizardOption = {
    label?: string
    value?: string
    element: JSX.Element
}

type WizardProps = CounterProps & {
    option: WizardOption
}

export const useWizard = ({ start = 0, options }: { start?: number, options: WizardOption[] }): WizardProps => {
    const counter = useCounter(start, options.length)
    return { ...counter, option: options[counter.value] }
}

export default useCounter;