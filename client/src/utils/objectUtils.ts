import { labelize } from "../utils/stringUtils";
import { FieldValues } from "react-hook-form";
import { FormSelectOption } from "../components/forms/FormSelect";

export const objectWithoutKeys = <T extends object,>(object: T, ...keys: (keyof T)[]) => {
    return Object.entries(object).reduce(
        (acc, [key, value]) => (
            !keys.includes(key as keyof T) ?
                { ...acc, [key]: value } :
                acc
        ),
        {}
    ) as Exclude<T, typeof keys[number]>
}

export const toFormOption = <T extends FieldValues>(object: object, withLabel = false, shouldLabelize = false): FormSelectOption<T>[] => (
    Object.entries(object).map(
        ([label, value]) => {
            const optionLabel = withLabel ? label : value
            return {
                label: shouldLabelize ? labelize(optionLabel) : optionLabel,
                value
            }
        }
    )
)

export default {}