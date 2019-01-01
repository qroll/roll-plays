import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Autocomplete from "react-autocomplete";

import { callApi } from "src/utils/callApi";

import { ControllerIcon } from "src/components/Icons";
import { GRAY, WHITE, ACCENT } from "src/components/styles";

import { TagContainer, Tag, TagInput } from "./Tags";

const GameBar = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
`;

const ComboBox = props => {
    let {
        handleOnKey,
        handleOnBlur,
        handleOnChange,
        handleOnSelect,
        games,
        value
    } = props;
    return (
        <Autocomplete
            getItemValue={game => game.title}
            shouldItemRender={(game, value) =>
                game.title.toLowerCase().indexOf(value.toLowerCase()) > -1
            }
            renderItem={(game, isHighlighted) => (
                <div
                    key={game._id}
                    style={{
                        backgroundColor: isHighlighted ? GRAY.LIGHTER : WHITE,
                        padding: "3px",
                        fontSize: "1em"
                    }}
                >
                    {game.title}
                </div>
            )}
            inputProps={{
                onKeyDown: handleOnKey,
                onBlur: handleOnBlur,
                placeholder: "Add a game"
            }}
            renderInput={props => {
                const { ref, ...rest } = props;
                return <TagInput {...rest} innerRef={ref} />;
            }}
            wrapperStyle={{
                flex: "1 auto",
                display: "flex"
            }}
            menuStyle={{
                borderRadius: "3px",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                background: "rgba(255, 255, 255, 0.9)",
                padding: games.length ? "2px 0" : "0",
                fontSize: "90%",
                position: "fixed",
                overflow: "auto",
                maxHeight: "50%",
                marginTop: "3px"
            }}
            items={games}
            value={value}
            onChange={handleOnChange}
            onSelect={handleOnSelect}
        />
    );
};

class GameTagInput extends React.Component {
    state = {
        input: "",
        games: {}
    };

    normalize = games => {
        return games.reduce((acc, game) => {
            acc[game._id] = game;
            return acc;
        }, {});
    };

    componentDidMount() {
        callApi("/game").then(res => {
            let games = res.data.data;
            this.setState({ games: this.normalize(games) });
        });
    }

    handleOnBlur = e => {
        this.setState({ input: "" });
    };

    handleOnChange = e => {
        this.setState({ input: e.target.value });
    };

    handleOnSelect = (value, item) => {
        this.setState({ input: "" });

        if (!this.props.selectedGames.includes(item._id)) {
            let games = this.props.selectedGames.concat(item._id);
            this.props.onGameChange(games);
        }
    };

    handleOnKey = e => {
        let key = e.key;
        let input = this.state.input;
        if (key === "Backspace" && !input) {
            let games = this.props.selectedGames.slice(0, -1);
            this.props.onGameChange(games);
        }
    };

    render() {
        let { input, games } = this.state;
        let { selectedGames } = this.props;
        let displayLabel = input;

        return (
            <GameBar>
                <ControllerIcon
                    style={{ alignSelf: "flex-start", paddingRight: "10px" }}
                />
                <TagContainer style={{ flex: "1 auto" }}>
                    {selectedGames.map(game => {
                        return (
                            <Tag color={ACCENT.PRIMARY} key={game}>
                                {games[game].title}
                            </Tag>
                        );
                    })}
                    <ComboBox
                        handleOnKey={this.handleOnKey}
                        handleOnBlur={this.handleOnBlur}
                        handleOnChange={this.handleOnChange}
                        handleOnSelect={this.handleOnSelect}
                        games={Object.values(games)}
                        value={displayLabel}
                    />
                </TagContainer>
            </GameBar>
        );
    }
}

GameTagInput.propTypes = {
    items: PropTypes.array,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string
};

export default GameTagInput;
