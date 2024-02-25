import { Element, Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'color-palette',
  styleUrl: 'color-palette.css',
  shadow: true,
})
export class ColorPalette {
  @Element() hostElement: HTMLElement;
  @Prop() colors: string;
  @Prop() heading: string;
  @Prop() controls: boolean;
  colorsArray: string[];

  // Split colors prop string into an array of colors
  componentWillLoad() {
    this.colorsArray = this.colors.split(',').map(color => color.trim());
  }

  render() {
    return (
      <Host>
        {/* This main wrapper is needed for :has(), as it currently cannot be used on :host */}
        <main>
          {this.heading ? <div class="heading">{this.heading}</div> : ''}
          {this.controls ? (
            <details>
              <div class="controls">
                <input-toggle on toggleId="contrast" toggleLabel="Contrast values"></input-toggle>
                <input-toggle on toggleId="fail" toggleLabel="Fails"></input-toggle>
                <input-toggle on toggleId="pass" toggleLabel="Passes"></input-toggle>
              </div>
              <summary>Controls</summary>
            </details>
          ) : (
            ''
          )}
          <ol class="palette">
            {this.colorsArray.map(color => (
              <color-palette-row color={color}></color-palette-row>
            ))}
          </ol>
        </main>
      </Host>
    );
  }
}
