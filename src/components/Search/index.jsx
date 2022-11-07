import React from "react";
import styles from './Search.module.scss';
import { SearchContext } from "../../App";


const Search = () => {
    const {searchValue, setSearchValue} = React.useContext(SearchContext)
    return (
        <div className={styles.root}>
            <svg 
            className={styles.icon}
            viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><g id="search"><path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z"/></g></svg>
            <input className={styles.input}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Поиск пиццы..." />
            {searchValue && (<svg 
            onClick = {() => setSearchValue('')}
            className={styles.clear}
            data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg"><title/><path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z"/></svg>)}
        </div>
       
    )
}
export default Search;