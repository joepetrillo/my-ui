interface RgbaColor {
  a: number;
  b: number;
  g: number;
  r: number;
}

const hexColorPattern = /^#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/iu;

// Parse 3-, 4-, 6-, or 8-digit hex into an RgbaColor. Short forms (#rgb / #rgba)
// expand each nibble to a full byte; the trailing pair, when present, is alpha.
function parseHexColor(value: string): RgbaColor | null {
  if (!hexColorPattern.test(value)) {
    return null;
  }

  const digits = value.slice(1);
  const isShort = digits.length <= 4;
  const expand = (part: string) =>
    Number.parseInt(isShort ? part + part : part, 16);
  const size = isShort ? 1 : 2;
  const channelAt = (index: number) =>
    expand(digits.slice(index * size, index * size + size));
  const hasAlpha = digits.length === 4 || digits.length === 8;

  return {
    a: hasAlpha ? channelAt(3) / 255 : 1,
    b: channelAt(2),
    g: channelAt(1),
    r: channelAt(0),
  };
}
const rgbColorPattern = /^rgba?\((?<channels>.*)\)$/iu;
const hslColorPattern = /^hsla?\((?<channels>.*)\)$/iu;
const srgbColorPattern = /^color\(\s*srgb\s+(?<channels>.+)\)$/iu;

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
  const hexColor = parseHexColor(normalizedValue);

  if (hexColor) {
    return hexColor;
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

// --- Oklch model -----------------------------------------------------------
// Colors are authored, stored, and displayed as oklch. The sRGB helpers above
// stay for compositing (alpha blending is done in sRGB) and for parsing the
// many color syntaxes a computed style can return; everything is converted to
// oklch at the boundary.

interface OklchColor {
  // perceptual lightness, 0..1
  l: number;
  // chroma, >= 0
  c: number;
  // hue angle in degrees, 0..360
  h: number;
}

// The largest chroma reachable inside the sRGB gamut across all hues. Used to
// bound the picker's chroma slider.
const oklchMaxChroma = 0.37;
const OKLCH_BLACK: OklchColor = { c: 0, h: 0, l: 0 };

const oklchColorPattern = /^oklch\((?<channels>.*)\)$/iu;

function srgbChannelToLinear(value: number) {
  const channel = value / 255;

  return channel <= 0.04045
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4;
}

function rgbToOklch({ r, g, b }: RgbaColor): OklchColor {
  const lr = srgbChannelToLinear(r);
  const lg = srgbChannelToLinear(g);
  const lb = srgbChannelToLinear(b);

  const long = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const medium = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const short = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  const longRoot = Math.cbrt(long);
  const mediumRoot = Math.cbrt(medium);
  const shortRoot = Math.cbrt(short);

  const okL =
    0.2104542553 * longRoot +
    0.793617785 * mediumRoot -
    0.0040720468 * shortRoot;
  const okA =
    1.9779984951 * longRoot -
    2.428592205 * mediumRoot +
    0.4505937099 * shortRoot;
  const okB =
    0.0259040371 * longRoot +
    0.7827717662 * mediumRoot -
    0.808675766 * shortRoot;

  const chroma = Math.hypot(okA, okB);
  let hue = (Math.atan2(okB, okA) * 180) / Math.PI;

  if (hue < 0) {
    hue += 360;
  }

  return { c: chroma, h: hue, l: okL };
}

// Linear-light sRGB channels, left unclamped so callers can detect when an
// oklab color falls outside the displayable gamut.
function oklabToLinearRgb(okL: number, okA: number, okB: number) {
  const longRoot = okL + 0.3963377774 * okA + 0.2158037573 * okB;
  const mediumRoot = okL - 0.1055613458 * okA - 0.0638541728 * okB;
  const shortRoot = okL - 0.0894841775 * okA - 1.291485548 * okB;

  const long = longRoot ** 3;
  const medium = mediumRoot ** 3;
  const short = shortRoot ** 3;

  return {
    b: -0.0041960863 * long - 0.7034186147 * medium + 1.707614701 * short,
    g: -1.2684380046 * long + 2.6097574011 * medium - 0.3413193965 * short,
    r: 4.0767416621 * long - 3.3077115913 * medium + 0.2309699292 * short,
  };
}

function oklchToLinearRgb({ l, c, h }: OklchColor) {
  const hueRadians = (h * Math.PI) / 180;

  return oklabToLinearRgb(
    l,
    c * Math.cos(hueRadians),
    c * Math.sin(hueRadians)
  );
}

function linearSrgbChannelToByte(channel: number) {
  const linear = clamp(channel, 0, 1);
  const encoded =
    linear <= 0.0031308 ? linear * 12.92 : 1.055 * linear ** (1 / 2.4) - 0.055;

  return clamp(encoded, 0, 1) * 255;
}

function parseOklchLightness(value: string) {
  const trimmed = value.trim();

  if (trimmed.endsWith("%")) {
    return clamp(Number.parseFloat(trimmed) / 100, 0, 1);
  }

  return clamp(Number.parseFloat(trimmed), 0, 1);
}

function parseOklchChroma(value: string) {
  const trimmed = value.trim();

  if (trimmed.endsWith("%")) {
    return Math.max(0, (Number.parseFloat(trimmed) / 100) * 0.4);
  }

  return Math.max(0, Number.parseFloat(trimmed));
}

function parseOklch(value: string): OklchColor | null {
  const match = oklchColorPattern.exec(value.trim());
  const channelsValue = match?.groups?.channels;

  if (!channelsValue) {
    return null;
  }

  const { channels } = splitColorChannels(channelsValue);
  const [lightness, chroma, hue] = channels;

  if (lightness === undefined || chroma === undefined || hue === undefined) {
    return null;
  }

  const l = parseOklchLightness(lightness);
  const c = parseOklchChroma(chroma);
  const h = parseHue(hue);

  if (Number.isNaN(l) || Number.isNaN(c) || Number.isNaN(h)) {
    return null;
  }

  return { c, h: ((h % 360) + 360) % 360, l };
}

// --- Modern color parsing --------------------------------------------------
// getComputedStyle serializes oklch-authored tokens into one of the CSS Color 4
// functions below. Parsing them here (instead of round-tripping through a
// canvas) keeps the model free of any DOM dependency.

const labColorPattern = /^lab\((?<channels>.*)\)$/iu;
const lchColorPattern = /^lch\((?<channels>.*)\)$/iu;
const oklabColorPattern = /^oklab\((?<channels>.*)\)$/iu;

// CIE Lab/LCH use the D50 white point.
const WHITE_D50_X = 0.3457 / 0.3585;
const WHITE_D50_Z = (1 - 0.3457 - 0.3585) / 0.3585;

function parseLabLightness(value: string) {
  // L is 0..100 for both number and percentage forms (100% === 100).
  return clamp(Number.parseFloat(value.trim()), 0, 100);
}

function parseLabAxis(value: string) {
  const trimmed = value.trim();
  const parsed = Number.parseFloat(trimmed);

  // a/b percentages map ±100% to ±125.
  return trimmed.endsWith("%") ? (parsed / 100) * 125 : parsed;
}

function parseLchChroma(value: string) {
  const trimmed = value.trim();
  const parsed = Number.parseFloat(trimmed);

  // Chroma percentages map 100% to 150.
  return Math.max(0, trimmed.endsWith("%") ? (parsed / 100) * 150 : parsed);
}

function parseOklabAxis(value: string) {
  const trimmed = value.trim();
  const parsed = Number.parseFloat(trimmed);

  // oklab a/b percentages map ±100% to ±0.4.
  return trimmed.endsWith("%") ? (parsed / 100) * 0.4 : parsed;
}

// Lab(D50) -> XYZ(D50) -> XYZ(D65, Bradford) -> linear sRGB.
function labToLinearRgb(lightness: number, aAxis: number, bAxis: number) {
  const kappa = 24_389 / 27;
  const epsilon = 216 / 24_389;
  const fy = (lightness + 16) / 116;
  const fx = aAxis / 500 + fy;
  const fz = fy - bAxis / 200;
  const x50 =
    (fx ** 3 > epsilon ? fx ** 3 : (116 * fx - 16) / kappa) * WHITE_D50_X;
  const y50 = lightness > kappa * epsilon ? fy ** 3 : lightness / kappa;
  const z50 =
    (fz ** 3 > epsilon ? fz ** 3 : (116 * fz - 16) / kappa) * WHITE_D50_Z;

  const x =
    0.9554734527042182 * x50 -
    0.02309853687426142 * y50 +
    0.0632593086610217 * z50;
  const y =
    -0.02836970696320814 * x50 +
    1.0099954580058226 * y50 +
    0.02104139896694301 * z50;
  const z =
    0.0123140016883199 * x50 -
    0.02050769643347791 * y50 +
    1.3303659366080753 * z50;

  return {
    b:
      0.05563007969699366 * x -
      0.20397695888897652 * y +
      1.0569715142428786 * z,
    g:
      -0.9692436362808796 * x +
      1.8759675015077202 * y +
      0.04155505740717559 * z,
    r: 3.2409699419045226 * x - 1.537383177570094 * y - 0.4986107602930034 * z,
  };
}

function linearRgbToRgba(
  linear: { r: number; g: number; b: number },
  alpha: number
): RgbaColor {
  return {
    a: alpha,
    b: linearSrgbChannelToByte(linear.b),
    g: linearSrgbChannelToByte(linear.g),
    r: linearSrgbChannelToByte(linear.r),
  };
}

function parseLabRgba(channelsValue: string): RgbaColor | null {
  const { alpha, channels } = splitColorChannels(channelsValue);
  const [lightness, aAxis, bAxis] = channels;

  if (lightness === undefined || aAxis === undefined || bAxis === undefined) {
    return null;
  }

  const l = parseLabLightness(lightness);
  const a = parseLabAxis(aAxis);
  const b = parseLabAxis(bAxis);

  if (Number.isNaN(l) || Number.isNaN(a) || Number.isNaN(b)) {
    return null;
  }

  return linearRgbToRgba(labToLinearRgb(l, a, b), parseAlpha(alpha));
}

function parseLchRgba(channelsValue: string): RgbaColor | null {
  const { alpha, channels } = splitColorChannels(channelsValue);
  const [lightness, chroma, hue] = channels;

  if (lightness === undefined || chroma === undefined || hue === undefined) {
    return null;
  }

  const l = parseLabLightness(lightness);
  const c = parseLchChroma(chroma);
  const h = parseHue(hue);

  if (Number.isNaN(l) || Number.isNaN(c) || Number.isNaN(h)) {
    return null;
  }

  const radians = (h * Math.PI) / 180;

  return linearRgbToRgba(
    labToLinearRgb(l, c * Math.cos(radians), c * Math.sin(radians)),
    parseAlpha(alpha)
  );
}

function parseOklabRgba(channelsValue: string): RgbaColor | null {
  const { alpha, channels } = splitColorChannels(channelsValue);
  const [lightness, aAxis, bAxis] = channels;

  if (lightness === undefined || aAxis === undefined || bAxis === undefined) {
    return null;
  }

  const l = parseOklchLightness(lightness);
  const a = parseOklabAxis(aAxis);
  const b = parseOklabAxis(bAxis);

  if (Number.isNaN(l) || Number.isNaN(a) || Number.isNaN(b)) {
    return null;
  }

  return linearRgbToRgba(oklabToLinearRgb(l, a, b), parseAlpha(alpha));
}

function parseOklchRgba(channelsValue: string): RgbaColor | null {
  const color = parseOklch(`oklch(${channelsValue})`);

  if (!color) {
    return null;
  }

  const { alpha } = splitColorChannels(channelsValue);

  return linearRgbToRgba(oklchToLinearRgb(color), parseAlpha(alpha));
}

function parseModernColor(value: string): RgbaColor | null {
  const lab = labColorPattern.exec(value)?.groups?.channels;

  if (lab !== undefined) {
    return parseLabRgba(lab);
  }

  const lch = lchColorPattern.exec(value)?.groups?.channels;

  if (lch !== undefined) {
    return parseLchRgba(lch);
  }

  const oklab = oklabColorPattern.exec(value)?.groups?.channels;

  if (oklab !== undefined) {
    return parseOklabRgba(oklab);
  }

  const oklch = oklchColorPattern.exec(value)?.groups?.channels;

  if (oklch !== undefined) {
    return parseOklchRgba(oklch);
  }

  return null;
}

function formatNumber(value: number, decimals: number) {
  return Number.parseFloat(value.toFixed(decimals)).toString();
}

function formatOklch({ l, c, h }: OklchColor) {
  // Convention: L and C to 3 decimals, H up to 3, trailing zeros dropped.
  return `oklch(${formatNumber(clamp(l, 0, 1), 3)} ${formatNumber(
    Math.max(0, c),
    3
  )} ${formatNumber(((h % 360) + 360) % 360, 3)})`;
}

// Parse any CSS color string into sRGB bytes: the classic syntaxes plus the
// CSS Color 4 functions (lab/lch/oklab/oklch) that getComputedStyle serializes
// oklch-authored tokens into.
export function parseThemeColorRgba(value: string): RgbaColor | null {
  return parseCssColor(value) ?? parseModernColor(value);
}

function toOklchColor(value: string): OklchColor | null {
  const direct = parseOklch(value);

  if (direct) {
    return direct;
  }

  const rgba = parseThemeColorRgba(value);

  return rgba ? rgbToOklch(rgba) : null;
}

export function isValidOklchColor(value: string) {
  return parseOklch(value) !== null;
}

// Canonicalize any CSS color (oklch, or a legacy hex/rgb value from older
// stored drafts) into an oklch string. Returns undefined for non-colors.
export function normalizeOklchColor(value: unknown) {
  if (typeof value !== "string") {
    return;
  }

  const color = toOklchColor(value.trim());

  return color ? formatOklch(color) : undefined;
}

// Flatten a token's computed value (which may be a translucent color-mix) over
// the background and express the opaque result as oklch.
export function resolveColorToOklch(
  colorValue: string,
  backgroundColor: RgbaColor
) {
  const parsedColor = parseThemeColorRgba(colorValue);

  if (!parsedColor) {
    return null;
  }

  const composited = compositeColor(parsedColor, backgroundColor);

  return formatOklch(rgbToOklch({ ...composited, a: 1 }));
}

export function getThemeColorSwatch(colorValue: string, fallback: string) {
  const color = toOklchColor(colorValue.trim());

  return color ? formatOklch(color) : fallback;
}

export function resolvePickerOklch(
  colorValue: string,
  fallback: string
): OklchColor {
  return toOklchColor(colorValue) ?? toOklchColor(fallback) ?? OKLCH_BLACK;
}

function isLinearRgbInGamut({ r, g, b }: { r: number; g: number; b: number }) {
  const epsilon = 0.001;

  return (
    r >= -epsilon &&
    r <= 1 + epsilon &&
    g >= -epsilon &&
    g <= 1 + epsilon &&
    b >= -epsilon &&
    b <= 1 + epsilon
  );
}

export function clampOklchToGamut({ l, c, h }: OklchColor): OklchColor {
  const lightness = clamp(l, 0, 1);

  if (isLinearRgbInGamut(oklchToLinearRgb({ c, h, l: lightness }))) {
    return { c, h, l: lightness };
  }

  // Binary-search the largest chroma that still fits in sRGB, so picker
  // gradients and swatches never show clipped channels.
  let low = 0;
  let high = c;

  for (let step = 0; step < 18; step += 1) {
    const mid = (low + high) / 2;

    if (isLinearRgbInGamut(oklchToLinearRgb({ c: mid, h, l: lightness }))) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return { c: low, h, l: lightness };
}

export function oklchToCss(color: OklchColor) {
  return formatOklch(color);
}

export const OKLCH_MAX_CHROMA = oklchMaxChroma;

export type { OklchColor, RgbaColor };
