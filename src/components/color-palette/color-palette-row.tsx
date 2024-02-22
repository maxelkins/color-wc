import { Element, Component, Prop, h } from '@stencil/core';
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

  private a11yTags(foreground, background) {
    const contrastValue: number = colord(foreground).contrast(background);
    const wcagAAA: boolean = colord(foreground).isReadable(background, { level: 'AAA' });
    const wcagAA: boolean = colord(foreground).isReadable(background, { level: 'AA' });
    if (wcagAAA) {
      return (
        <span
          style={{ backgroundColor: background }}
          title={contrastValue.toString()}
          class={`a11y-pass ${background === '#000000' ? 'a11y-black' : 'a11y-white'}`}
        >
          AAA <span class="a11y-contrast-value">{contrastValue}</span>
        </span>
      );
    } else if (wcagAA) {
      return (
        <span
          style={{ backgroundColor: background }}
          title={contrastValue.toString()}
          class={`a11y-pass ${background === '#000000' ? 'a11y-black' : 'a11y-white'}`}
        >
          AA <span class="a11y-contrast-value">{contrastValue}</span>
        </span>
      );
    } else {
      return (
        <span
          style={{ backgroundColor: background }}
          title={contrastValue.toString()}
          class={`a11y-fail ${background === '#000000' ? 'a11y-black' : 'a11y-white'}`}
        >
          Fail <span class="a11y-contrast-value">{contrastValue}</span>
        </span>
      );
    }
  }

  render() {
    const colorElements = color => {
      const customPropValue: string = getComputedStyle(this.hostElement)
        .getPropertyValue(color)
        .trim();
      const contrastAgainstWhite: number = colord(customPropValue).contrast('#ffffff');
      const contrastAgainstBlack: number = colord(customPropValue).contrast('#000000');
      const textColor: string = contrastAgainstBlack > contrastAgainstWhite ? 'black' : 'white';
      {
        // console.log('---');
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
            {this.a11yTags(customPropValue, '#000000')}
            {this.a11yTags(customPropValue, '#ffffff')}
          </div>
        </div>
      );
    };

    return colorElements(this.color);
  }
}
