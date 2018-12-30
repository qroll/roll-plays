import React from "react";
import styled from "styled-components";


const StyledFeedBox = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
`;

const PostButton = Button.extend`
    align-self: flex-end;
`;


    }

class FeedBox extends React.Component {
    state = {
    };

    };

    };

    render() {
        return (
            <StyledFeedBox>
                <RichEditor
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    focus={this.props.focus}
                    onChange={handleOnPostChange}
                />
            </StyledFeedBox>
        );
    }
}

export default FeedBox;
