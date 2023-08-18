import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNumOfServings } from "../../slices/composeOrderSlice";
import { useDrag, useDrop } from "react-dnd";
import styles from "./SaladIngredient.module.scss";
import RemoveIcon from "../../images/remove-icon.svg";
import PlusIcon from "../../images/plus-icon.svg";
import MinusIcon from "../../images/minus-icon.svg";
import DragIcon from "../../images/drag-icon.svg";
import PropTypes from "prop-types";

const SaladIngredient = ({item, index, removeItem, moveSaladItem}) => {
    const ingredients = useSelector((store) => store.initialData.ingredients);
    const currentIngredient = ingredients.find(
        (ingredient) => ingredient.id === item.id
    );
    const [number, setNumber] = useState(1);
    const ref = useRef(null);
    const dispatch = useDispatch();

    const [{ handlerId }, drop] = useDrop({
        accept: "saladItem",
        collect(monitor) {
          return {
            handlerId: monitor.getHandlerId(),
          };
        },
        hover(dropItem, monitor) {
          const item = dropItem ;
          if (!ref.current) {
            return;
          }
          const dragIndex = item.index;
          const hoverIndex = index;
          if (dragIndex === hoverIndex) {
            return;
          }
    
          const hoverBoundingRect = ref.current?.getBoundingClientRect();
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          const clientOffset = monitor.getClientOffset();
    
          const hoverClientY = clientOffset.y - hoverBoundingRect.top;
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
          }
    
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
          }
    
          moveSaladItem(dragIndex, hoverIndex);
          item.index = hoverIndex;
        },
      });
      const [{ isDragging }, drag] = useDrag({
        type: "saladItem",
        item: () => {
          return { item, index };
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      });
    
    drag(drop(ref));

    useEffect(() => {
        dispatch(
            setNumOfServings({
                id: item.id,
                numOfServings: number,
            })
        );
    }, [number, dispatch]);

    const incrementNumber = () => {
        if (number < 5) {
            setNumber((number) => number + 1);
        }
    };

    const decrementNumber = () => {
        if (number > 1) {
            setNumber((number) => number - 1);
        }
    };

    return (
        <li className={styles.ingredient} ref={ref}>
            <DragIcon />
            <div className={styles.name}>{currentIngredient.name}</div>
            <div>{currentIngredient.weightPerServing}g</div>
            <div>{currentIngredient.costPerServing}€</div>
            <div className={styles.controls}>
                <button
                    type="button"
                    className={styles.button}
                    onClick={decrementNumber}
                >
                    <MinusIcon />
                </button>
                <span className={styles.number}>{number}</span>
                <button
                    type="button"
                    className={styles.button}
                    onClick={incrementNumber}
                >
                    <PlusIcon />
                </button>
            </div>
            <button
                type="button"
                className={styles.button}
                onClick={removeItem}
            >
                <RemoveIcon />
            </button>
        </li>
    );
};

export default SaladIngredient;

SaladIngredient.propTypes = {
  item: PropTypes.exact({
    id: PropTypes.number.isRequired,
    numOfServings: PropTypes.number.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  moveSaladItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};
