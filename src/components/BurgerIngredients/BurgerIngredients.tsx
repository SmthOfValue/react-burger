import React, { useState, useEffect, FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import IngredientsGroup from '../IngredientsGroup/IngredientsGroup';
import { useSelector } from '../../services/store';
import { useInView } from 'react-hook-inview';
import { TIngredient } from '../../utils/types';



const BurgerIngredients: FC = ({}) => {
    
     const {ingredients, ingredientsRequest} = useSelector(state => state.ingredients);

    //использование хука useInView для смены вкладок навигации при скролле
    const [bunsRef, inViewBuns] = useInView({ threshold: 0.35 }) as unknown as [React.RefObject<HTMLLIElement>, boolean];
    const [saucesRef, inViewSauces] = useInView({ threshold: 0.4 }) as unknown as [React.RefObject<HTMLLIElement>, boolean];;
    const [mainRef, inViewMain] = useInView({ threshold: 0.2 }) as unknown as [React.RefObject<HTMLLIElement>, boolean];;

    useEffect(() => {
        if (inViewBuns) {
            setCurrentTab("булки");
        } else if (inViewSauces) {
            setCurrentTab("соусы");
        } else if (inViewMain) {
            setCurrentTab("начинки");
        }
    }, [inViewBuns, inViewMain, inViewSauces]);


    

    //обработчик нажатия на вкладку
    const onTabClick = (tab: string) => {
        setCurrentTab(tab);
        const element = document.getElementById(tab);
        if (element) element.scrollIntoView({ behavior: "smooth" });
    };

    
    const [currentTab, setCurrentTab] = useState<string>('булки');
    //функция фильтрации массива ингредиентов по типу ингредиента
    const filterByType = (ingredientsArray: ReadonlyArray<TIngredient>, typeName: string) => {
        return ingredientsArray.filter((ingredient) => ingredient.type === typeName);
    }
    
        return(
            <section className={`mr-10 ${burgerIngredientsStyles.section}`}>
                <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
                <div style={{ display: 'flex' }}>
                    <Tab value="булки" active={currentTab === 'булки'} onClick={onTabClick}>
                        Булки
                    </Tab>
                    <Tab value="соусы" active={currentTab === 'соусы'} onClick={onTabClick}>
                        Соусы
                    </Tab>
                    <Tab value="начинки" active={currentTab === 'начинки'} onClick={onTabClick}>
                        Начинки
                    </Tab>
                </div>
                {ingredientsRequest &&
                    <p className={`text text_type_main-large ${burgerIngredientsStyles.loader}`}>Загрузка...</p>
                }
                {!ingredientsRequest &&
                <ul className={burgerIngredientsStyles.list}>
                    <IngredientsGroup scrollRef={bunsRef} titleId="булки" ingredients={filterByType(ingredients, "bun")}>Булки</IngredientsGroup>
                    <IngredientsGroup scrollRef={saucesRef} titleId="соусы" ingredients={filterByType(ingredients, "sauce")}>Соусы</IngredientsGroup>
                    <IngredientsGroup scrollRef={mainRef} titleId="начинки" ingredients={filterByType(ingredients, "main")}>Начинки</IngredientsGroup>
                </ul>    
                }         
            </section>
        )
}






export default BurgerIngredients;