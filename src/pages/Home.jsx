import React from "react";
import ReactPaginate from 'react-paginate';
import Pagination from '../components/Pagination/index'

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

export const Home = ({searchValue}) => {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [categoryId, setCategoryId] = React.useState(0);
    const[currentPage, setCurrentPage] = React.useState(1)
    const [sortType, setSortType] = React.useState( {name:'популярности', sortProperty:'rating'});
    const search = searchValue ? `&search=${searchValue}` : ''
  
  
  React.useEffect(() => {
    setIsLoading(true)
    fetch(`https://634cd045acb391d34a8c8718.mockapi.io/items?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : '' }&sortBy=${sortType.sortProperty}&order=desc${search}`)
    .then((res) => res.json())
    .then((arr) => {
      setItems(arr);
      setIsLoading(false)
    });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage])

  const pizzas =  items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>)
    return (
        <div className="container">
        <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)}/>
        <Sort  value={sortType} onChangeSort={(i) => setSortType(i)}/>
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
        {
         isLoading ? [...new Array(8)].map((_, index) => <Skeleton key={index}/>)
         :pizzas
        }
        </div>
       <Pagination
       onChangePage={number => setCurrentPage(number)}/>
        </div>
    )
}
export default Home;