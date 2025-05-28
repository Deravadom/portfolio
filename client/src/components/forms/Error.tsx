import { FieldError } from "react-hook-form"

export type ErrorProps = {
  errorField?: FieldError | undefined
  errorClass?: string
  errorMessage?: string
  errorSpaceClass?: string
}

const Error = ({
  errorField,
  errorClass,
  errorMessage = "Required",
  errorSpaceClass,
}: ErrorProps) => {
  return (
    <div className={!errorField ? errorSpaceClass : undefined}>
      {errorField && (
        <p role="alert" className={errorClass}>{errorMessage}</p>
      )}
      {!errorField && (
        <div className={errorSpaceClass} />
      )}
    </div>
  )
}
export default Error