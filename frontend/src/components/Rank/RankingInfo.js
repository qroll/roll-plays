import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { GuestOrUserSession } from "src/components/Session";
import Icon from "src/components/Icon";

import { callApi } from "src/utils/callApi";

const RankingName = styled.h1`
    font-family: "Roboto Condensed";
    font-size: 1.2em;
    font-weight: normal;
    margin: 0 0 5px 0;
    text-transform: uppercase;
`;

const RankingDescription = styled.p`
    font-size: 0.8em;
    font-style: oblique;
    margin: 5px 0;
`;

const EditableRankingName = styled(RankingName.withComponent("input"))`
    border: none;
    display: block;
    outline: none;
`;
const EditableRankingDescription = styled(
    RankingDescription.withComponent("input")
)`
    border: none;
    display: block;
    outline: none;
`;

class EditableRankingInfo extends React.Component {
    state = {
        isEditing: false,
        name: this.props.name,
        description: this.props.description
    };

    handleOnToggle = () => {
        if (this.state.isEditing) {
            let { name, description } = this.state;
            callApi("/rank", "put", { name, description });
        }
        this.setState({ isEditing: !this.state.isEditing });
    };

    render() {
        return (
            <div>
                {this.state.isEditing ? (
                    <div>
                        <EditableRankingName
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleInputChange}
                            readOnly={this.state.submitting}
                        />
                        <EditableRankingDescription
                            type="text"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleInputChange}
                            readOnly={this.state.submitting}
                        />
                    </div>
                ) : (
                    <SimpleRankingInfo {...this.props} />
                )}
                <Icon
                    name="icon-dots-horizontal"
                    onClick={this.handleOnToggle}
                />
            </div>
        );
    }
}

class SimpleRankingInfo extends React.Component {
    render() {
        let { name, description } = this.props;
        return (
            <div>
                <RankingName>{name}</RankingName>
                <RankingDescription>{description}</RankingDescription>
            </div>
        );
    }
}

class RankingInfo extends React.Component {
    render() {
        return (
            <GuestOrUserSession
                userComponent={<EditableRankingInfo {...this.props} />}
                guestComponent={<SimpleRankingInfo {...this.props} />}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

export const RankingInfoContainer = connect(mapStateToProps)(RankingInfo);

export default RankingInfoContainer;
