import React, {useMemo, FC} from 'react';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './BurgerConstructor.module.css';
import { useSelector, useDispatch } from '../../services/store';
import { getOrder } from '../../services/actions/orderDetails';
import {useDrop} from 'react-dnd';
import { addIngredient } from '../../services/actions/burgerConstructor';
import { setBunsCount, increaseIngredientCount } from '../../services/actions/ingredients';
import ConstructorListItem from '../ConstructorListItem/ConstructorListItem';
import {useHistory} from 'react-router-dom';
import type { 
    TIngredient,
    TConstructorIngredient 
} from '../../utils/types';

const BurgerConstructor: FC = () => {

    const dispatch = useDispatch();
    const constructorIngredients = useSelector(store => store.constructorIngredients);
    const {isAuth} = useSelector(store => store.user);
    const history = useHistory();

    
    
    //дроп-таргет для ингредиентов, отправляет экшны на добавление ингредиента в хранилище и изменение счетчиков в зависимости от типа ингредиента
    const [, drop] = useDrop<TIngredient>(() => ({
        accept: "ingredient",
        drop(ingredient) {
            if (ingredient.type === "bun") {
                dispatch(setBunsCount(ingredient._id))
            }
            else {
                dispatch(increaseIngredientCount(ingredient._id));
            }            
            dispatch(addIngredient(ingredient));
            
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
                price={0}
                thumbnail="https://cdn-icons-png.flaticon.com/512/791/791590.png"
            />
        </span>
    </li>);

    const defaultBun = (type: 'top' | 'bottom') => (
        <ConstructorElement
            type={type}
            isLocked={true}       
            text="Перетащите сюда булку"
            price={0}
            thumbnail="https://cdn-icons-png.flaticon.com/512/1725/1725713.png"
        />
    );

    

    //функция подсчета цены заказа
    const totalPrice = useMemo<number>(() => {
        return (
          (constructorIngredients.bun ? constructorIngredients.bun.price * 2 : 0) +
          constructorIngredients.data.reduce((sum, ingredient) => sum + ingredient.price, 0)
        );
      }, [constructorIngredients]);

    //функция рендера ингредиентов между булок
    const renderMiddleIngredients = (selectedIngredient: TConstructorIngredient, index: number) => {
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
                        {!constructorIngredients.bun && 
                            defaultBun("top")
                        }
                        {constructorIngredients.bun &&
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
                {!constructorIngredients.bun &&
                    defaultBun("bottom")
                }
                {constructorIngredients.bun &&
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
                <Button
                    onClick={() => {
                        if (constructorIngredients.bun) {
                                if (isAuth) {
                                    dispatch(getOrder(constructorIngredients))
                                } else {
                                    history.push("/login");
                                }
                            }
                        }}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}



export default BurgerConstructor;