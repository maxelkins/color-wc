import { Element, Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'color-palette',
  styleUrl: 'color-palette.css',
  shadow: true,
})
export class ColorPalette {
  @Element() hostElement: HTMLElement;
  @Prop() colors: string;
  @Prop() title: string;
  @Prop() controls: boolean;
  colorsArray: string[];

  // Split colors prop string into an array of colors
  componentWillLoad() {
    this.colorsArray = this.colors.split(',').map(color => color.trim());
  }

  render() {
    return (
      <Host>
        <div class="wrapper">
          {this.title ? <div class="title">{this.title}</div> : ''}
          {this.controls ? (
            <div class="controls">
              <label htmlFor="contrast">
                Contrast values
                <input type="checkbox" name="contrast" id="contrast" />
              </label>
            </div>
          ) : (
            ''
          )}
          <div class="palette">
            {this.colorsArray.map(color => (
              <color-palette-row color={color}></color-palette-row>
            ))}
          </div>
        </div>
      </Host>
    );
  }
}
