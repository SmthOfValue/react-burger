import React, {useMemo, useCallback} from 'react';
import { Typography, Box, ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './BurgerConstructor.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getOrder } from '../../services/actions/orderDetails.js';
import {useDrop} from 'react-dnd';
import { ADD_INGREDIENT } from '../../services/actions/burgerConstructor';
import { INCREASE_INGREDIENT_COUNT, SET_BUNS_COUNT } from '../../services/actions/ingredients';
import {generateID} from '../../utils/utils.js';
import ConstructorListItem from '../ConstructorListItem/ConstructorListItem.jsx';

const BurgerConstructor = () => {

    const dispatch = useDispatch();
    const constructorIngredients = useSelector(store => store.constructorIngredients);

    //дроп-таргет для ингредиентов, отправляет экшны на добавление ингредиента в хранилище и изменение счетчиков в зависимости от типа ингредиента
    const [{}, drop] = useDrop(() => ({
        accept: "ingredient",
        drop(ingredient) {
            if (ingredient.type === "bun") {
                dispatch({
                    type: SET_BUNS_COUNT,
                    id: ingredient._id
                })
            }
            else {
                dispatch({
                    type: INCREASE_INGREDIENT_COUNT,
                    id: ingredient._id
                });
            }            
            dispatch({
                type: ADD_INGREDIENT,
                payload: ingredient
            });
            
        }
      }))

    //отображение конструктора до добавления ингредиентов
    const defaultMiddleIngredients = (
    <li className={BurgerConstructorStyles.element}>
        <span className="mr-2">
            <DragIcon type="primary"></DragIcon>
        </span>
        <span className={BurgerConstructorStyles.ingredient}>
            <ConstructorElement
            isLocked={true}       
            text="Перетащите сюда соусы или начинки"
            price="0"
            thumbnail="https://cdn-icons-png.flaticon.com/512/791/791590.png"
            />
        </span>
    </li>);

    const defaultBun = (type) => (
        <ConstructorElement
            type={type}
            isLocked={true}       
            text="Перетащите сюда булку"
            price="0"
            thumbnail="https://cdn-icons-png.flaticon.com/512/1725/1725713.png"
        />
    );

    

    //функция подсчета цены заказа
    const totalPrice = useMemo(() => {
        return (
          (constructorIngredients.bun ? constructorIngredients.bun.price * 2 : 0) +
          constructorIngredients.data.reduce((sum, ingredient) => sum + ingredient.price, 0)
        );
      }, [constructorIngredients]);

    //функция рендера ингредиентов между булок
    const renderMiddleIngredients = (selectedIngredient, index) => {
        return (
            <ConstructorListItem 
                key={selectedIngredient.constructorId}
                name={selectedIngredient.name}
                price={selectedIngredient.price}
                image={selectedIngredient.image}
                _id={selectedIngredient._id}
                constructorId={selectedIngredient.constructorId}
                index={index}
            />
        )
    };

    //рендер ингредиентов между булок
    const middleIngredientsList = constructorIngredients.data.map(
        (selectedIngredient, index) => renderMiddleIngredients(selectedIngredient, index));
    
   
    return (
        <section ref={drop} className={`mt-15 ml-4 ${BurgerConstructorStyles.section}`}>
                <div className={`ml-4 ${BurgerConstructorStyles.ingredient}`}>
                    {!constructorIngredients.bun.name &&
                        defaultBun("top")
                    }
                    {constructorIngredients.bun.name &&
                    <ConstructorElement
                        type="top"
                        isLocked={true}       
                        text={`${constructorIngredients.bun.name} (верх)`}
                        price={constructorIngredients.bun.price}
                        thumbnail={constructorIngredients.bun.image}
                    />}
                </div>
            <ul className={` ${BurgerConstructorStyles.list}`}>
                {middleIngredientsList.length === 0 &&
                defaultMiddleIngredients
                }
                {middleIngredientsList.length > 0 && 
                middleIngredientsList  
                }
            </ul>
            <div className={`ml-4 ${BurgerConstructorStyles.ingredient}`}>
                {!constructorIngredients.bun.name &&
                    defaultBun("bottom")
                }
                {constructorIngredients.bun.name &&
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}       
                        text={`${constructorIngredients.bun.name} (низ)`}
                        price={constructorIngredients.bun.price}
                        thumbnail={constructorIngredients.bun.image}
                    />
                }
            </div>
            <div className={`mt-6 mr-4 ${BurgerConstructorStyles.checkout}`}>
                <p className={`text text_type_digits-medium mr-10 ${BurgerConstructorStyles.total}`}>
                    {totalPrice > 0 &&
                        <span className="mr-2">{totalPrice}</span>
                    }
                    <CurrencyIcon type="primary"/>
                </p>
                <Button onClick={() => dispatch(getOrder(constructorIngredients))}>Оформить заказ</Button>
            </div>
        </section>
    )
}



export default BurgerConstructor;