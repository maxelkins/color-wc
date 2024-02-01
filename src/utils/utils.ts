// Convert HSLA string to { h, s, l } object
export function extractHSL(hslaString) {
  let hslMatch = hslaString.match(/hsla\((\d+),\s*(\d+)%,\s*(\d+)%,\s*([\d.]+)\)/i);
  if (hslMatch) {
    let h = parseInt(hslMatch[1], 10);
    let s = parseInt(hslMatch[2], 10);
    let l = parseInt(hslMatch[3], 10);
    return { h, s, l };
  } else {
    throw new Error('Invalid HSLA string');
  }
}

// Convert HSL to HEX
export function hslToHex(h, s, l) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0'); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// HSL string to HEX
export function StringHSLToHex(hslaString) {
  let { h, s, l } = extractHSL(hslaString);
  return hslToHex(h, s, l);
}

// Calculate the relative luminance of a color
export function getLuminance(hexcolor) {
  hexcolor = hexcolor.replace('#', '');
  var rgb = [parseInt(hexcolor.substr(0, 2), 16), parseInt(hexcolor.substr(2, 2), 16), parseInt(hexcolor.substr(4, 2), 16)];
  for (var i = 0; i < rgb.length; i++) {
    rgb[i] = rgb[i] / 255;
    rgb[i] = rgb[i] <= 0.03928 ? rgb[i] / 12.92 : Math.pow((rgb[i] + 0.055) / 1.055, 2.4);
  }
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

// Calculate the contrast ratio
export function getContrastRatio(lum1, lum2) {
  return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
}

// Return WCAG Contrast Level
export function wcagLevel(contrast) {
  if (contrast >= 7) {
    return 'AAA';
  } else if (contrast >= 4.5) {
    return 'AA';
    // } else if (contrast >= 3) {
    // 	return "AA Large";
  } else {
    return 'Fail';
  }
}
