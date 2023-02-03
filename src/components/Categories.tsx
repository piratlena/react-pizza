import React, { FC } from "react";

type CategoriesProps = {
  value: number;
  onChangeCategory: any;
};
const Categories: FC<CategoriesProps> = ({ value, onChangeCategory }) => {
  const categories = [
    "Все",
    "Мясная",
    "Вегетарианская",
    "Грибная",
    "Гавайская",
    "Сырная",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onChangeCategory(i)}
            className={value === i ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Categories;
