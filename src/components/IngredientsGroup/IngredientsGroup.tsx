import React, {FC} from 'react';
import Ingredient from '../Ingredient/Ingredient';
import ingredientsGroupStyles from './IngredientsGroup.module.css';
import { Link, useLocation } from 'react-router-dom';
import type {TIngredient} from '../../utils/types';

interface IIngredientsGroupProps {
    ingredients: ReadonlyArray<TIngredient>;
    titleId: string;
    scrollRef: React.RefObject<HTMLLIElement>
}


const IngredientsGroup: FC<IIngredientsGroupProps> = ({children, ingredients, titleId, scrollRef}) => {

    const location = useLocation();

       
        return(               
            <li className={`mt-10 ${ingredientsGroupStyles.group}`} id={titleId} ref={scrollRef}>
                <p className={`mb-6 text text_type_main-medium ${ingredientsGroupStyles.type}`}>{children}</p>
                <ul className={ingredientsGroupStyles.ingredients}>
                    {ingredients.map((ingredient) => (
                        <Link
                            key={ingredient._id}
                            to={{
                                pathname: `/ingredients/${ingredient._id}`,
                                state: {background: location}
                            }}
                            className={ingredientsGroupStyles.link}
                        >
                            <Ingredient 
                                ingredient={ingredient}
                                />
                        </Link>
                    ))}
                </ul>
            </li>
        )
}


export default IngredientsGroup;