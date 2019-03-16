import React from "react";

import { retrieveGames, editGames } from "src/actions/game";

import { GameLibrary } from "./GameLibrary";
import { GameStatusGraph } from "./GameStatusGraph";
import { Toolbar } from "./Toolbar";

class GameList extends React.Component {
    state = {
        isLoaded: false,
        games: [],
        form: null
    };

    componentDidMount() {
        retrieveGames().then(games => {
            this.setState({ games: games, isLoaded: true });
        });
    }

    onEdit = () => {
        this.setState(prevState => ({
            massEditMode: true,
            form: prevState.games.reduce((normalized, game) => {
                normalized[game.id] = { ...game, isDeleted: false };
                return normalized;
            }, {})
        }));
    };

    onSave = () => {
        let changedGames = this.state.games.filter(origGame => {
            let formGame = this.state.form[origGame.id];
            return (
                origGame.inLibrary !== formGame.inLibrary ||
                origGame.status !== formGame.status ||
                formGame.isDeleted === true
            );
        });

        editGames({ games: changedGames })
            .then(res => {
                this.setState({
                    massEditMode: false
                });
            })
            .catch(err => {});
    };

    onCancel = () => {
        this.setState({ massEditMode: false });
    };

    onChange = gameId => (name, value) => {
        this.setState(prevState => {
            let game = prevState.form[gameId];
            return {
                form: {
                    ...prevState.form,
                    [gameId]: { ...game, [name]: value }
                }
            };
        });
    };

    render() {
        let { games, isLoaded, massEditMode, form } = this.state;

        if (!isLoaded) {
            return null;
        }

        return (
            <React.Fragment>
                <Toolbar
                    massEditMode={massEditMode}
                    onEdit={this.onEdit}
                    onSave={this.onSave}
                    onCancel={this.onCancel}
                />
                <GameStatusGraph games={games} />
                <GameLibrary
                    form={form}
                    games={games}
                    onEdit={this.onEdit}
                    massEditMode={massEditMode}
                    onChange={this.onChange}
                />
            </React.Fragment>
        );
    }
}

export default GameList;
