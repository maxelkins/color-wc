import { Element, Component, Prop, h } from '@stencil/core';
import { StringHSLToHex, getLuminance, getContrastRatio, wcagLevel } from '../../utils/utils';

@Component({
  tag: 'color-palette-row',
  styleUrl: 'color-palette-row.css',
  shadow: true,
})
export class ColorPaletteRow {
  @Element() hostElement: HTMLElement;
  @Prop() color: string;

  render() {
    const colorElements = color => {
      const customPropValue = getComputedStyle(this.hostElement).getPropertyValue(color).trim();
      const HSLToHex = StringHSLToHex(customPropValue);
      const colorLuminance = getLuminance(HSLToHex);
      const whiteLuminance = 1;
      const blackLuminance = 0;
      const contrastAgainstWhite = getContrastRatio(colorLuminance, whiteLuminance).toFixed(2);
      const contrastAgainstBlack = getContrastRatio(colorLuminance, blackLuminance).toFixed(2);
      const textColor = contrastAgainstBlack > contrastAgainstWhite ? 'black' : 'white';
      const wcagBlack = wcagLevel(contrastAgainstBlack);
      const wcagWhite = wcagLevel(contrastAgainstWhite);

      return (
        <div class="color-palette-row" style={{ backgroundColor: `var(${color})` }}>
          <div class="details">
            <span style={{ color: textColor }}>{color}</span>
            <span style={{ color: textColor }}>{customPropValue}</span>
          </div>
          <div class="a11y">
            <span class={`a11y-black ${wcagBlack === 'Fail' ? 'a11y-fail' : 'a11y-pass'}`}>
              {wcagBlack} {contrastAgainstBlack}
            </span>
            <span class={`a11y-white ${wcagWhite === 'Fail' ? 'a11y-fail' : 'a11y-pass'}`}>
              {wcagWhite} {contrastAgainstWhite}
            </span>
          </div>
        </div>
      );
    };

    return colorElements(this.color);
  }
}
