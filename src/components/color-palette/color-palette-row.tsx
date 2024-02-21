import { Element, Component, Prop, h } from '@stencil/core';
import { StringHSLToHex, getLuminance, getContrastRatio, wcagLevel } from '../../utils/utils';

@Component({
  tag: 'color-palette-row',
  styleUrl: 'color-palette-row.css',
  shadow: false,
})
export class ColorPaletteRow {
  @Element() hostElement: HTMLElement;
  @Prop() color: string;
  contrastAgainstWhite: number;
  contrastAgainstBlack: number;

  render() {
    const colorElements = color => {
      const customPropValue: string = getComputedStyle(this.hostElement).getPropertyValue(color).trim();
      const HSLToHex: string = StringHSLToHex(customPropValue);
      const colorLuminance: number = getLuminance(HSLToHex);
      const whiteLuminance: number = 1;
      const blackLuminance: number = 0;
      const contrastAgainstWhite: number = parseFloat(getContrastRatio(colorLuminance, whiteLuminance).toFixed(2));
      const contrastAgainstBlack: number = parseFloat(getContrastRatio(colorLuminance, blackLuminance).toFixed(2));
      const textColor: string = contrastAgainstBlack > contrastAgainstWhite ? 'black' : 'white';
      const wcagBlack: string = wcagLevel(contrastAgainstBlack);
      const wcagWhite: string = wcagLevel(contrastAgainstWhite);
      {
        console.log(contrastAgainstWhite);
        console.log(contrastAgainstBlack);
        console.log(contrastAgainstBlack);
        console.log(textColor);
      }
      return (
        <div class="color-palette-row" style={{ backgroundColor: `var(${color})` }}>
          <div class="details">
            <span class="custom-property" style={{ color: textColor }}>
              {color}
            </span>
            <span style={{ color: textColor }}>{customPropValue}</span>
          </div>
          <div class="a11y">
            <span title={contrastAgainstBlack.toString()} class={`a11y-black ${wcagBlack === 'Fail' ? 'a11y-fail' : 'a11y-pass'}`}>
              {wcagBlack} <span class="a11y-contrast-value">{contrastAgainstBlack}</span>
            </span>
            <span title={contrastAgainstWhite.toString()} class={`a11y-white ${wcagWhite === 'Fail' ? 'a11y-fail' : 'a11y-pass'}`}>
              {wcagWhite} <span class="a11y-contrast-value">{contrastAgainstWhite}</span>
            </span>
          </div>
        </div>
      );
    };

    return colorElements(this.color);
  }
}
