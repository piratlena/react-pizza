import React from "react";
import Pagination from '../components/Pagination/index';
import { SearchContext } from "../App";
import { useSelector, useDispatch} from 'react-redux';
import qs from 'qs';
import { useNavigate } from "react-router-dom";
import {fetchPizzas} from '../redux/slices/pizzaSlice'
import { setCategoryId} from "../redux/slices/filterSlice";
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
  const sortType = useSelector(state => state.filter.sort);

 // const setCategoryId = () => {}

  const {searchValue} = React.useContext(SearchContext)
  const {items, status} = useSelector(state => state.pizza)
  const [isLoading, setIsLoading] = React.useState(false);
  const[currentPage, setCurrentPage] = React.useState(1)


  const search = searchValue ? `&search=${searchValue}` : '';

    const onChangeCategory = (id) => {
      dispatch(setCategoryId(id));
    }
    
    const getPizzas = async() => {
      dispatch(fetchPizzas({
        categoryId, sortType, searchValue, currentPage, search
      }))
      window.scrollTo(0, 0)
    }

     React.useEffect(() => {
      getPizzas()
    }, [])
  
  
  React.useEffect(() => {
  window.scrollTo(0, 0);
  if (!isSearch.current) {
      getPizzas();
    }
   isSearch.current = false
  }, [categoryId, sortType.sortProperty, searchValue, currentPage])

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
  }, [categoryId, sortType.sortProperty, searchValue, currentPage])


  const pizzas =  items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>)
    return (
        <div className="container">
        <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
        <Sort/>
        </div>
        <h2 className="content__title">Все пиццы</h2>

        {status==='error' ? 
          <div className="content__error-info">
              <h2>Произошла ошибка<icon>😕</icon></h2>
            <p>
             К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.
            </p>
          </div> :
          <div className="content__items">
        {
         status==='loading' ? [...new Array(8)].map((_, index) => <Skeleton key={index}/>)
         :pizzas
        }
        </div>}
       <Pagination
       onChangePage={number => setCurrentPage(number)}/>
        </div>
    )
}
export default Home;