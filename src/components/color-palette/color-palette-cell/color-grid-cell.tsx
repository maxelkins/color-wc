import { Element, Component, Prop, h, Host } from '@stencil/core';
import { colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';
import labPlugin from 'colord/plugins/lab';
import hwbPlugin from 'colord/plugins/hwb';
import lchPlugin from 'colord/plugins/lch';
extend([a11yPlugin, labPlugin, hwbPlugin, lchPlugin]);

@Component({
  tag: 'color-grid-cell',
  styleUrl: 'color-grid-cell.css',
  shadow: false,
})
export class ColorCellRow {
  @Element() hostElement: HTMLElement;
  @Prop() color1: string;
  @Prop() color2: string;

  customPropValue(color: string): string {
    return getComputedStyle(this.hostElement).getPropertyValue(color).trim();
  }

  contrastValue(color1: string, color2: string): number {
    return colord(this.customPropValue(color1)).contrast(this.customPropValue(color2));
  }

  wcagAAA(color1: string, color2: string): boolean {
    return colord(this.customPropValue(color1)).isReadable(this.customPropValue(color2), {
      level: 'AAA',
    });
  }

  wcagAA(color1: string, color2: string): boolean {
    return colord(this.customPropValue(color1)).isReadable(this.customPropValue(color2), {
      level: 'AA',
    });
  }

  render() {
    if (this.wcagAAA(this.color1, this.color2)) {
      return (
        <div class={`cell-pass cell`}>
          <span>AAA</span>
          <span>{this.contrastValue(this.color1, this.color2)}</span>
        </div>
      );
    } else if (this.wcagAA(this.color1, this.color2)) {
      return (
        <div class={`cell-pass cell`}>
          <span>AA</span>
          <span>{this.contrastValue(this.color1, this.color2)}</span>
        </div>
      );
    } else {
      return (
        <div class={`cell-fail cell`}>
          <span>Fail</span>
          <span>{this.contrastValue(this.color1, this.color2)}</span>
        </div>
      );
    }
  }
}
