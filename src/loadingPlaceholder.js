import React, { Component } from 'react';
import PlaceHolder from './placeholder';
import { Container, Segment } from 'semantic-ui-react';
class LoadingPlaceholder extends Component {
    render() {
        return (
            <Container fluid className="m-2">
                <Segment>
                    <PlaceHolder />
                    <PlaceHolder />
                    <PlaceHolder />
                </Segment>
            </Container>
        )
    }
}

export default LoadingPlaceholder;