interface RgbaColor {
  a: number;
  b: number;
  g: number;
  r: number;
}

const hexColorPattern = /^#[\da-f]{6}$/iu;
const rgbColorPattern = /^rgba?\((?<channels>.*)\)$/iu;
const hslColorPattern = /^hsla?\((?<channels>.*)\)$/iu;
const srgbColorPattern = /^color\(\s*srgb\s+(?<channels>.+)\)$/iu;
const cssColorFunctionPattern =
  /^(?:oklch|oklab|lab|lch|color|hwb|color-mix)\(/iu;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function parseAlpha(value: string | undefined) {
  if (!value) {
    return 1;
  }

  const trimmedValue = value.trim();

  if (trimmedValue.endsWith("%")) {
    return clamp(Number.parseFloat(trimmedValue) / 100, 0, 1);
  }

  return clamp(Number.parseFloat(trimmedValue), 0, 1);
}

function parseRgbChannel(value: string) {
  const trimmedValue = value.trim();

  if (trimmedValue.endsWith("%")) {
    return clamp(Number.parseFloat(trimmedValue) * 2.55, 0, 255);
  }

  return clamp(Number.parseFloat(trimmedValue), 0, 255);
}

function parseSrgbChannel(value: string) {
  const trimmedValue = value.trim();

  if (trimmedValue.endsWith("%")) {
    return clamp(Number.parseFloat(trimmedValue) * 2.55, 0, 255);
  }

  return clamp(Number.parseFloat(trimmedValue) * 255, 0, 255);
}

function splitColorChannels(value: string) {
  const [channelValue, alphaValue] = value.split("/");
  const normalizedChannelValue = channelValue ?? "";
  const channels = normalizedChannelValue.includes(",")
    ? normalizedChannelValue.split(",").map((channel) => channel.trim())
    : normalizedChannelValue.trim().split(/\s+/u);

  if (channels.length > 3 && !alphaValue) {
    return {
      alpha: channels[3],
      channels: channels.slice(0, 3),
    };
  }

  return {
    alpha: alphaValue,
    channels,
  };
}

function hslToRgb(hue: number, saturation: number, lightness: number) {
  const normalizedHue = ((hue % 360) + 360) % 360;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const intermediate = chroma * (1 - Math.abs(((normalizedHue / 60) % 2) - 1));
  const match = lightness - chroma / 2;

  let red = 0;
  let green = 0;
  let blue = 0;

  if (normalizedHue < 60) {
    red = chroma;
    green = intermediate;
  } else if (normalizedHue < 120) {
    red = intermediate;
    green = chroma;
  } else if (normalizedHue < 180) {
    green = chroma;
    blue = intermediate;
  } else if (normalizedHue < 240) {
    green = intermediate;
    blue = chroma;
  } else if (normalizedHue < 300) {
    red = intermediate;
    blue = chroma;
  } else {
    red = chroma;
    blue = intermediate;
  }

  return {
    b: (blue + match) * 255,
    g: (green + match) * 255,
    r: (red + match) * 255,
  };
}

function parseHue(value: string) {
  const trimmedValue = value.trim();

  if (trimmedValue.endsWith("turn")) {
    return Number.parseFloat(trimmedValue) * 360;
  }

  if (trimmedValue.endsWith("rad")) {
    return (Number.parseFloat(trimmedValue) * 180) / Math.PI;
  }

  if (trimmedValue.endsWith("grad")) {
    return Number.parseFloat(trimmedValue) * 0.9;
  }

  if (trimmedValue.endsWith("deg")) {
    return Number.parseFloat(trimmedValue);
  }

  return Number.parseFloat(trimmedValue);
}

function parsePercentChannel(value: string) {
  const trimmedValue = value.trim();

  if (trimmedValue.endsWith("%")) {
    return clamp(Number.parseFloat(trimmedValue) / 100, 0, 1);
  }

  return clamp(Number.parseFloat(trimmedValue), 0, 1);
}

function parseCssColor(value: string): RgbaColor | null {
  const normalizedValue = value.trim();

  if (hexColorPattern.test(normalizedValue)) {
    return {
      a: 1,
      b: Number.parseInt(normalizedValue.slice(5, 7), 16),
      g: Number.parseInt(normalizedValue.slice(3, 5), 16),
      r: Number.parseInt(normalizedValue.slice(1, 3), 16),
    };
  }

  const rgbMatch = rgbColorPattern.exec(normalizedValue);

  if (rgbMatch) {
    const { channels: rgbChannels } = rgbMatch.groups ?? {};

    if (!rgbChannels) {
      return null;
    }

    const { alpha, channels } = splitColorChannels(rgbChannels);
    const [red, green, blue] = channels;

    if (!red || !green || !blue) {
      return null;
    }

    return {
      a: parseAlpha(alpha),
      b: parseRgbChannel(blue),
      g: parseRgbChannel(green),
      r: parseRgbChannel(red),
    };
  }

  const hslMatch = hslColorPattern.exec(normalizedValue);

  if (hslMatch) {
    const { channels: hslChannels } = hslMatch.groups ?? {};

    if (!hslChannels) {
      return null;
    }

    const { alpha, channels } = splitColorChannels(hslChannels);
    const [hue, saturation, lightness] = channels;

    if (!hue || !saturation || !lightness) {
      return null;
    }

    const rgb = hslToRgb(
      parseHue(hue),
      parsePercentChannel(saturation),
      parsePercentChannel(lightness)
    );

    return {
      a: parseAlpha(alpha),
      b: rgb.b,
      g: rgb.g,
      r: rgb.r,
    };
  }

  const srgbMatch = srgbColorPattern.exec(normalizedValue);

  if (srgbMatch) {
    const { channels: srgbChannels } = srgbMatch.groups ?? {};

    if (!srgbChannels) {
      return null;
    }

    const { alpha, channels } = splitColorChannels(srgbChannels);
    const [red, green, blue] = channels;

    if (!red || !green || !blue) {
      return null;
    }

    return {
      a: parseAlpha(alpha),
      b: parseSrgbChannel(blue),
      g: parseSrgbChannel(green),
      r: parseSrgbChannel(red),
    };
  }

  return null;
}

function compositeColor(foreground: RgbaColor, background: RgbaColor) {
  if (foreground.a >= 1) {
    return foreground;
  }

  const inverseAlpha = 1 - foreground.a;

  return {
    a: 1,
    b: foreground.b * foreground.a + background.b * inverseAlpha,
    g: foreground.g * foreground.a + background.g * inverseAlpha,
    r: foreground.r * foreground.a + background.r * inverseAlpha,
  };
}

function colorToHex(color: RgbaColor) {
  const toHexChannel = (channel: number) =>
    Math.round(clamp(channel, 0, 255))
      .toString(16)
      .padStart(2, "0");

  return `#${toHexChannel(color.r)}${toHexChannel(color.g)}${toHexChannel(
    color.b
  )}`;
}

let colorParseContext: CanvasRenderingContext2D | null = null;

function getColorParseContext() {
  if (typeof document === "undefined") {
    return null;
  }

  if (!colorParseContext) {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    colorParseContext = canvas.getContext("2d", { willReadFrequently: true });
  }

  return colorParseContext;
}

function parseCssColorWithCanvas(
  value: string,
  background?: RgbaColor
): RgbaColor | null {
  const context = getColorParseContext();

  if (!context) {
    return null;
  }

  context.clearRect(0, 0, 1, 1);

  if (background) {
    context.fillStyle = colorToHex({ ...background, a: 1 });
    context.fillRect(0, 0, 1, 1);
  }

  try {
    context.fillStyle = value;
  } catch {
    return null;
  }

  context.fillRect(0, 0, 1, 1);

  const imageData = context.getImageData(0, 0, 1, 1).data;
  const red = imageData[0] ?? 0;
  const green = imageData[1] ?? 0;
  const blue = imageData[2] ?? 0;
  const alpha = imageData[3] ?? 0;

  if (!background && alpha === 0) {
    return null;
  }

  return {
    a: alpha / 255,
    b: blue,
    g: green,
    r: red,
  };
}

function looksLikeCssColor(value: string) {
  return (
    hexColorPattern.test(value) ||
    rgbColorPattern.test(value) ||
    hslColorPattern.test(value) ||
    srgbColorPattern.test(value) ||
    cssColorFunctionPattern.test(value)
  );
}

export function isValidHexColor(value: string) {
  return hexColorPattern.test(value.trim().toLowerCase());
}

export function normalizeHexColor(value: unknown) {
  if (typeof value !== "string") {
    return;
  }

  const trimmed = value.trim().toLowerCase();

  return hexColorPattern.test(trimmed) ? trimmed : undefined;
}

function isValidThemeColor(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return false;
  }

  if (parseCssColor(trimmed)) {
    return true;
  }

  if (typeof document === "undefined") {
    return looksLikeCssColor(trimmed);
  }

  return parseCssColorWithCanvas(trimmed) !== null;
}

