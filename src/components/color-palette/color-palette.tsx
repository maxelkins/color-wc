import { Element, Component, Prop, Host, h } from '@stencil/core';
// import { StringHSLToHex, getLuminance, getContrastRatio, wcagLevel } from '../../utils/utils';
// import { ColorPaletteRow } from '../../components/color-palette/color-palette-row';

@Component({
  tag: 'color-palette',
  styleUrl: 'color-palette.css',
  shadow: true,
})
export class ColorPalette {
  @Element() hostElement: HTMLElement;
  @Prop() colors: string;
  colorsArray: string[];

  // Split colors prop string into an array of colors
  componentWillLoad() {
    this.colorsArray = this.colors.split(',').map(color => color.trim());
  }

  render() {
    return (
      <Host>
        <div class="color-palette-title">Hello</div>
        {this.colorsArray.map(color => (
          <color-palette-row color={color}></color-palette-row>
        ))}
      </Host>
    );
  }
}
