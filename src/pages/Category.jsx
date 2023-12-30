import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFilteredCategory } from "../api";
import { Preloader } from "../components/Preloader";
import { MealList } from "../components/MealList";

function Category() {
  const {name} = useParams();
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  useEffect(() => {
    getFilteredCategory(name)
      .then(data => setMeals(data.meals));
  }, [name])

  return <div className="categories">
    <div className="btn-goBack">
      <button className="btn" onClick={goBack}>Go Back</button>
    </div>
    {meals.length ? <MealList meals={meals} /> : <Preloader />}
  </div>
}

export {Category}