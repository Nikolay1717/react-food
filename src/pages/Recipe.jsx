import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { getMealById } from "../api";
import { Preloader } from "../components/Preloader";

function Recipe() {
  const [recipe, setRecipe] = useState({});
  const {idMeal} = useParams();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  
  useEffect(() => {
    getMealById(idMeal).then(data => setRecipe(data.meals[0]))
  }, [idMeal])

  return <div>
    {!recipe.idMeal ? <Preloader /> : (
      <div className="recipe">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <h1>{recipe.strMeal}</h1>
        <h6>Category: {recipe.strCategory}</h6>
        {recipe.strArea ? <h6>Area: {recipe.strArea}</h6> : null}
        <p>{recipe.strInstructions}</p>

        <table className="ingredients striped centered">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Measure</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(recipe).map(key => {
                if (key.includes('Ingredient') && recipe[key]) {
                  return (
                    <tr key={key}>
                      <td>{recipe[key]}</td>
                      <td>
                        {
                          recipe[`strMeasure${key.slice(13)}`]
                        }
                      </td>
                    </tr>
                  )
                }
                return null;
              })
            }
          </tbody>
        </table>

        {recipe.strYoutube ? (
          <div className="row" style={{marginBottom: '1px'}}>
            <h5 style={{margin: '1.5rem 0 1rem'}}>Video Recipe</h5>
            <iframe title={idMeal} src={`https://www.youtube.com/embed/${recipe.strYoutube.slice(-11)}`} allowFullScreen />
          </div>
        ): null}
      </div>
    )}
    <div className="btn-goBack-recipe">
      <button className="btn" onClick={goBack}>Go Back</button>
    </div>
  </div>
}

export {Recipe}