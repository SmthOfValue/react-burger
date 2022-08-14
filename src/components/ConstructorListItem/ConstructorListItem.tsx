import React, {useRef, FC} from 'react';
import { useDispatch } from '../../services/store';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import ConstructorListItemStyles from './ConstructorListItem.module.css';
import { removeIngredient, moveIngredient } from '../../services/actions/burgerConstructor';
import { decreaseIngredientCount } from '../../services/actions/ingredients';

interface IConstructorListItemProps {
    name: string;
    price: number;
    image: string;
    _id: string;
    constructorId: string;
    index: number;
}

const ConstructorListItem: FC<IConstructorListItemProps> = ({name, price, image, _id, constructorId, index}) => {

    const dispatch = useDispatch();

    //обработчик нажатия на кнопку удаления ингредиента из конструктора
    const onDelete = (id: string, constructorId: string) => {        
        dispatch(decreaseIngredientCount(id));
        dispatch(removeIngredient(constructorId));
    }

    interface IDragItem {
            constructorId: string;
            index: number;        
    };

    //механизм сортировки ингредиентов
    const dndRef = useRef<HTMLLIElement>(null)
    const [, constructorDrop] = useDrop<IDragItem>({
        accept: "constructorIngredient",
        hover(item, monitor) {
            if (!dndRef.current) {
                return;
            }
            const dragIndex = item.index
            const hoverIndex = index
            // проверка на замену ингредиента самим собой
            if (dragIndex === hoverIndex) {
                return;
            }
            // прямоугольник вокруг ингредиента
            const hoverBoundingRect = dndRef.current.getBoundingClientRect()
            // берем середину по вертикали
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // определяем позицию мыши
            const clientOffset = monitor.getClientOffset()
            // берем расстояние до верха
            const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0;
            // Перемещаем ингредиент, только когда курсор пересек половину высоты другого ингредиента
            // При перетаскивании вниз перемещение происходит, только когда курсор ниже середины по вертикали
            // При перетаскивании вверх перемещение происходит, только когда курсор выше середины по вертикали
            // Условия для перетаскивания вниз
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Условия для перетаскивания вверх
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // диспатч экшена на перетаскивание ингредиента
            dispatch(moveIngredient(dragIndex, hoverIndex));
            item.index = hoverIndex
        },
    });

    const [{ isDragging }, constructorDrag] = useDrag({
        type: "constructorIngredient",
        item: () => {
            return { constructorId, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    constructorDrag(constructorDrop(dndRef));

    return (
        <li ref={dndRef} className={isDragging ? `${ConstructorListItemStyles.opaque} ${ConstructorListItemStyles.element}` : `${ConstructorListItemStyles.element}`}>
            <span className="mr-2">
                <DragIcon type="primary"></DragIcon>
            </span>
            <span className={ConstructorListItemStyles.ingredient}>
                <ConstructorElement                
                    isLocked={false}            
                    text={name}
                    price={price}
                    thumbnail={image}
                    handleClose={() => onDelete(_id, constructorId)}
                />
            </span>
        </li>
    );
}

export default ConstructorListItem;