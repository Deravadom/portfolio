import { useCallback, useEffect, useState } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import Row from "../flex/Row";
import Grid from "../flex/Grid";
import Button from "../flex/Button";
import { useFormContext } from "react-hook-form";
import Accordion from "../Accordion";

type DateValue = Date | null;

const areSameDay = (a: Date, b: Date) => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

const isInRange = (date: Date, start: DateValue, end: DateValue) => {
  if (!start || !end) return false;
  const time = date.getTime();
  return (
    time >= new Date(start.setHours(0, 0, 0, 0)).getTime() &&
    time <= new Date(end.setHours(0, 0, 0, 0)).getTime()
  );
}

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
}

const getFirstDayOfWeek = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
}

const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const FormCalendarRangePicker = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const { register, watch, setValue } = useFormContext<{ startDate?: DateValue, endDate?: DateValue }>()

  useEffect(() => {
    register("startDate")
    register("endDate")
  }, [register])

  const startDate = watch("startDate")
  const endDate = watch("endDate")

  const setStartDate = useCallback((date: DateValue) => (
    setValue("startDate", date)
  ), [setValue])

  const setEndDate = useCallback((date: DateValue) => (
    setValue("endDate", date)
  ), [setValue])

  const handleDayClick = useCallback((date: Date) => {
    if (startDate && !endDate && date >= startDate) {
      setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  }, [endDate, setEndDate, setStartDate, startDate])

  const prevMonth = useCallback(() => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }, [month, year])

  const nextMonth = useCallback(() => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }, [month, year])

  // Build days grid
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);
  const days: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++)
    days.push(new Date(year, month, d));

  return (
    <Accordion
      labelClass="flex flex-row w-full justify-between py-2 items-center"
      containerClass="flex flex-col w-full items-start p-2 text-left gap-2 bg-white rounded-2xl border"
      iconClass="h-6 w-6"
      label={<span className="font-medium text-xl">Choose a Date Range</span>}
      description={
        <>
          <span className="mb-2">Adjust your event results based on their event date.</span>
          <span className="w-full text-center text-lg font-stretch-100%">
            {[startDate?.toLocaleDateString() || '', endDate?.toLocaleDateString() || ''].join(' - ')}
          </span>
        </>
      }
    >
      <div className="w-full p-4 rounded-lg shadow border-t-tertiary">
        <Row className="justify-between items-center mb-4">
          <CaretLeftIcon className="h-6 w-6" onClick={prevMonth} />
          <span className="font-semibold text-lg">
            {new Date(year, month).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <CaretRightIcon className="h-6 w-6" onClick={nextMonth} />
        </Row>
        <Grid className="grid-cols-7 items-center justify-items-center">
          {weekdays.map(day => (
            <span key={day} className="text-xs font-medium mb-1">
              {day}
            </span>
          ))}
          {days.map((date, i) => {
            if (!date) return <div key={i}></div>

            const isEnd = endDate && areSameDay(date, endDate)

            const isSelected =
              (startDate && areSameDay(date, startDate)) ||
              (endDate && areSameDay(date, endDate))

            const inRange = startDate && endDate && isInRange(date, startDate, endDate)

            const buttonClass = isSelected
              ? 'bg-primary text-white font-bold w-9'
              : inRange
                ? 'bg-tertiary rounded-none w-full'
                : 'bg-white'

            const bgClass = isSelected
              ? isEnd
                ? 'bg-linear-to-r from-tertiary to-white'
                : endDate
                  ? 'bg-linear-to-r from-white to-tertiary'
                  : ''
              : inRange
                ? 'bg-tertiary'
                : 'bg-white'

            return (
              <div
                key={i}
                className={`w-full h-9 flex items-center justify-center transition ${bgClass}`}
              >
                <Button
                  key={date.toDateString()}
                  onClick={() => handleDayClick(date)}
                  className={`rounded-full w-9 h-9 flex items-center justify-center transition ${buttonClass}`}
                >
                  {date.getDate()}
                </Button>
              </div>
            )
          })}
        </Grid>
      </div>
    </Accordion>
  );
}

export default FormCalendarRangePicker