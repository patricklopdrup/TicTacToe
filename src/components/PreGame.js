import React from "react"
import { Game } from './Game'

export class PreGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            human: '',
            ai: '',
            isAiTurn: false,
            showComponent: false
        };
    }

    render() {
        return (
            <div>
                <p>I play as:</p>
                <button onClick={() => this.whoGoesFirst('X')}>X</button>
                <button onClick={() => this.whoGoesFirst('O')}>O</button>
                {this.state.showComponent ?
                    <Game
                        human={this.state.human}
                        ai={this.state.ai}
                        isAiTurn={this.state.isAiTurn}
                    /> :
                    null
                }
            </div>
        )
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
        this.setState({
            showComponent: true
        });
    }
}