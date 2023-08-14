import clsx from "clsx";
import { Link } from "react-router-dom";

import Logo from "../../assets/images/logo.svg";

type Iprops = {};

const Header: React.FC<Iprops> = () => {
  return (
    <header className={clsx(" bg-white shadow-sm")}>
      <div
        className={clsx(
          "container mx-auto flex items-center justify-center py-5",
        )}
      >
        <Link to="/" className={clsx("inline-flex")}>
          <figure>
            <img src={Logo} alt="Yassir's logo" className={clsx("max-h-16")} />
          </figure>
        </Link>
      </div>
    </header>
  );
};

export default Header;
