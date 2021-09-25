import React from "react"
import { SwitchItem, Category, SliderInput } from "@vizality/components/settings"
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
                <Category title="Loop" description="Loop configuration">
                    <SwitchItem 
                        value={getSetting("button_loop", true)} 
                        description="Loop videos in a simple click" 
                        onChange={() => {
                            toggleSetting("button_loop")
                            this.setState({loop: getSetting("button_loop", true)})
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
                        description="Automatically loop videos, Needs the loop button" 
                        onChange={() => toggleSetting("auto_loop")}
                    >Auto loop</SwitchItem>
                </Category>
                <Category title="Picture in picture" description="Picture in picture configuration">
                    <SwitchItem 
                        value={getSetting("button_pip", true)} 
                        description="Picture In Picture in a simple click" 
                        onChange={() => {
                            toggleSetting("button_pip")
                            this.setState({loop: getSetting("button_pip", true)})
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
                </Category>
            </>
		)
	}
}