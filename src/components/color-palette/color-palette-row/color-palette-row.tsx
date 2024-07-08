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
  @Prop() customBackground: string;

  render() {
    console.log('======== Row =======');
    console.log(this.color);
    console.log(this.customBackground);
    console.log('=====================');
    const colorElements = color => {
      const customPropValue: string = getComputedStyle(this.hostElement)
        .getPropertyValue(color)
        .trim();

      const customBackground: string = getComputedStyle(this.hostElement)
        .getPropertyValue(this.customBackground)
        .trim();

      // Text colour styling currently hardcoded to black or white
      const contrastAgainstWhite: number = colord(customPropValue).contrast('#ffffff');
      const contrastAgainstBlack: number = colord(customPropValue).contrast('#000000');
      const textColor: string = contrastAgainstBlack > contrastAgainstWhite ? 'black' : 'white';
      // {
      //   console.log(this.customBackground);
      // }
      return (
        <Host role="listitem">
          <div class="color-palette-row" style={{ backgroundColor: `var(${color})` }}>
            <div class="details">
              <span class="custom-property" style={{ color: textColor }} title="Cutom property">
                {color}
              </span>
              <span title="Color value" style={{ color: textColor }}>
                <strong>Background:</strong> {customPropValue} // <strong>Text: </strong>
                {customBackground}
              </span>
            </div>
            {this.customBackground ? (
              <div class="a11y">
                <a11y-tag foreground={customPropValue} background={customBackground}></a11y-tag>
              </div>
            ) : (
              <div class="a11y">
                <a11y-tag foreground={customPropValue} background="#000000"></a11y-tag>
                <a11y-tag foreground={customPropValue} background="#ffffff"></a11y-tag>
              </div>
            )}
          </div>
        </Host>
      );
    };

    return colorElements(this.color);
  }
}
