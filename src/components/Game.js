import React from "react"
import { Board } from "./Board"
import '../customStyle/Game.css'

export class Game extends React.Component {

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        human={this.props.human}
                        ai={this.props.ai}
                        isAiTurn={this.props.isAiTurn}
                    />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* todo */}</ol>
                </div>
            </div>
        )
    }
}