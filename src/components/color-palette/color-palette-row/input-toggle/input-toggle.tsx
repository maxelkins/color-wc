import { Element, Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'input-toggle',
  styleUrl: 'input-toggle.css',
  shadow: false,
})
export class InputToggle {
  @Element() hostElement: HTMLElement;
  @Prop() toggleId: string;
  @Prop() toggleLabel: string;
  @Prop() on: boolean;
  @Prop() checked: boolean;

  render() {
    return (
      <label class="toggle" htmlFor={this.toggleId}>
        <input
          checked={this.on || this.checked ? true : false}
          class="toggle-checkbox"
          type="checkbox"
          name={this.toggleId}
          id={this.toggleId}
        />
        <span class="toggle-display" hidden>
          <svg
            aria-hidden="true"
            focusable="false"
            class="toggle-icon toggle-icon--checkmark"
            width="18"
            height="14"
            viewBox="0 0 18 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.08471 10.6237L2.29164 6.83059L1 8.11313L6.08471 13.1978L17 2.28255L15.7175 1L6.08471 10.6237Z"
              fill="currentcolor"
              stroke="currentcolor"
            />
          </svg>
          <svg
            aria-hidden="true"
            focusable="false"
            class="toggle-icon toggle-icon--cross"
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.167 0L6.5 4.667L1.833 0L0 1.833L4.667 6.5L0 11.167L1.833 13L6.5 8.333L11.167 13L13 11.167L8.333 6.5L13 1.833L11.167 0Z"
              fill="currentcolor"
            />
          </svg>
        </span>
        {this.toggleLabel}
      </label>
    );
  }
}
