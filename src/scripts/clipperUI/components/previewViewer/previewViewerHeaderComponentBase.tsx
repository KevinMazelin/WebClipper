import {ComponentBase} from "../../componentBase";

/**
 * Shared class names used by header elements for consistent styling.
 */
export module HeaderClasses {
	export module Button {
		export let active = " active";
		export let controlButton = " control-button";
		export let relatedButtons = " related-buttons";
		export let activeControlButton = active + controlButton;
	}
}

export interface ControlGroup {
	id?: string;
	className?: string;
	role?: string;
	isAriaSet?: boolean;
	innerElements: any[];
}

/**
 * Represents a preview header that can contain multiple control button groups, i.e., groups
 * of buttons or similar header entities. Child classes need to simply declare each control's
 * buttons.
 */
export abstract class PreviewViewerHeaderComponentBase<T, P> extends ComponentBase<T, P> {
	/**
	 * Gets the list of control groups to be rendered.
	 */
	abstract getControlGroups(): ControlGroup[];

	render() {
		let controlButtonGroup = "control-button-group";

		let renderables = [];
		let buttonGroups = this.getControlGroups();

		for (let i = 0; i < buttonGroups.length; i++) {
			let id = buttonGroups[i].id;
			let className = buttonGroups[i].className;
			let role = buttonGroups[i].role;
			let isAriaSet = buttonGroups[i].isAriaSet;
			if (isAriaSet) {
				let setsize = buttonGroups[i].innerElements.length;
				for (let j = 0; j < setsize; j++) {
					buttonGroups[i].innerElements[j].attrs["aria-posinset"] = j + 1;
					buttonGroups[i].innerElements[j].attrs["aria-setsize"] = setsize;
				}

			}
			renderables.push(
				<div id={id ? id : ""} className={className ? className : controlButtonGroup} role={role ? role : ""}>
					{buttonGroups[i].innerElements}
				</div >);
		}

		return (
			<div>
				{renderables}
			</div>
		);
	}
}
