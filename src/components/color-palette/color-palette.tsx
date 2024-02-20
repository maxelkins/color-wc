import { Element, Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'color-palette',
  styleUrl: 'color-palette.css',
  shadow: true,
})
export class ColorPalette {
  @Element() hostElement: HTMLElement;
  @Prop() colors: string;
  @Prop() title: string;
  colorsArray: string[];

  // Split colors prop string into an array of colors
  componentWillLoad() {
    this.colorsArray = this.colors.split(',').map(color => color.trim());
  }

  render() {
    return (
      <Host>
        {this.title ? <div class="title">{this.title}</div> : ''}
        {this.colorsArray.map(color => (
          <color-palette-row color={color}></color-palette-row>
        ))}
      </Host>
    );
  }
}