export function resolveColorToHex(
  colorValue: string,
  backgroundColor: RgbaColor
) {
  const parsedColor = parseCssColor(colorValue);

  if (parsedColor) {
    return colorToHex(compositeColor(parsedColor, backgroundColor));
  }

  const canvasColor = parseCssColorWithCanvas(colorValue, backgroundColor);

  if (!canvasColor) {
    return null;
  }

  return colorToHex({ ...canvasColor, a: 1 });
}

function resolveThemeColorToHex(colorValue: string) {
  const parsedColor = parseCssColor(colorValue);

  if (parsedColor) {
    return colorToHex({ ...parsedColor, a: 1 });
  }

  const canvasColor = parseCssColorWithCanvas(colorValue);

  if (!canvasColor) {
    return null;
  }

  return colorToHex({ ...canvasColor, a: 1 });
}

export function getThemeColorSwatch(colorValue: string, fallback: string) {
  const trimmed = colorValue.trim();

  if (isValidThemeColor(trimmed)) {
    return trimmed;
  }

  return fallback;
}

export function resolvePickerHex(colorValue: string, fallback: string) {
  return (
    resolveThemeColorToHex(colorValue) ??
    resolveThemeColorToHex(fallback) ??
    "#000000"
  );
}

export function parseThemeColorRgba(value: string): RgbaColor | null {
  const parsed = parseCssColor(value);

  if (parsed) {
    return parsed;
  }

  return parseCssColorWithCanvas(value);
}

export type { RgbaColor };
