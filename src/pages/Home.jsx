import React from "react";
import ReactPaginate from 'react-paginate';
import Pagination from '../components/Pagination/index';
import { SearchContext } from "../App";
import { useSelector, useDispatch} from 'react-redux';

import { setCategoryId } from "../redux/slices/filterSlice";
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

export const Home = () => {
  const dispatch = useDispatch()
  const categoryId = useSelector(state => state.filter.categoryId);
  console.log(categoryId)
  const sortType = useSelector(state => state.filter.sort.sortProperty);

 // const setCategoryId = () => {}

  const {searchValue} = React.useContext(SearchContext)
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
   // const [categoryId, setCategoryId] = React.useState(0);
    const[currentPage, setCurrentPage] = React.useState(1)

    const search = searchValue ? `&search=${searchValue}` : '';

    const onChangeCategory = (id) => {
      console.log(id)
      dispatch(setCategoryId(id));
    }
  
  
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
        <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
        <Sort/>
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