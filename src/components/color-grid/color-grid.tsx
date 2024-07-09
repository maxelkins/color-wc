import { Element, Component, Prop, Host, h } from '@stencil/core';

import { colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';
import labPlugin from 'colord/plugins/lab';
import hwbPlugin from 'colord/plugins/hwb';
import lchPlugin from 'colord/plugins/lch';
extend([a11yPlugin, labPlugin, hwbPlugin, lchPlugin]);

@Component({
  tag: 'color-grid',
  styleUrl: 'color-grid.css',
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

  customPropValue(color: string): string {
    return getComputedStyle(this.hostElement).getPropertyValue(color).trim();
  }

  render() {
    function decideTextColor(color: string): string {
      const contrastAgainstWhite: number = colord(color).contrast('#ffffff');
      const contrastAgainstBlack: number = colord(color).contrast('#000000');
      return contrastAgainstBlack > contrastAgainstWhite ? 'black' : 'white';
    }

    const numberOfColors = this.colorsArray.length;

    let gridItems = [];

    // Empty space
    gridItems.push(<div></div>);
    // Top row of colors
    for (let i = 0; i < numberOfColors; i++) {
      let color = this.customPropValue(this.colorsArray[i]);
      gridItems.push(
        <div
          class="cell cell-heading"
          style={{
            backgroundColor: color,
            color: decideTextColor(color),
          }}
        >
          <span>{this.colorsArray[i]}</span>
        </div>,
      );
    }

    for (let i = 0; i < numberOfColors; i++) {
      // Left column of colors
      let color = this.customPropValue(this.colorsArray[i]);
      gridItems.push(
        <div
          class="cell cell-heading"
          style={{
            backgroundColor: color,
            color: decideTextColor(color),
          }}
        >
          {this.colorsArray[i]}
        </div>,
      );
      for (let j = 0; j < numberOfColors; j++) {
        gridItems.push(
          <color-grid-cell
            color1={this.colorsArray[i]}
            color2={this.colorsArray[j]}
          ></color-grid-cell>,
        );
      }
    }

    return (
      <Host>
        {/* This main wrapper is needed for :has(), as it currently cannot be used on :host */}

        <main>
          <div class="grid" style={{ gridTemplateColumns: `repeat(${numberOfColors + 1}, 1fr)` }}>
            {gridItems}
          </div>
        </main>
      </Host>
    );
  }
}
