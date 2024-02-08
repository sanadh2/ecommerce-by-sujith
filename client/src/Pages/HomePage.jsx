import { useEffect } from "react";

import store from "../redux/store";
import { loadUser } from "../redux/actions/user";
import Header from "../Components/Layout/Header";

const HomePage = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <div className="bg-neutral-100 min-h-[200svh]">
      <Header />
    </div>
  );
};

export default HomePage;
