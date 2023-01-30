import React from "react";
import "../scss/app.scss";
import { useParams } from "react-router-dom";
import axios from "axios";

const FullPizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://634cd045acb391d34a8c8718.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при  получении пиццы");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return "Загрузка...";
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.name}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus alias
        dolore unde, ullam ratione, sint debitis iste a odit vel ad quasi beatae
        cumque dicta error vero eveniet laudantium itaque.
      </p>
      <h4>{pizza.price} р</h4>
    </div>
  );
};

export default FullPizza;
