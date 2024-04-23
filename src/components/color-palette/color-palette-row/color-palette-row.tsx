import { Element, Component, Prop, h, Host } from '@stencil/core';
import { colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';
import labPlugin from 'colord/plugins/lab';
import hwbPlugin from 'colord/plugins/hwb';
import lchPlugin from 'colord/plugins/lch';
extend([a11yPlugin, labPlugin, hwbPlugin, lchPlugin]);

@Component({
  tag: 'color-palette-row',
  styleUrl: 'color-palette-row.css',
  shadow: false,
})
export class ColorPaletteRow {
  @Element() hostElement: HTMLElement;
  @Prop() color: string;

  render() {
    const colorElements = color => {
      const customPropValue: string = getComputedStyle(this.hostElement)
        .getPropertyValue(color)
        .trim();

      // Text colour styling currently hardcoded to black or white
      const contrastAgainstWhite: number = colord(customPropValue).contrast('#ffffff');
      const contrastAgainstBlack: number = colord(customPropValue).contrast('#000000');
      // const textColor: string = contrastAgainstBlack > contrastAgainstWhite ? 'black' : 'white';
      {
        // console.log('---');
      }
      return (
        <Host class="color-palette-row" role="listitem">
          <span class="details custom-property" title="Custom property">
            {color}
          </span>
          <span class="details" title="Color value">
            {customPropValue}
          </span>
          <div class="visual" style={{ backgroundColor: `var(${color})` }}>
            <a11y-tag foreground={customPropValue} background="#000000"></a11y-tag>
            <a11y-tag foreground={customPropValue} background="#ffffff"></a11y-tag>
          </div>
        </Host>
      );
    };

    return colorElements(this.color);
  }
}
