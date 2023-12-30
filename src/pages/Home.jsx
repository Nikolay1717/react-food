import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllCategories } from "../api";
import { Preloader } from "../components/Preloader";
import { CategoryList } from "../components/CategoryList";
import { Search } from "../components/Search";

function Home() {
  const [catalog, setCatalog] = useState([]);
  const [filteredCatalog, setFilteredCatalog] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryQuery = searchParams.get('search') || '';

  const handleSearch = (str) => {
    setFilteredCatalog(
      catalog.filter(item =>
        item.strCategory.toLowerCase().includes(str.toLowerCase())
      )
    );

    const params = str ? {
      search: str.toLowerCase()
    } : {};

    setSearchParams(params);
  }

  useEffect(() => {
    getAllCategories().then(data => {
      setCatalog(data.categories);
      setFilteredCatalog(data.categories.filter(item => item.strCategory.toLowerCase().includes(categoryQuery.toLowerCase())));
    })
  }, [categoryQuery]);

  return <>
    <Search cb={handleSearch} categoryQuery={categoryQuery} />
    {
      !catalog.length ? <Preloader /> : (
        <CategoryList catalog={filteredCatalog} />
      )
    }
  </>
}

export { Home }