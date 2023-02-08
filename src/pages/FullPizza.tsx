import React, { FC } from "react";
import "../scss/app.scss";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FullPizza: FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://634cd045acb391d34a8c8718.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при  получении пиццы");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>"Загрузка..."</>;
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza" />
      <h2>{pizza.title}</h2>
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
