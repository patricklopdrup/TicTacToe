import React from "react";
import '../customStyle/Square.css'

export function Square(props) {
    return (
        <button className="square" onClick={() => props.onClick()}>
            {props.value}
        </button>
    )
}