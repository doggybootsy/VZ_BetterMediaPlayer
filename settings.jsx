import React from "react"
import { SwitchItem, Category, SliderInput } from "@vizality/components/settings"

class Group extends React.Component {
    constructor(props) {
        super(props)
        this.state = { toggled: false }
    }
    render() {
        return (
            <Category 
                name={this.props.name} 
                description={this.props.description} 
                opened={this.state.toggled} 
            >{this.props.children}</Category>
        )
    } 
}
module.exports = class Settings extends React.PureComponent {
	constructor(props) {
		super(props)
        this.state = { 
            loop: this.props.getSetting("button_loop", true),
            pip: this.props.getSetting("button_pip", true)
        }
	}
	render() {
		const { getSetting, updateSetting, toggleSetting } = this.props
		return (
            <>
                <Group name="Loop" description="Loop configuration">
                    <SwitchItem 
                        value={getSetting("button_loop", true)} 
                        description="Loop videos in a simple click" 
                        onChange={() => {
                            this.setState({loop: !this.state.loop})
                            toggleSetting("button_loop")
                        }}
                    >Loop button</SwitchItem>
                    <SliderInput
                        stickToMarkers
                        minValue={ 0 }
                        maxValue={ 6 }
                        initialValue={ getSetting("position_loop", 1) }
                        markers={[0,1,2,3,4,5]}
                        defaultValue={ getSetting("position_loop", 1) }
                        onValueChange={ v => updateSetting("position_loop", v) }
                        disabled={!this.state.loop}
                        note="Move the loop button to different spots"
                    >Position for the loop button</SliderInput>
                    <SwitchItem 
                        value={getSetting("auto_loop", false)} 
                        description="Automatically loop videos" 
                        onChange={() => toggleSetting("auto_loop")}
                    >Auto loop</SwitchItem>
                </Group>
                <Group name="Picture in picture" description="Picture in picture configuration">
                    <SwitchItem 
                        value={getSetting("button_pip", true)} 
                        description="Picture In Picture in a simple click" 
                        onChange={() => {
                            this.setState({pip: !this.state.pip})
                            toggleSetting("button_pip")
                        }}
                    >PIP button</SwitchItem>
                    <SliderInput
                        stickToMarkers
                        minValue={ 0 }
                        maxValue={ 6 }
                        initialValue={ getSetting("position_pip", 1) }
                        markers={[0,1,2,3,4,5]}
                        defaultValue={ getSetting("position_pip", 1) }
                        onValueChange={ v => updateSetting("position_pip", v) }
                        disabled={!this.state.pip}
                        note="Move the loop button to different spots"
                    >Position for the PIP button</SliderInput>
                </Group>
            </>
		)
	}
}