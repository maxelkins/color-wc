import { Element, Component, Prop, h } from '@stencil/core';
import { StringHSLToHex, getLuminance, getContrastRatio, wcagLevel } from '../../utils/utils';

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

  // Get the value of the custom property used for the background color
  private customPropertyValue(color: string): string {
    const hostStyle = getComputedStyle(this.hostElement);
    return hostStyle.getPropertyValue(color).trim();
  }

  // Create backgroundColor custom property
  private colorCusProp(color: string): string {
    return 'var(' + color + ')';
  }

  render() {
    return this.colorsArray.map(color => {
      const customPropValue = this.customPropertyValue(color);
      const HSLToHex = StringHSLToHex(customPropValue);
      const colorLuminance = getLuminance(HSLToHex);
      const whiteLuminance = 1;
      const blackLuminance = 0;
      const contrastAgainstWhite = (Math.floor(getContrastRatio(colorLuminance, whiteLuminance) * 100) / 100).toFixed(2);
      const contrastAgainstBlack = (Math.floor(getContrastRatio(colorLuminance, blackLuminance) * 100) / 100).toFixed(2);
      const textColor = contrastAgainstBlack > contrastAgainstWhite ? 'black' : 'white';

      return (
        <div class="colorPaletteRow" style={{ backgroundColor: this.colorCusProp(color) }}>
          <div class="details">
            <span style={{ color: textColor }}>{customPropValue}</span>
          </div>
          <div class="a11y">
            <span class={`a11y-black ${wcagLevel(contrastAgainstBlack) === 'Fail' ? 'a11y-fail' : 'a11y-pass'}`}>
              {wcagLevel(contrastAgainstBlack)} {contrastAgainstBlack}
            </span>
            <span class={`a11y-white ${wcagLevel(contrastAgainstWhite) === 'Fail' ? 'a11y-fail' : 'a11y-pass'}`}>
              {wcagLevel(contrastAgainstWhite)} {contrastAgainstWhite}
            </span>
          </div>
        </div>
      );
    });
  }
}
