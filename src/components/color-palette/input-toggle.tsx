import { Element, Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'input-toggle',
  styleUrl: 'input-toggle.css',
  shadow: true,
})
export class InputToggle {
  @Element() hostElement: HTMLElement;
  @Prop() id: string;
  @Prop() label: string;

  render() {
    return (
      <Host>
        <input id={this.id} type="checkbox"></input>
        <label htmlFor={this.id}>
          <div class="toggle__label-text">{this.label}</div>
          <div class="toggle__switch" data-checked="Yes" data-unchecked="No"></div>
        </label>
      </Host>
    );
  }
}
