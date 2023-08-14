import { clsx } from "clsx";

type Iprops = {
  id: string;
  label: string;
  checked: boolean;
  onChangeHandler: (e: any) => void;
  wrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
};

const InputCheckbox: React.FC<Iprops> = ({
  id,
  label,
  checked,
  onChangeHandler,
  wrapperClassName,
  inputClassName,
  labelClassName,
}) => {
  return (
    <div className={`relative flex items-center ${wrapperClassName}`}>
      <div className="flex h-5 items-center">
        <input
          id={id}
          aria-describedby="comments-description"
          type="checkbox"
          checked={checked}
          onChange={onChangeHandler}
          className={clsx(inputClassName)}
        />
      </div>
      <div className="cursor-pointer leading-none">
        <label
          htmlFor={id}
          className={clsx(
            "inline-flex cursor-pointer ps-2 font-medium capitalize text-gray-500 transition hover:text-gray-700",
            labelClassName,
          )}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default InputCheckbox;
