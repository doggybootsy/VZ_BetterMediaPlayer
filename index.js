import React from "react"
import { Plugin } from "@vizality/entities"
import { patch, unpatch } from "@vizality/patcher"
import { getModule } from '@vizality/webpack'
import { PipIcon, LoopIcon } from "./Buttons"
const Contols = getModule("Controls").Controls

module.exports = class BetterMediaPlayer extends Plugin {
	constructor() {
		super()
	}
	observer() {
		const { get } = this.settings
		const callback = function() {
			if (get("auto_loop", false) === true && document.querySelector("#Loop:not(.looped)")) {
				for (const ele of document.querySelectorAll("#Loop:not(.looped)")) {
					ele.classList.add("looped")
					ele.parentElement.previousSibling.loop = true
				}
			}
		}
		this._observer = new MutationObserver(callback)
		this._observer.observe(document.getElementById('app-mount'), { attributes: true, childList: true, subtree: true })
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
		this.observer()
		unpatch("BetterMediaPlayer")
		patch("BetterMediaPlayer", Contols.prototype, "render", (_, res) => {
			if(get("button_pip", true) === true) res.props.children.splice(get("position_pip", 1), 0, React.createElement(PipIcon, {instance: this}))
			if(get("button_loop", true) === true) res.props.children.splice(get("position_loop", 1), 0, React.createElement(LoopIcon, {instance: this, active: get("auto_loop", false)}))
			return res
		})
	}
	stop() {
		this._observer.disconnect()
	}
}