import React from "react"
import { getModule, getModuleByDisplayName } from "@vizality/webpack"
const {ModalContent, ModalFooter, ModalHeader} = getModule("ModalRoot"),
    Buttons = getModule("ButtonLooks"),
    FormTitle = getModuleByDisplayName("FormTitle"),
    Messages = getModule("Messages").Messages,
	Markdown = getModuleByDisplayName("Markdown")
export class Alert extends React.PureComponent {
	constructor(props) {
		super(props)
	}
	render() {
        const message = `\`\`\`js\n${this.props.error}\n\`\`\``
		return (
            <>
                <ModalHeader separator={false}>
                    <FormTitle tag="h4">Error</FormTitle>
                </ModalHeader>
                <ModalContent>
                    <Markdown>{message}</Markdown>
                </ModalContent>
                <ModalFooter>
                    <Buttons.default onClick={this.props.onClose}>{Messages.DONE}</Buttons.default>
                </ModalFooter>
            </>
		)
	}
}