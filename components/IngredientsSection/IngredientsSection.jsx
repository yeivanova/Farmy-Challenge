import React, { useState, useEffect } from "react";
import { Ingredient } from "@/components";
import { useSelector } from "react-redux";
import styles from "./IngredientsSection.module.scss";

const IngredientsSection = () => {
    const ingredients = useSelector((store) => store.initialData.ingredients);
    const order = useSelector((store) => store.order);
    const [items, setItems] = useState([...ingredients]);

    useEffect(() => {
        // prevent adding ingredients twice
        const orderIngredientsIds = [...order.ingredients].map(
            (element) => element.id
        );
        const newItems = [...ingredients].filter(
            (item) => !orderIngredientsIds.includes(item.id)
        );
        setItems(newItems);
    }, [order]);

    return (
        <section className={styles.ingredients}>
            <ul className={styles.inner}>
                {items.map((item, index) => (
                    <Ingredient item={item} key={index} />
                ))}
            </ul>
        </section>
    );
};

export default IngredientsSection;
