import React from "react";
import styles from './NotFoundBlock.module.scss';


const NotFound = () => {
return (
 <div className={styles.root}>
    <h1>
        😔 <br></br>Ничего не найдено
    </h1>
    <p className={styles.description}>К сожалению, данная страница отстутствует в нашем интернет магазине</p>
 </div>
)

}
export default NotFound;