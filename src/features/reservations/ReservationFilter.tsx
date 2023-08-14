import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import { useState } from "react";

import Icon from "../../components/ui/Icon";

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
          <button aria-label="Update dimensions">
            <Icon iconName="filter_alt" />
          </button>
        </Popover.Trigger>
        <Popover.Content
          className={clsx("rounded-xl bg-white p-5 shadow-md")}
          sideOffset={5}
        >
          <form onSubmit={handleSubmit}>
            <div>
              <h3>Status</h3>
              {statusFilterOptions.map(status => (
                <label key={status}>
                  {status}
                  <input
                    type="checkbox"
                    checked={statusFilters.includes(status)}
                    onChange={() =>
                      handleCheckboxChange(
                        status,
                        statusFilters,
                        setStatusFilters,
                      )
                    }
                  />
                </label>
              ))}
            </div>

            <div>
              <h3>Shifts</h3>
              {shiftFilterOptions.map(shift => (
                <label key={shift}>
                  {shift}
                  <input
                    type="checkbox"
                    checked={shiftFilters.includes(shift)}
                    onChange={() =>
                      handleCheckboxChange(shift, shiftFilters, setShiftFilters)
                    }
                  />
                </label>
              ))}
            </div>

            <div>
              <h3>Area</h3>
              {areFilterOptions.map(area => (
                <label key={area}>
                  {area}
                  <input
                    type="checkbox"
                    checked={areaFilters.includes(area)}
                    onChange={() =>
                      handleCheckboxChange(area, areaFilters, setAreaFilters)
                    }
                  />
                </label>
              ))}
            </div>

            <div>
              <h3>Reservation Day</h3>
              <input
                type="date"
                value={selectedDate || ""}
                onChange={e => setSelectedDate(e.target.value)}
              />
            </div>

            <button type="submit">Apply Filters</button>
            <button type="button" onClick={handleClearFilters}>
              Clear Filters
            </button>
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
