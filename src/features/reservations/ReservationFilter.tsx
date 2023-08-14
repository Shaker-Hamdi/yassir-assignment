import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import { useState } from "react";

import Icon from "../../components/ui/Icon";
import InputCheckbox from "../../components/ui/InputCheckbox";

type Iprops = {
  onSubmit: (filters: any) => void;
};

const ReservationFilter: React.FC<Iprops> = ({ onSubmit }) => {
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [shiftFilters, setShiftFilters] = useState<string[]>([]);
  const [areaFilters, setAreaFilters] = useState<string[]>([]);

  const statusFilterOptions = [
    "CONFIRMED",
    "SEATED",
    "CHECKED OUT",
    "NOT CONFIRMED",
  ];

  const shiftFilterOptions = ["BREAKFAST", "LUNCH", "DINNER"];

  const areFilterOptions = ["BAR", "MAIN ROOM"];

  const handleCheckboxChange = (
    filterName: string,
    currentValue: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (currentValue.includes(filterName)) {
      setter(currentValue.filter(filter => filter !== filterName));
    } else {
      setter([...currentValue, filterName]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const filters = {
      status: statusFilters,
      businessDate: selectedDate,
      shift: shiftFilters,
      area: areaFilters,
    };

    onSubmit(filters);
  };

  const handleClearFilters = () => {
    setStatusFilters([]);
    setSelectedDate(null);
    setShiftFilters([]);
    setAreaFilters([]);
    onSubmit({});
  };

  return (
    <>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            aria-label="Update dimensions"
            className={clsx(
              "flex h-14 w-14 items-center justify-center rounded-full border border-violet-600 bg-violet-600 text-white transition hover:bg-white hover:text-violet-600",
            )}
          >
            <Icon iconName="filter_alt" />
          </button>
        </Popover.Trigger>
        <Popover.Content
          className={clsx("rounded-xl bg-white p-5 shadow-md")}
          sideOffset={5}
          align="end"
        >
          <form onSubmit={handleSubmit}>
            <div className={clsx("mb-5")}>
              <h3 className={clsx("mb-2 text-lg font-medium text-violet-600")}>
                Status
              </h3>
              {statusFilterOptions.map(status => (
                <InputCheckbox
                  key={status}
                  id={`filter_${status}`}
                  checked={statusFilters.includes(status)}
                  label={status.toLowerCase()}
                  onChangeHandler={() =>
                    handleCheckboxChange(
                      status,
                      statusFilters,
                      setStatusFilters,
                    )
                  }
                  wrapperClassName={clsx("mb-1 last:mb-0")}
                />
              ))}
            </div>

            <div className={clsx("mb-5")}>
              <h3 className={clsx("mb-2 text-lg font-medium text-violet-600")}>
                Shifts
              </h3>
              {shiftFilterOptions.map(shift => (
                <InputCheckbox
                  key={shift}
                  id={`filter_${shift}`}
                  checked={shiftFilters.includes(shift)}
                  label={shift.toLowerCase()}
                  onChangeHandler={() =>
                    handleCheckboxChange(shift, shiftFilters, setShiftFilters)
                  }
                  wrapperClassName={clsx("mb-1 last:mb-0")}
                />
              ))}
            </div>

            <div className={clsx("mb-5")}>
              <h3 className={clsx("mb-2 text-lg font-medium text-violet-600")}>
                Area
              </h3>
              {areFilterOptions.map(area => (
                <InputCheckbox
                  key={area}
                  id={`filter_${area}`}
                  checked={areaFilters.includes(area)}
                  label={area.toLowerCase()}
                  onChangeHandler={() =>
                    handleCheckboxChange(area, areaFilters, setAreaFilters)
                  }
                  wrapperClassName={clsx("mb-1 last:mb-0")}
                />
              ))}
            </div>

            <div>
              <h3 className={clsx("mb-2 text-lg font-medium text-violet-600")}>
                Reservation Day
              </h3>
              <input
                type="date"
                value={selectedDate || ""}
                onChange={e => setSelectedDate(e.target.value)}
                className={clsx("w-full min-w-[300px]")}
              />
            </div>

            <div className={clsx("mt-5 flex items-center justify-end gap-3")}>
              <button type="button" onClick={handleClearFilters}>
                Clear Filters
              </button>
              <button
                type="submit"
                className={clsx(
                  "flex h-11 items-center justify-center rounded-xl border border-violet-600 bg-violet-600 px-3 text-center text-white transition hover:bg-white hover:text-violet-600",
                )}
              >
                Apply Filters
              </button>
            </div>
          </form>
          <Popover.Close aria-label="Close">
            <Icon iconName="close" />
          </Popover.Close>
          <Popover.Arrow className={clsx("fill-gray-400")} />
        </Popover.Content>
      </Popover.Root>
    </>
  );
};

export default ReservationFilter;
