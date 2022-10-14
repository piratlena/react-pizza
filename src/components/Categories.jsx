import React from 'react';

const Categories = () => {
  const[activeIndex, setActiveIndex] = React.useState(0)

  const categories = ['Все', 'Мясная', 'Вегетарианская', 'Грибная', 'Гавайская', 'Сырная']



    return (
      <div className="categories">
       <ul>
        {categories.map((item, index) => (
          <li key={index} onClick={() => setActiveIndex(index)} className={activeIndex===index ? 'active' : ''}>{item}</li>
        ))}
       </ul>
      </div>
    )
}
export default Categories;