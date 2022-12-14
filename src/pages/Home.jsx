import React from "react";
import ReactPaginate from 'react-paginate';
import Pagination from '../components/Pagination/index';
import { SearchContext } from "../App";
import { useSelector, useDispatch} from 'react-redux';
import axios from "axios";
import qs from 'qs';
import { useNavigate } from "react-router-dom";
import { sortList } from "../components/Sort";

import { setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

export const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)
  const categoryId = useSelector(state => state.filter.categoryId);
  const sortType = useSelector(state => state.filter.sort.sortProperty);

 // const setCategoryId = () => {}

  const {searchValue} = React.useContext(SearchContext)
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
   // const [categoryId, setCategoryId] = React.useState(0);
    const[currentPage, setCurrentPage] = React.useState(1)

    const search = searchValue ? `&search=${searchValue}` : '';

    const onChangeCategory = (id) => {
      dispatch(setCategoryId(id));
    }
    
    const fetchPizzas = () => {
      setIsLoading(true)
      axios.get(`https://634cd045acb391d34a8c8718.mockapi.io/items?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : '' }&sortBy=${sortType.sortProperty}&order=desc${search}`)
      .then(res => {
        setItems(res.data);
        setIsLoading(false)
      })
    }

    React.useEffect(() => {
      if(window.location.search) {
        const params = qs.parse(window.location.search.substring(1))

        const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)

        dispatch(
          setFilters({
            ...params,
            sort
          })
        )
        isSearch.current = true;
      }
    }, [])
  
  
  React.useEffect(() => {

    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false
  }, [categoryId, sortType, searchValue, currentPage])

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage
      })
     console.log(queryString)
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sortType, searchValue, currentPage])


  const pizzas =  items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>)
    return (
        <div className="container">
        <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
        <Sort/>
        </div>
        <h2 className="content__title">?????? ??????????</h2>
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