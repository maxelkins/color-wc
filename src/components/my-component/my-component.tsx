import { Element, Component, Prop, h } from '@stencil/core';
// import { ColorRow } from './color-row';
import { StringHSLToHex, getLuminance, getContrastRatio, wcagLevel } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  @Element() hostElement: HTMLElement;
  @Prop() color: string;

  // Get the computed styles of the root HTML element
  rootStyle = getComputedStyle(document.documentElement);

  // Get the value of the custom property
  private customPropertyValue(): string {
    const hostStyle = getComputedStyle(this.hostElement);
    console.log(hostStyle.getPropertyValue(this.color));
    return hostStyle.getPropertyValue(this.color).trim();
  }

  // Calculate the luminance of the color
  HSLToHex = StringHSLToHex(this.customPropertyValue());
  // HSLToHex = StringHSLToHex('hsla(40, 60%, 33%, 1)');
  colorLuminance = getLuminance(this.HSLToHex);

  // Define the luminance of white and black for contrast calculation
  whiteLuminance = 1; // The relative luminance of white is 1
  blackLuminance = 0; // The relative luminance of black is 0

  // Calculate the contrast ratio of the color against white and black, rounded to two decimal places
  contrastAgainstWhite = (Math.floor(getContrastRatio(this.colorLuminance, this.whiteLuminance) * 100) / 100).toFixed(2);
  contrastAgainstBlack = (Math.floor(getContrastRatio(this.colorLuminance, this.blackLuminance) * 100) / 100).toFixed(2);

  // Set text color based on contrast ratio
  textColor = this.contrastAgainstBlack > this.contrastAgainstWhite ? 'black' : 'white';

  // Create backgroundColor custom property
  private colorCusProp(): string {
    return 'var(' + this.color + ')';
  }

  // Return a div element representing the color and the constrast details.
  render() {
    return (
      <div class="colorPalette" style={{ backgroundColor: this.colorCusProp() }}>
        <slot />
        <div class="details">
          asdas
          {/* <span style={{ color: this.textColor }}>{this.color}</span> */}
          <span style={{ color: this.textColor }}>{this.customPropertyValue()}</span>
        </div>
        <div class="a11y">
          <span class={`a11y-black ${wcagLevel(this.contrastAgainstBlack) === 'Fail' ? 'a11y-fail' : 'a11y-pass'}`}>
            {wcagLevel(this.contrastAgainstBlack)} {this.contrastAgainstBlack}
          </span>
          <span class={`a11y-white ${wcagLevel(this.contrastAgainstWhite) === 'Fail' ? 'a11y-fail' : 'a11y-pass'}`}>
            {wcagLevel(this.contrastAgainstWhite)} {this.contrastAgainstWhite}
          </span>
        </div>
      </div>
    );
  }
}
