import React from "react"
import { Square } from "./Square"
import '../customStyle/Board.css'
import { AI, calculateWinner } from '../Functions/Agent'

export class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            isXTurn: false, // AI play as X
        };
    }

    // When the user click a square
    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = 'O'
        // Set state for human pick and then let AI pick
        this.setState({
            squares: squares,
            isXTurn: !this.state.isXTurn,
        }, () => this.handleAIPick())
    }

    handleAIPick() {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares)) {
            return;
        }
        const aiPick = AI(squares, this.state.isXTurn);
        console.log("det blev: " + aiPick)
        squares[aiPick] = 'X';
        this.setState({
            squares: squares,
            isXTurn: !this.state.isXTurn,
        })
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        )
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.isXTurn ? 'X' : 'O')
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }

}
