import React from "react"
import { SwitchItem, Category, SliderInput } from "@vizality/components/settings"
import { FakeMessage } from "./FakeMessage"
import { Icon } from "@vizality/components"
module.exports = class Settings extends React.PureComponent {
	constructor(props) {
		super(props)
        this.state = {
            cat_demo: false,
            cat_loop: false,
            cat_pip: false,
            loop: this.props.getSetting("button_loop", true),
            pip: this.props.getSetting("button_pip", true)
        }
	}
    Cat_onClick(ele, state) {
        for (const key in ele.nativeEvent.path)
            if (Object.hasOwnProperty.call(ele.nativeEvent.path, key))
                if (ele.nativeEvent.path[key].classList == "vz-settings-category-title-wrapper") 
                    this.setState({[state]: !this.state[state]})
    }
	render() {
		const { getSetting, updateSetting, toggleSetting } = this.props
		return (
            <>
                <Category opened={true} onClick={(e) => this.Cat_onClick(e, "cat_demo")} title="Demo" description="little preview" icon={
                    <Icon name={this.state.cat_demo === true ? "Eye" : "EyeHidden"} width="2rem" height="2rem" style={{padding: ".25rem"}}/>
                }><FakeMessage demo_url_num={Math.floor(Math.random() * 7 + 1)} /></Category>
                <Category onClick={(e) => this.Cat_onClick(e, "cat_loop")} title="Loop" description="Loop configuration" icon={
			        <svg width="1.75rem" height="1.75rem" style={{padding: ".5rem"}} viewBox="-5 0 459 459.648" xmlns="http://www.w3.org/2000/svg">
				        <path style={{transition: "fill 0.2s"}} fill={this.state.cat_loop === true ? "var(--brand-experiment)" : "currentColor"} d="m416.324219 293.824219c0 26.507812-21.492188 48-48 48h-313.375l63.199219-63.199219-22.625-22.625-90.511719 90.511719c-6.246094 6.25-6.246094 16.375 0 22.625l90.511719 90.511719 22.625-22.625-63.199219-63.199219h313.375c44.160156-.054688 79.945312-35.839844 80-80v-64h-32zm0 0"></path>
				        <path style={{transition: "fill 0.2s"}} fill={this.state.cat_loop === true ? "var(--brand-experiment)" : "currentColor"} d="m32.324219 165.824219c0-26.511719 21.488281-48 48-48h313.375l-63.199219 63.199219 22.625 22.625 90.511719-90.511719c6.246093-6.25 6.246093-16.375 0-22.625l-90.511719-90.511719-22.625 22.625 63.199219 63.199219h-313.375c-44.160157.050781-79.949219 35.839843-80 80v64h32zm0 0"></path>
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
                <Category onClick={(e) => this.Cat_onClick(e, "cat_pip")} title="Picture in picture" description="Picture in picture configuration" icon={
			        <svg width="1.75rem" height="2rem" style={{padding: ".5rem"}} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			        	<path style={{transition: "fill 0.2s"}} fill="transparent" d="M0 0h24v24H0V0z"></path>
			        	<path style={{transition: "fill 0.2s"}} fill={this.state.cat_pip === true ? "var(--brand-experiment)" : "currentColor"} d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z"></path>
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
