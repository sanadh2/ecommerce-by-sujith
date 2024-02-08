import PropTypes from "prop-types";
import styles from "../../Styles/Styles";
import { useNavigate } from "react-router-dom";
const Dropdown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();

  const handleSubmit = (category) => {
    navigate(`/products?category=${category.title}`);
    setDropDown(false);
    window.location.reload();
  };

  return (
    <div className="pb-4 bg-white w-[270px] shadow absolute z-20 ">
      {categoriesData &&
        categoriesData.map((category, index) => (
          <div
            key={index}
            className={`${styles.normalFlex}`}
            onClick={() => handleSubmit(category)}
          >
            <img
              src={category.image_Url}
              alt=""
              className="w-6 h-6 object-contain ml-3 select-none"
            />
            <h3 className="m-3 cursor-pointer select-none">{category.title}</h3>
          </div>
        ))}
    </div>
  );
};
export default Dropdown;

Dropdown.propTypes = {
  categoriesData: PropTypes.array,
  setDropDown: PropTypes.func,
};
