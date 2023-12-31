export const fontSize = {
  xxxxxl: 38,
  xxxxl: 36,
  xxxl: 24,
  xxl: 22,
  xl: 20,
  lg: 18,
  md: 16,
  sm: 14,
  xs: 12,
  xxs: 10,
  xxxs: 8,
  custom: 30
}

export const fontWeight = {
  xxxl: 900,
  xxl: 800,
  xl: 700,
  lg: 600,
  md: 500,
  sm: 400,
  xs: 300,
  xxs: 200,
  xxxs: 100,
}
export const fontFamily = {
  initial: `'Urbanist', sans-serif`,
  righteous: `'Righteous', cursive`,
  rye: `'Rye', cursive`,
  architects: `'Architects Daughter', cursive`,
  redhat: `'Red Hat Display', sans-serif`
}
const spacingBySize: any = {
  // SF UI/Pro Text
  6: 0.246,
  7: 0.223,
  8: 0.208,
  9: 0.171,
  10: 0.12,
  11: 0.06,
  12: 0,
  13: -0.078,
  14: -0.154,
  15: -0.24,
  16: -0.32,
  17: -0.408,
  18: -0.45,
  19: -0.49,
  // SF UI/Pro Display
  20: 0.361328,
  21: 0.348633,
  22: 0.34375,
  23: 0.348145,
  24: 0.351562,
  25: 0.354004,
  26: 0.355469,
  27: 0.355957,
  28: 0.355469,
  29: 0.354004,
  30: 0.366211,
  31: 0.363281,
  32: 0.375,
  33: 0.370605,
  34: 0.381836,
  35: 0.375977,
  36: 0.386719,
  37: 0.379395,
  38: 0.371094,
  39: 0.380859,
  40: 0.371094,
  41: 0.380371,
  42: 0.369141,
  43: 0.37793,
  44: 0.365234,
  45: 0.351562,
  46: 0.359375,
  47: 0.344238,
  48: 0.351562,
  49: 0.334961,
  50: 0.341797,
  51: 0.32373,
  52: 0.304688,
  53: 0.310547,
  54: 0.290039,
  55: 0.29541,
  56: 0.273438,
  57: 0.27832,
  58: 0.254883,
  59: 0.230469,
  60: 0.234375,
  61: 0.208496,
  62: 0.211914,
  63: 0.18457,
  64: 0.1875,
  65: 0.158691,
  66: 0.161133,
  67: 0.130859,
  68: 0.132812,
  69: 0.134766,
  70: 0.102539,
  71: 0.104004,
  72: 0.105469,
  73: 0.071289,
  74: 0.072266,
  75: 0.036621,
  76: 0.037109,
  77: 0.037598,
  78: 0.0,
  79: 0.0,
  80: 0.0,
  81: 0.0,
}

export const fontSpacing = (size: any) => spacingBySize[Math.min(Math.max(size, 6), 81)]
