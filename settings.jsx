import React from "react"
import { SwitchItem, Category, SliderInput } from "@vizality/components/settings"
import { FakeMessage } from "./FakeMessage";
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
                <Category opened title="Demo" description="little preview" icon={
                    <svg viewBox="0 0 30 30" width="2rem" height="2rem" style={{padding: ".25rem"}}>
                        <path fill="currentColor" d="M 6 4 C 4.895 4 4 4.895 4 6 L 4 24 C 4 25.105 4.895 26 6 26 L 24 26 C 25.105 26 26 25.105 26 24 L 26 6 C 26 4.895 25.105 4 24 4 L 6 4 z M 15 9 C 20.016 9 22.816406 14.455078 22.816406 14.455078 C 22.923406 14.614078 23 14.794 23 15 C 23 15.207 22.921453 15.387875 22.814453 15.546875 C 22.814453 15.546875 20.024 21 15 21 C 9.976 21 7.1835938 15.544922 7.1835938 15.544922 C 7.0775938 15.386922 7 15.206 7 15 C 7 14.795 7.0766406 14.615031 7.1816406 14.457031 C 7.1816406 14.457031 9.984 9 15 9 z M 15 11 C 12.791 11 11 12.791 11 15 C 11 17.209 12.791 19 15 19 C 17.209 19 19 17.209 19 15 C 19 12.791 17.209 11 15 11 z M 15 13 C 16.105 13 17 13.895 17 15 C 17 16.104 16.105 17 15 17 C 13.896 17 13 16.104 13 15 C 13 13.895 13.896 13 15 13 z"></path>
                    </svg>
                }><FakeMessage /></Category>
                <Category title="Loop" description="Loop configuration" icon={
			        <svg width="1.75rem" height="1.75rem" style={{padding: ".5rem"}} viewBox="-5 0 459 459.648" xmlns="http://www.w3.org/2000/svg">
				        <path fill={this.state.loop === true ? "var(--brand-experiment)" : "currentColor"} d="m416.324219 293.824219c0 26.507812-21.492188 48-48 48h-313.375l63.199219-63.199219-22.625-22.625-90.511719 90.511719c-6.246094 6.25-6.246094 16.375 0 22.625l90.511719 90.511719 22.625-22.625-63.199219-63.199219h313.375c44.160156-.054688 79.945312-35.839844 80-80v-64h-32zm0 0"></path>
				        <path fill={this.state.loop === true ? "var(--brand-experiment)" : "currentColor"} d="m32.324219 165.824219c0-26.511719 21.488281-48 48-48h313.375l-63.199219 63.199219 22.625 22.625 90.511719-90.511719c6.246093-6.25 6.246093-16.375 0-22.625l-90.511719-90.511719-22.625 22.625 63.199219 63.199219h-313.375c-44.160157.050781-79.949219 35.839843-80 80v64h32zm0 0"></path>
			        </svg>
                }>
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
                        value={getSetting("auto_loop", true)} 
                        description="Automatically loop videos" 
                        onChange={() => toggleSetting("auto_loop")}
                    >Auto loop</SwitchItem>
                </Category>
                <Category title="Picture in picture" description="Picture in picture configuration" icon={
			        <svg width="1.75rem" height="2rem" style={{padding: ".5rem"}} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			        	<path fill="transparent" d="M0 0h24v24H0V0z"></path>
			        	<path fill={this.state.pip === true ? "var(--brand-experiment)" : "currentColor"} d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z"></path>
			        </svg>
                }>
                    <SwitchItem 
                        value={getSetting("button_pip", true)} 
                        description="Picture In Picture in a simple click" 
                        onChange={() => {
                            toggleSetting("button_pip")
                            this.setState({pip: getSetting("button_pip", true)})
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