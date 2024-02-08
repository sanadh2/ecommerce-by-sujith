import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { categoriesData, productData } from "../../static/data";
import styles from "../../Styles/Styles";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import Dropdown from "./Dropdown";
import NavBar from "./NavBar";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredProducts =
      productData &&
      productData.filter((product) => {
        if (product.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
          return product;
      });
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.screenY > 70) {
      setActive(true);
    } else setActive(false);
  });
  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden lg:flex lg:h-[50px] lg:py-[40px] items-center justify-between">
          <div>
            <Link to={"/"}>
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
              />
            </Link>
          </div>
          {/* search box */}
          <div className="w-[50%] relative">
            <input
              type="search"
              name=""
              id=""
              placeholder="Search Product"
              onChange={handleSearchChange}
              className="h-[40px] w-full bg-inherit px-2 border focus:border-2 border-[#ffbb38] outline-none rounded"
            />
            <AiOutlineSearch
              size={25}
              className="absolute right-2 bg-neutral-50 top-2 opacity-100  hover:opacity-50 active:opacity-20 cursor-pointer"
            />
            {searchTerm && searchData && searchData.length !== 0 && (
              <div className="absolute min-h-[10svh] bg-neutral-200 shadow-sm z-10 p-4 w-full">
                <ul className="">
                  {searchData.map((product) => {
                    const d = product.name;
                    const productName = d.replace(/\s+/g, "-");
                    return (
                      <li
                        className="list-none hover:bg-white rounded bg-inherit "
                        key={product.id}
                      >
                        <Link
                          to={`/products/${productName}`}
                          className="w-full "
                        >
                          <div className="mr-3 my-1 flex items-center">
                            <img
                              src={product.image_Url[0].url}
                              alt=""
                              className="w-10 h-10 mr-3 mix-blend-darken"
                            />

                            <h2 className="">{product.name}</h2>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          <div className={`${styles.button}`}>
            <Link to={"/seller"}>
              <h2 className="text-white flex justify-center items-center">
                Become Seller
                <IoIosArrowForward className="ml-2" />
              </h2>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } hidden lg:flex items-center justify-between w-full bg-amber-300 h-[70px] rounded`}
      >
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}
        >
          {/*categories */}
          <div>
            <div className="relative h-[60px] mt-[10px] w-[270px] 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans font-[500] text-lg select-none rounded-t-md`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={22}
                className="absolute right-2 top-5 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <Dropdown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          {/* nav items */}
          <div className={`${styles.normalFlex}`}>
            <NavBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
