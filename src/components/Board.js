import React from "react"
import { Square } from "./Square"
import '../customStyle/Board.css'
import { AI, calculateWinner } from '../Functions/Agent'

export class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            human: '',
            ai: '',
            isAiTurn: false,
        };
    }

    // When the user click a square
    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.human
        // Set state for human pick and then let AI pick
        this.setState({
            squares: squares,
            isAiTurn: !this.state.isAiTurn,
        }, () => this.handleAIPick())
    }

    handleAIPick() {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares)) {
            return;
        }
        const aiPick = AI(squares, this.state.isAiTurn);
        console.log("det blev: " + aiPick)
        squares[aiPick] = this.state.ai;
        this.setState({
            squares: squares,
            isAiTurn: !this.state.isAiTurn,
        })
    }

    whoGoesFirst(player) {
        if (player === 'X') {
            this.state.human = 'X';
            this.state.ai = 'O'
            // X always start
            this.state.isAiTurn = false;
        } else {
            this.state.human = 'O';
            this.state.ai = 'X'
            // X always start
            this.state.isAiTurn = true;
        }
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
            status = 'Next player: ' + (this.state.isAiTurn ? this.state.ai : this.state.human)
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
