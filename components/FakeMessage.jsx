import React from "react"
import { getModule, getModuleByPrototypes } from "@vizality/webpack"
const ChannelMessage = getModule(m => m?.type?.displayName === "ChannelMessage").type
const getCurrentUser = getModule("getCurrentUser")
const Channel = getModuleByPrototypes(["isGroupDM"])
const Message = getModuleByPrototypes(["addReaction"])
const SpoofChannel = new Channel({channel_id: "-7",name: "Better Media Player"})
const Timestamp = getModule("isMoment")
const SpoofMessage = new Message({
    author: getCurrentUser.getCurrentUser(),
    timestamp: Timestamp(),
    channel_id: "-7",
    attachments: [
        {
            content_type: "video/mp4",
            size: Math.random().toString().slice(2, 9),
            filename: "Not a rick roll.mp4",
            id: "873334284814020648",
            proxy_url: "https://media.discordapp.net/attachments/800235887149187096/873334284814020648/video0.mov",
            url: "https://cdn.discordapp.com/attachments/800235887149187096/873334284814020648/video0.mov",
            height: 225,
            width: 400
        }
    ]
})
class FakeMessage extends React.PureComponent {
	constructor(props) {
		super(props)
        this.state = { active: false }
	}
	render() {
		return (
            <ChannelMessage channel={SpoofChannel} message={SpoofMessage}></ChannelMessage>
		)
	}
}
export { FakeMessage }