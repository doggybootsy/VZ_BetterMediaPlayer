import React from "react"
import { Plugin } from "@vizality/entities"
import { patch } from "@vizality/patcher"
import { getModule, getModuleByDisplayName } from '@vizality/webpack'
import { PipIcon, LoopIcon } from "./Buttons"
const Contols = getModule("Controls").Controls
const MediaPlayer = getModuleByDisplayName("MediaPlayer")

module.exports = class BetterMediaPlayer extends Plugin {
	constructor() {
		super()
	}
	PIP(node) {
		try {
			if(document.pictureInPictureElement) document.exitPictureInPicture()
			else node.parentNode.previousSibling.requestPictureInPicture()
			node.parentNode.previousSibling.addEventListener("leavepictureinpicture", leavepip)
			const leavepip = () => node.parentNode.previousSibling.removeEventListener("leavepictureinpicture", leavepip)
		} catch(e){}
	}
	Loop(node) {
		try {
			const ele = node.parentNode.previousSibling
			ele.loop = !ele.loop
		} catch (e) {}
	}
	start() {
		const { get } = this.settings
		patch("BetterMediaPlayer-Contols", Contols.prototype, "render", (_, res) => {
			if(get("button_pip", true) === true) res.props.children.splice(get("position_pip", 1), 0, React.createElement(PipIcon, {instance: this}))
			if(get("button_loop", true) === true) res.props.children.splice(get("position_loop", 1), 0, React.createElement(LoopIcon, {instance: this, active: get("auto_loop", true)}))
		})
		patch("BetterMediaPlayer-AutoLoop", MediaPlayer.prototype, "renderVideo", (_, res) => {
			if(get("auto_loop", true)) res.props.loop = true
		})
	}
	stop() {
	}
}