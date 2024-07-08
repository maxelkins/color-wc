import { Element, Component, Prop, h } from '@stencil/core';
import { colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';
import labPlugin from 'colord/plugins/lab';
import hwbPlugin from 'colord/plugins/hwb';
import lchPlugin from 'colord/plugins/lch';
extend([a11yPlugin, labPlugin, hwbPlugin, lchPlugin]);

@Component({
  tag: 'a11y-tag',
  styleUrl: 'a11y-tag.css',
  shadow: false,
})
export class ColorPaletteRow {
  @Element() hostElement: HTMLElement;
  @Prop() foreground: string;
  @Prop() background: string;
  @Prop() tag: string;

  render() {
    const contrastValue: number = colord(this.foreground).contrast(this.background);
    const wcagAAA: boolean = colord(this.foreground).isReadable(this.background, { level: 'AAA' });
    const wcagAA: boolean = colord(this.foreground).isReadable(this.background, { level: 'AA' });
    if (wcagAAA) {
      return (
        <span
          style={{ backgroundColor: this.background, color: this.tag }}
          title={
            this.background === '#000000'
              ? 'Black text contrast: ' + contrastValue.toString()
              : 'White text contrast: ' + contrastValue.toString()
          }
          class={`a11y-tag a11y-pass ${
            this.background === '#000000' ? 'a11y-black' : 'a11y-white'
          }`}
        >
          AAA <span class="a11y-contrast-value">{contrastValue}</span>
        </span>
      );
    } else if (wcagAA) {
      return (
        <span
          style={{ backgroundColor: this.background, color: this.tag }}
          title={
            this.background === '#000000'
              ? 'Black text contrast: ' + contrastValue.toString()
              : 'White text contrast: ' + contrastValue.toString()
          }
          class={`a11y-tag a11y-pass ${
            this.background === '#000000' ? 'a11y-black' : 'a11y-white'
          }`}
        >
          AA <span class="a11y-contrast-value">{contrastValue}</span>
        </span>
      );
    } else {
      return (
        <span
          style={{ backgroundColor: this.background, color: this.tag }}
          title={
            this.background === '#000000'
              ? 'Black text contrast: ' + contrastValue.toString()
              : 'White text contrast: ' + contrastValue.toString()
          }
          class={`a11y-tag a11y-fail ${
            this.background === '#000000' ? 'a11y-black' : 'a11y-white'
          }`}
        >
          Fail <span class="a11y-contrast-value">{contrastValue}</span>
        </span>
      );
    }
  }
}
