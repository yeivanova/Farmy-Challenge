import React, { useState, useMemo } from "react";
import { useDrop } from "react-dnd";
import { SaladIngredient } from "@/components";
import { useSelector, useDispatch } from "react-redux";
import {
    addItem,
    deleteItem,
    sortItems,
    clearOrder,
    setSaladName,
    setSaladSize,
} from "../../slices/composeOrderSlice";
import axios from "axios";
import styles from "./SaladMaker.module.scss";

const SaladMaker = () => {
    const businessLogic = useSelector(
        (store) => store.initialData.businessLogic
    );
    const margin = businessLogic.margin;
    const sizes = businessLogic.saladTypes;
    const order = useSelector((store) => store.order);
    const saladItems = Object.values(order.ingredients);
    const ingredients = useSelector((store) => store.initialData.ingredients);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const totalCost = useMemo(() => {
        return Number(saladItems
            .reduce(
                (sum, val) =>
                    sum +
                    val.numOfServings *
                        ingredients.find((el) => el.id === val.id)
                            .costPerServing,
                0
            )
            .toFixed(2));
    }, [order]);

    const totalWeight = useMemo(() => {
        return Number(saladItems.reduce(
            (sum, val) =>
                sum +
                val.numOfServings *
                    ingredients.find((el) => el.id === val.id).weightPerServing,
            0
        ));
    }, [order]);

    const moveItem = (item) => {
        dispatch(addItem(item.id));
    };

    const removeItem = (id) => {
        dispatch(deleteItem(id));
    };

    const [{ isHover }, dropTarget] = useDrop({
        accept: "items",
        collect: (monitor) => ({
            isHover: monitor.isOver(),
        }),
        drop(item) {
            moveItem(item);
        },
    });

    const resetOrder = () => {
        setError();
        dispatch(clearOrder());
    };

    const makeOrder = (event) => {
        event.preventDefault();

        if (order.name.length === 0) {
            setError("Please enter the name");
            return false;
        }

        if (order.ingredients.length === 0) {
            setError("Please add the ingredients");
            return false;
        }

        setIsLoading(true);

        axios
            .post("api/salads", {
                ...order,
                cost: +totalCost,
                price: Number((+totalCost + margin).toFixed(2)),
            })
            .then((response) => {
                console.log(response.statusText);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
                resetOrder();
                alert("The salad has been sent.");
            });
    };

    const moveSaladItem = (dragIndex, hoverIndex) => {
        const changedCartItems = saladItems.slice();
        changedCartItems.splice(dragIndex, 1);
        changedCartItems.splice(hoverIndex, 0, saladItems[dragIndex]);
        dispatch(sortItems(changedCartItems));
    };

    return (
        <section className={styles.main}>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <form className={styles.form} onSubmit={makeOrder}>
                    <div className={styles.form_row}>
                        <input
                            className={`${styles.field} ${styles.input}`}
                            placeholder="Salad name"
                            type="text"
                            name="saladName"
                            value={order.name || ""}
                            required
                            onChange={(e) =>
                                dispatch(setSaladName(e.target.value))
                            }
                        />
                        <select
                            className={styles.field}
                            value={order.size}
                            onChange={(e) =>
                                dispatch(setSaladSize(e.target.value))
                            }
                        >
                            {Object.keys(sizes).map((size, index) => {
                                return (
                                    <option value={size} key={index}>
                                        {size}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className={styles.target_details}>
                        Target cost/weight: {sizes[order.size].targetCost}€/
                        {sizes[order.size].targetWeight}g
                    </div>
                    <div
                        className={`${styles.total_details} ${styles.form_row}`}
                    >
                        <span>Total cost: {totalCost}€</span>
                        <span>Total weight: {totalWeight}g</span>
                    </div>
                    <div className={styles.composer_wrapper}>
                        {order.ingredients.length === 0 && (
                            <p className={styles.tip_text}>
                                Drag the ingredients here
                            </p>
                        )}
                        <ul
                            id="composer"
                            className={`${styles.composer} ${styles.list} ${
                                isHover ? styles.on_hover : ""
                            }`}
                            ref={dropTarget}
                        >
                            {order.ingredients.map((item, index) => (
                                <SaladIngredient
                                    item={item}
                                    key={index}
                                    index={index}
                                    moveSaladItem={moveSaladItem}
                                    removeItem={() => removeItem(item.id)}
                                />
                            ))}
                        </ul>
                    </div>
                    <div className={styles.form_row}>
                        <button
                            className={`${styles.button} ${styles.button_default}`}
                            type="reset"
                            onClick={resetOrder}
                        >
                            Cancel
                        </button>
                        <button
                            className={`${styles.button} ${styles.button_primary}`}
                            type="submit"
                            disabled={order.ingredients.length === 0 && true}
                        >
                            Save
                        </button>
                    </div>
                    <p className={styles.error}>{error}</p>
                </form>
            )}
        </section>
    );
};

export default SaladMaker;
