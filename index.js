import React from "react"
import { Plugin } from "@vizality/entities"
import { patch } from "@vizality/patcher"
import { getModule, getModuleByDisplayName } from '@vizality/webpack'
import { PipIcon, LoopIcon } from "./Buttons"
import { Alert } from "./Alert"
const Contols = getModule("Controls").Controls
const MediaPlayer = getModuleByDisplayName("MediaPlayer")
const { ModalRoot, ModalSize } = getModule("ModalRoot")
const { openModal } = getModule("openModal")
module.exports = class BetterMediaPlayer extends Plugin {
	constructor() {super()}
	error(e) {
		openModal(props => {
			return React.createElement(ModalRoot, Object.assign({
				size: ModalSize.SMALL,
				children: React.createElement(Alert, {error: e, onClose: props.onClose})
			}, props))
		})
	}
	PIP(node) {
		try {
			if(document.pictureInPictureElement) 
				document.exitPictureInPicture()
			else 
				node.requestPictureInPicture()
			node.addEventListener("leavepictureinpicture", leavepip)
			function leavepip() {
				node.removeEventListener("leavepictureinpicture", leavepip)
			}
		} 
		catch(e){
			this.error(e)
		}
	}
	Loop(node) {
		try {
			node.loop = !node.loop
		} 
		catch (e) {
			this.error(e)
		}
	}
	start() {
		const { get } = this.settings
		patch("BetterMediaPlayer-Contols", Contols.prototype, "render", (_, res) => {
			if(get("button_pip", true) === true) 
				res.props.children.splice(get("position_pip", 1), 0, React.createElement(PipIcon, {instance: this}))
			if(get("button_loop", true) === true) 
				res.props.children.splice(get("position_loop", 1), 0, React.createElement(LoopIcon, {instance: this, active: get("auto_loop", true)}))
		})
		patch("BetterMediaPlayer-AutoLoop", MediaPlayer.prototype, "renderVideo", (_, res) => {
			if(get("auto_loop", true)) 
				res.props.loop = true
		})
	}
	stop() {}
}