import React from "react";
import styles from "./Ingredient.module.scss";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";

const Ingredient = ({ item }) => {
    const [{ isDrag }, ref] = useDrag({
        type: "items",
        item: item,
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    });

    return (
        !isDrag && (
            <li
                className={styles.ingredient}
                id={item.id}
                key={item.id}
                ref={ref}
            >
                <div className={styles.name}>{item.name}</div>
                <div className={styles.details}>
                    <div>{item.weightPerServing}g</div>
                    <div>{item.costPerServing}€</div>
                </div>
            </li>
        )
    );
};

export default Ingredient;

Ingredient.propTypes = {
    item: PropTypes.exact({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        costPerServing: PropTypes.number.isRequired,
        weightPerServing: PropTypes.number.isRequired,
        supplierId: PropTypes.number.isRequired,
        hoursFresh: PropTypes.number.isRequired,
    }).isRequired,
};
