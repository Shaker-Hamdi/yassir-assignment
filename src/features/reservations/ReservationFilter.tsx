import { useState } from "react";

type Iprops = {
  onSubmit: (filters: any) => void;
};

const ReservationFilter: React.FC<Iprops> = ({ onSubmit }) => {
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [shiftFilters, setShiftFilters] = useState<string[]>([]);
  const [areaFilters, setAreaFilters] = useState<string[]>([]);

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
    onSubmit({
      status: [],
      businessDate: null,
      shift: [],
      area: [],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3>Status</h3>
        <label>
          Confirmed
          <input
            type="checkbox"
            checked={statusFilters.includes("CONFIRMED")}
            onChange={() =>
              handleCheckboxChange("CONFIRMED", statusFilters, setStatusFilters)
            }
          />
        </label>

        <label>
          Seated
          <input
            type="checkbox"
            checked={statusFilters.includes("SEATED")}
            onChange={() =>
              handleCheckboxChange("SEATED", statusFilters, setStatusFilters)
            }
          />
        </label>

        <label>
          Checked out
          <input
            type="checkbox"
            checked={statusFilters.includes("CHECKED OUT")}
            onChange={() =>
              handleCheckboxChange(
                "CHECKED OUT",
                statusFilters,
                setStatusFilters,
              )
            }
          />
        </label>

        <label>
          Not Confirmed
          <input
            type="checkbox"
            checked={statusFilters.includes("NOT CONFIRMED")}
            onChange={() =>
              handleCheckboxChange(
                "NOT CONFIRMED",
                statusFilters,
                setStatusFilters,
              )
            }
          />
        </label>
      </div>

      <div>
        <h3>Reservation Day</h3>
        <input
          type="date"
          value={selectedDate || ""}
          onChange={e => setSelectedDate(e.target.value)}
        />
      </div>

      <div>
        <h3>Shifts</h3>
        <label>
          Breakfast
          <input
            type="checkbox"
            checked={shiftFilters.includes("BREAKFAST")}
            onChange={() =>
              handleCheckboxChange("BREAKFAST", shiftFilters, setShiftFilters)
            }
          />
        </label>

        <label>
          Lunch
          <input
            type="checkbox"
            checked={shiftFilters.includes("LUNCH")}
            onChange={() =>
              handleCheckboxChange("LUNCH", shiftFilters, setShiftFilters)
            }
          />
        </label>

        <label>
          Dinner
          <input
            type="checkbox"
            checked={shiftFilters.includes("DINNER")}
            onChange={() =>
              handleCheckboxChange("DINNER", shiftFilters, setShiftFilters)
            }
          />
        </label>
      </div>

      <div>
        <h3>Area</h3>
        <label>
          Bar
          <input
            type="checkbox"
            checked={areaFilters.includes("BAR")}
            onChange={() =>
              handleCheckboxChange("BAR", areaFilters, setAreaFilters)
            }
          />
        </label>

        <label>
          Main Room
          <input
            type="checkbox"
            checked={areaFilters.includes("MAIN ROOM")}
            onChange={() =>
              handleCheckboxChange("MAIN ROOM", areaFilters, setAreaFilters)
            }
          />
        </label>
      </div>

      <button type="submit">Apply Filters</button>
      <button type="button" onClick={handleClearFilters}>
        Clear Filters
      </button>
    </form>
  );
};

export default ReservationFilter;
