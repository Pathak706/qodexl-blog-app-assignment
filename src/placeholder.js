import React from 'react'
import { Placeholder } from 'semantic-ui-react'

const PlaceholderExampleLineLength = () => (
    <Placeholder fluid>
        <Placeholder.Header>
            <Placeholder.Line />
            <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
        </Placeholder.Paragraph>
    </Placeholder>
)

export default PlaceholderExampleLineLength