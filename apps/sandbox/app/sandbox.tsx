"use client";

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  Avatar,
  AvatarFallback,
  Badge,
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  buttonVariants,
  Calendar,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPanel,
  CardTitle,
  Checkbox,
  CheckboxGroup,
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
  CommandSeparator,
  CommandShortcut,
  ContextMenu,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuSeparator,
  ContextMenuTrigger,
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Fieldset,
  FieldsetLegend,
  Form,
  Frame,
  FrameDescription,
  FrameFooter,
  FrameHeader,
  FramePanel,
  FrameTitle,
  Group,
  GroupSeparator,
  GroupText,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  Kbd,
  KbdGroup,
  Label,
  Menu,
  MenuCheckboxItem,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubPopup,
  MenuSubTrigger,
  MenuTrigger,
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
  OTPField,
  OTPFieldInput,
  OTPFieldSeparator,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
  Radio,
  RadioGroup,
  ScrollArea,
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  Skeleton,
  Slider,
  SliderValue,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Textarea,
  ToastProvider,
  toastManager,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupSeparator,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
  useCopyToClipboard,
  useMediaQuery,
} from "@my-ui/ui";
import { format } from "date-fns";
import {
  BoldIcon,
  CalendarIcon,
  CheckIcon,
  ClipboardIcon,
  CopyIcon,
  FileTextIcon,
  HomeIcon,
  InboxIcon,
  ItalicIcon,
  LayersIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
  SaveIcon,
  SearchIcon,
  SettingsIcon,
  SlidersHorizontalIcon,
  StarIcon,
  TrashIcon,
  UnderlineIcon,
  UserIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

interface Fruit {
  label: string;
  value: string;
}

interface CommandItemData {
  label: string;
  shortcut?: string;
  value: string;
}

interface CommandGroupData {
  items: CommandItemData[];
  value: string;
}

const storageKey = "my-ui-theme-draft";
const themeModeStorageKey = "theme";
const colorCommitDelayMs = 180;

const resolvedThemeModes = ["light", "dark"] as const;

const themeModeItems = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
] as const;

const themeModeLabels = {
  dark: "Dark",
  light: "Light",
} as const;

const colorTokenGroups = [
  {
    label: "Core",
    tokens: [
      { label: "Background", value: "background" },
      { label: "Foreground", value: "foreground" },
      { label: "Card", value: "card" },
      { label: "Card foreground", value: "card-foreground" },
      { label: "Popover", value: "popover" },
      { label: "Popover foreground", value: "popover-foreground" },
      { label: "Border", value: "border" },
      { label: "Input", value: "input" },
      { label: "Ring", value: "ring" },
    ],
  },
  {
    label: "Actions",
    tokens: [
      { label: "Primary", value: "primary" },
      { label: "Primary foreground", value: "primary-foreground" },
      { label: "Secondary", value: "secondary" },
      { label: "Secondary foreground", value: "secondary-foreground" },
      { label: "Muted", value: "muted" },
      { label: "Muted foreground", value: "muted-foreground" },
      { label: "Accent", value: "accent" },
      { label: "Accent foreground", value: "accent-foreground" },
    ],
  },
  {
    label: "Status",
    tokens: [
      { label: "Destructive", value: "destructive" },
      { label: "Destructive foreground", value: "destructive-foreground" },
      { label: "Info", value: "info" },
      { label: "Info foreground", value: "info-foreground" },
      { label: "Success", value: "success" },
      { label: "Success foreground", value: "success-foreground" },
      { label: "Warning", value: "warning" },
      { label: "Warning foreground", value: "warning-foreground" },
    ],
  },
  {
    label: "Charts",
    tokens: [
      { label: "Chart 1", value: "chart-1" },
      { label: "Chart 2", value: "chart-2" },
      { label: "Chart 3", value: "chart-3" },
      { label: "Chart 4", value: "chart-4" },
      { label: "Chart 5", value: "chart-5" },
    ],
  },
  {
    label: "Sidebar",
    tokens: [
      { label: "Sidebar", value: "sidebar" },
      { label: "Sidebar foreground", value: "sidebar-foreground" },
      { label: "Sidebar primary", value: "sidebar-primary" },
      {
        label: "Sidebar primary foreground",
        value: "sidebar-primary-foreground",
      },
      { label: "Sidebar accent", value: "sidebar-accent" },
      {
        label: "Sidebar accent foreground",
        value: "sidebar-accent-foreground",
      },
      { label: "Sidebar border", value: "sidebar-border" },
      { label: "Sidebar ring", value: "sidebar-ring" },
    ],
  },
  {
    label: "Code",
    tokens: [
      { label: "Code", value: "code" },
      { label: "Code foreground", value: "code-foreground" },
      { label: "Code highlight", value: "code-highlight" },
    ],
  },
] as const;

type ResolvedThemeMode = (typeof resolvedThemeModes)[number];
type ColorToken = (typeof colorTokenGroups)[number]["tokens"][number]["value"];
type ThemeColorOverrides = Record<
  ResolvedThemeMode,
  Partial<Record<ColorToken, string>>
>;
type ThemeStyle = React.CSSProperties &
  Record<`--${string}`, string | undefined>;
type SandboxPortalProps = React.HTMLAttributes<HTMLDivElement> & {
  "data-ui-motion"?: string;
  "data-sandbox-preview-portal": string;
  style: ThemeStyle;
};

interface ThemeDraft {
  colorOverrides: ThemeColorOverrides;
  font: "geist" | "system" | "serif";
  motion: "standard" | "reduced" | "none";
  radius: string;
}

const colorTokens = colorTokenGroups.flatMap((group) =>
  group.tokens.map((token) => token.value)
) as ColorToken[];

function cssVariableName(token: ColorToken) {
  return `--${token}` as const;
}

const legacyDocumentThemeProperties = [
  "--radius",
  "--spacing",
  "--font-sans",
  ...colorTokens.map((token) => `--${token}`),
];
const managedPreviewStyleProperties = [
  "--radius",
  "--font-sans",
  ...colorTokens.map((token) => cssVariableName(token)),
] as const;

const hexColorPattern = /^#[\da-f]{6}$/iu;
const rgbColorPattern = /^rgba?\((?<channels>.*)\)$/iu;
const srgbColorPattern = /^color\(\s*srgb\s+(?<channels>.+)\)$/iu;

function createEmptyColorOverrides(): ThemeColorOverrides {
  return {
    dark: {},
    light: {},
  };
}

function createDefaultThemeDraft(): ThemeDraft {
  return {
    colorOverrides: createEmptyColorOverrides(),
    font: "geist",
    motion: "standard",
    radius: "0",
  };
}

const defaultThemeDraft = createDefaultThemeDraft();

function createFallbackTokenValues(
  mode: ResolvedThemeMode
): Record<ColorToken, string> {
  const background = mode === "dark" ? "#171715" : "#fbfaf7";
  const foreground = mode === "dark" ? "#f2f0ea" : "#252521";
  const card = mode === "dark" ? "#1d1c1a" : "#fffefd";
  const values = Object.fromEntries(
    colorTokens.map((token) => [token, foreground])
  ) as Record<ColorToken, string>;

  values.background = background;
  values.foreground = foreground;
  values.card = card;
  values["card-foreground"] = foreground;
  values.popover = mode === "dark" ? "#20201d" : "#fffefd";
  values["popover-foreground"] = foreground;
  values.primary = foreground;
  values["primary-foreground"] = card;

  return values;
}

const fallbackTokenValues = {
  dark: createFallbackTokenValues("dark"),
  light: createFallbackTokenValues("light"),
} satisfies Record<ResolvedThemeMode, Record<ColorToken, string>>;

function hasModeColorOverrides(overrides: Partial<Record<ColorToken, string>>) {
  return colorTokens.some((token) => Boolean(overrides[token]));
}

function hasColorOverrides(overrides: ThemeColorOverrides) {
  return resolvedThemeModes.some((mode) =>
    hasModeColorOverrides(overrides[mode])
  );
}

function isDefaultThemeDraft(draft: ThemeDraft) {
  return (
    draft.font === defaultThemeDraft.font &&
    draft.motion === defaultThemeDraft.motion &&
    draft.radius === defaultThemeDraft.radius &&
    !hasColorOverrides(draft.colorOverrides)
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isThemeFont(value: unknown): value is ThemeDraft["font"] {
  return value === "geist" || value === "system" || value === "serif";
}

function isThemeMotion(value: unknown): value is ThemeDraft["motion"] {
  return value === "standard" || value === "reduced" || value === "none";
}

function normalizeHexColor(value: unknown) {
  return typeof value === "string" && hexColorPattern.test(value)
    ? value.toLowerCase()
    : undefined;
}

function readStoredColorOverrides(value: unknown): ThemeColorOverrides {
  const colorOverrides = createEmptyColorOverrides();

  if (!isRecord(value)) {
    return colorOverrides;
  }

  for (const mode of resolvedThemeModes) {
    const modeValue = value[mode];

    if (!isRecord(modeValue)) {
      continue;
    }

    for (const token of colorTokens) {
      const color = normalizeHexColor(modeValue[token]);

      if (color) {
        colorOverrides[mode][token] = color;
      }
    }
  }

  return colorOverrides;
}

function applyLegacyColorOverrides(
  storedValue: Record<string, unknown>,
  colorOverrides: ThemeColorOverrides
) {
  const legacyTokenDefaults = [
    { defaultValue: "#fbfaf7", key: "background", token: "background" },
    { defaultValue: "#252521", key: "foreground", token: "foreground" },
    { defaultValue: "#fffefd", key: "card", token: "card" },
    { defaultValue: "#252521", key: "primary", token: "primary" },
    { defaultValue: "#d8d3c9", key: "border", token: "border" },
  ] as const satisfies readonly {
    defaultValue: string;
    key: string;
    token: ColorToken;
  }[];
  const legacyOverrides: Partial<Record<ColorToken, string>> = {};

  for (const { defaultValue, key, token } of legacyTokenDefaults) {
    const color = normalizeHexColor(storedValue[key]);

    if (color && color !== defaultValue) {
      legacyOverrides[token] = color;
    }
  }

  if (!hasModeColorOverrides(legacyOverrides)) {
    return;
  }

  for (const mode of resolvedThemeModes) {
    colorOverrides[mode] = {
      ...legacyOverrides,
      ...colorOverrides[mode],
    };
  }
}

function parseStoredThemeDraft(storedValue: string): ThemeDraft {
  const draft = createDefaultThemeDraft();
  const parsed = JSON.parse(storedValue) as unknown;

  if (!isRecord(parsed)) {
    return draft;
  }

  const colorOverrides = readStoredColorOverrides(parsed.colorOverrides);
  applyLegacyColorOverrides(parsed, colorOverrides);

  return {
    colorOverrides,
    font: isThemeFont(parsed.font) ? parsed.font : draft.font,
    motion: isThemeMotion(parsed.motion) ? parsed.motion : draft.motion,
    radius: typeof parsed.radius === "string" ? parsed.radius : draft.radius,
  };
}

interface RgbaColor {
  a: number;
  b: number;
  g: number;
  r: number;
}

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

function resolveTokenColor(probe: HTMLElement, token: ColorToken) {
  probe.style.backgroundColor = "";
  probe.style.backgroundColor = `var(${cssVariableName(token)})`;

  return window.getComputedStyle(probe).backgroundColor;
}

function readResolvedTokenValues(
  fallbackValues: Record<ColorToken, string>
): Record<ColorToken, string> {
  if (!document.body) {
    return fallbackValues;
  }

  const probe = document.createElement("div");
  probe.style.inset = "0";
  probe.style.pointerEvents = "none";
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  document.body.append(probe);

  const backgroundColor =
    parseCssColor(resolveTokenColor(probe, "background")) ??
    parseCssColor(fallbackValues.background);
  const values = { ...fallbackValues };

  for (const token of colorTokens) {
    const tokenColor = parseCssColor(resolveTokenColor(probe, token));

    if (tokenColor && backgroundColor) {
      values[token] = colorToHex(compositeColor(tokenColor, backgroundColor));
    }
  }

  probe.remove();

  return values;
}

function clearLegacyDocumentThemeStyles() {
  const root = document.documentElement;

  for (const property of legacyDocumentThemeProperties) {
    root.style.removeProperty(property);
  }

  delete root.dataset.uiMotion;
  document.body?.style.removeProperty("--font-sans");
}

function createPreviewStyle(draft: ThemeDraft, mode: ResolvedThemeMode) {
  const style: ThemeStyle = {};
  const modeColorOverrides = draft.colorOverrides[mode];

  if (draft.radius !== defaultThemeDraft.radius) {
    style["--radius"] = `${draft.radius}px`;
  }

  for (const token of colorTokens) {
    const color = modeColorOverrides[token];

    if (color) {
      style[cssVariableName(token)] = color;
    }
  }

  if (draft.font === "system") {
    style["--font-sans"] = "ui-sans-serif, system-ui, sans-serif";
    style.fontFamily = "var(--font-sans)";
  } else if (draft.font === "serif") {
    style["--font-sans"] = "ui-serif, Georgia, serif";
    style.fontFamily = "var(--font-sans)";
  }

  return style;
}

function getPreviewStyleTargets(previewRoot: HTMLElement | null) {
  if (typeof document === "undefined") {
    return previewRoot ? [previewRoot] : [];
  }

  const targets = [
    ...document.querySelectorAll<HTMLElement>("[data-sandbox-preview-portal]"),
  ];

  if (previewRoot) {
    targets.unshift(previewRoot);
  }

  return targets;
}

function setPreviewStyleProperty(
  previewRoot: HTMLElement | null,
  property: `--${string}`,
  value: string | undefined
) {
  for (const target of getPreviewStyleTargets(previewRoot)) {
    if (value) {
      target.style.setProperty(property, value);
    } else {
      target.style.removeProperty(property);
    }
  }
}

function syncPreviewStyle(previewRoot: HTMLElement | null, style: ThemeStyle) {
  for (const target of getPreviewStyleTargets(previewRoot)) {
    for (const property of managedPreviewStyleProperties) {
      target.style.removeProperty(property);
    }

    target.style.removeProperty("font-family");

    for (const [property, value] of Object.entries(style)) {
      if (property.startsWith("--") && typeof value === "string" && value) {
        target.style.setProperty(property, value);
      }
    }

    if (style.fontFamily) {
      target.style.fontFamily = String(style.fontFamily);
    }
  }
}

function syncPreviewMotion(
  previewRoot: HTMLElement | null,
  motion: string | undefined
) {
  for (const target of getPreviewStyleTargets(previewRoot)) {
    if (motion) {
      target.dataset.uiMotion = motion;
    } else {
      delete target.dataset.uiMotion;
    }
  }
}

function createSandboxPortalProps(
  style: ThemeStyle,
  motion: string | undefined
): SandboxPortalProps {
  const props: SandboxPortalProps = {
    "data-sandbox-preview-portal": "",
    style: { ...style },
  };

  if (motion) {
    props["data-ui-motion"] = motion;
  }

  return props;
}

function isResolvedThemeMode(
  value: string | undefined
): value is ResolvedThemeMode {
  return value === "dark" || value === "light";
}

function getColorValue(
  tokenValues: Record<ColorToken, string>,
  draft: ThemeDraft,
  mode: ResolvedThemeMode,
  token: ColorToken
) {
  return draft.colorOverrides[mode][token] ?? tokenValues[token];
}

function getPreviewMotionValue(motion: ThemeDraft["motion"]) {
  return motion === "standard" ? undefined : motion;
}

function useSandboxThemeDraft() {
  const { resolvedTheme, setTheme } = useTheme();
  const [draft, setDraft] = React.useState<ThemeDraft>(() =>
    createDefaultThemeDraft()
  );
  const [tokenValues, setTokenValues] = React.useState<
    Record<ColorToken, string>
  >(fallbackTokenValues.light);
  const isFirstDraftEffect = React.useRef(true);
  const [isMounted, setIsMounted] = React.useState(false);
  const previewRef = React.useRef<HTMLElement>(null);
  const previewStyleRef = React.useRef<ThemeStyle>({});
  const portalPropsRef = React.useRef<SandboxPortalProps>({
    "data-sandbox-preview-portal": "",
    style: {},
  });
  const selectedTheme = isResolvedThemeMode(resolvedTheme)
    ? resolvedTheme
    : "light";
  const effectiveTheme =
    isMounted && isResolvedThemeMode(resolvedTheme) ? resolvedTheme : "light";

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    clearLegacyDocumentThemeStyles();
  }, []);

  React.useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setTokenValues(
        readResolvedTokenValues(fallbackTokenValues[effectiveTheme])
      );
    });

    return () => window.cancelAnimationFrame(frame);
  }, [effectiveTheme]);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);

    if (!stored) {
      return;
    }

    try {
      const nextDraft = parseStoredThemeDraft(stored);

      if (isDefaultThemeDraft(nextDraft)) {
        window.localStorage.removeItem(storageKey);
        return;
      }

      setDraft(nextDraft);
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  React.useEffect(() => {
    if (isFirstDraftEffect.current) {
      isFirstDraftEffect.current = false;
      return;
    }

    if (isDefaultThemeDraft(draft)) {
      window.localStorage.removeItem(storageKey);
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(draft));
  }, [draft]);

  const previewStyle = React.useMemo(
    () => createPreviewStyle(draft, effectiveTheme),
    [draft, effectiveTheme]
  );
  const previewMotion = getPreviewMotionValue(draft.motion);

  React.useEffect(() => {
    const style = { ...previewStyle };

    previewStyleRef.current = style;
    portalPropsRef.current = createSandboxPortalProps(style, previewMotion);
    syncPreviewStyle(previewRef.current, style);
    syncPreviewMotion(previewRef.current, previewMotion);
  }, [previewMotion, previewStyle]);

  const updateDraft = React.useCallback(
    <K extends keyof Omit<ThemeDraft, "colorOverrides">>(
      key: K,
      value: ThemeDraft[K]
    ) => {
      setDraft((current) => ({ ...current, [key]: value }));
    },
    []
  );

  const previewColor = React.useCallback(
    (token: ColorToken, value: string) => {
      const nextColor = normalizeHexColor(value);

      if (!nextColor) {
        return;
      }

      const property = cssVariableName(token);
      const overrideColor =
        nextColor === tokenValues[token] ? undefined : nextColor;
      const nextStyle = {
        ...previewStyleRef.current,
        [property]: overrideColor,
      };
      previewStyleRef.current = nextStyle;
      portalPropsRef.current = createSandboxPortalProps(
        nextStyle,
        previewMotion
      );
      setPreviewStyleProperty(previewRef.current, property, overrideColor);
    },
    [previewMotion, tokenValues]
  );

  const commitColor = React.useCallback(
    (token: ColorToken, value: string) => {
      const nextColor = normalizeHexColor(value);

      if (!nextColor) {
        return;
      }

      setDraft((current) => {
        const modeOverrides = {
          ...current.colorOverrides[effectiveTheme],
          [token]: nextColor === tokenValues[token] ? undefined : nextColor,
        };

        return {
          ...current,
          colorOverrides: {
            ...current.colorOverrides,
            [effectiveTheme]: modeOverrides,
          },
        };
      });
    },
    [effectiveTheme, tokenValues]
  );

  const reset = React.useCallback(() => {
    window.localStorage.removeItem(storageKey);
    setDraft(createDefaultThemeDraft());
  }, []);

  return {
    commitColor,
    draft,
    effectiveTheme,
    portalPropsRef,
    previewColor,
    previewMotion,
    previewRef,
    previewStyle,
    reset,
    selectedTheme,
    setTheme,
    tokenValues,
    updateDraft,
  };
}

const SandboxPortalPropsContext = React.createContext<
  React.RefObject<SandboxPortalProps> | undefined
>(undefined);

function useSandboxPortalProps() {
  return React.useContext(SandboxPortalPropsContext)?.current;
}

const fruitItems: Fruit[] = [
  { label: "Stone", value: "stone" },
  { label: "Linen", value: "linen" },
  { label: "Graphite", value: "graphite" },
  { label: "Bone", value: "bone" },
  { label: "Ash", value: "ash" },
];

const frameworkItems = [
  { label: "Next.js", value: "next" },
  { label: "Vite", value: "vite" },
  { label: "Astro", value: "astro" },
];

const commandGroups: CommandGroupData[] = [
  {
    items: [
      { label: "Open dashboard", shortcut: "D", value: "dashboard" },
      { label: "Create report", shortcut: "R", value: "report" },
    ],
    value: "Navigation",
  },
  {
    items: [
      { label: "Invite member", shortcut: "I", value: "invite" },
      { label: "Export data", shortcut: "E", value: "export" },
    ],
    value: "Actions",
  },
];

function InlineScript({ html }: { html: string }) {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
    />
  );
}

function ThemeRange({
  label,
  value,
  unit,
  onChange,
  ...props
}: {
  label: string;
  value: string;
  unit: string;
  onChange: (value: string) => void;
} & Omit<React.ComponentProps<"input">, "onChange" | "type" | "value">) {
  const id = React.useId();
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={id}>{label}</Label>
        <span className="text-muted-foreground text-xs tabular-nums">
          {value}
          {unit}
        </span>
      </div>
      <input
        className="w-full accent-foreground"
        id={id}
        type="range"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
    </div>
  );
}

const ThemeColor = React.memo(
  ({
    label,
    onCommit,
    onPreview,
    token,
    value,
  }: {
    label: string;
    onCommit: (token: ColorToken, value: string) => void;
    onPreview: (token: ColorToken, value: string) => void;
    token: ColorToken;
    value: string;
  }) => {
    const id = React.useId();
    const commitTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
      null
    );
    const swatchRef = React.useRef<HTMLSpanElement>(null);
    const valueRef = React.useRef<HTMLSpanElement>(null);

    React.useEffect(
      () => () => {
        if (commitTimeoutRef.current) {
          clearTimeout(commitTimeoutRef.current);
        }
      },
      []
    );

    function updateVisibleValue(nextValue: string) {
      if (swatchRef.current) {
        swatchRef.current.style.backgroundColor = nextValue;
      }

      if (valueRef.current) {
        valueRef.current.textContent = nextValue;
      }
    }

    function scheduleCommit(nextValue: string) {
      if (commitTimeoutRef.current) {
        clearTimeout(commitTimeoutRef.current);
      }

      commitTimeoutRef.current = setTimeout(() => {
        onCommit(token, nextValue);
      }, colorCommitDelayMs);
    }

    function commitImmediately(nextValue: string) {
      if (commitTimeoutRef.current) {
        clearTimeout(commitTimeoutRef.current);
        commitTimeoutRef.current = null;
      }

      onCommit(token, nextValue);
    }

    return (
      <div
        className="grid grid-rows-[2rem_2.25rem] gap-2"
        data-theme-color={label}
      >
        <Label className="items-start text-xs leading-4" htmlFor={id}>
          {label}
        </Label>
        <label
          className="flex h-9 cursor-pointer items-center gap-2 rounded-[8px] border border-input bg-background px-2 shadow-xs/5"
          htmlFor={id}
        >
          <span
            ref={swatchRef}
            className="size-5 rounded-[6px] border border-border"
            style={{ backgroundColor: value }}
          />
          <span
            ref={valueRef}
            className="truncate font-mono text-muted-foreground text-xs"
          >
            {value}
          </span>
          <input
            className="sr-only"
            defaultValue={value}
            id={id}
            type="color"
            onBlur={(event) => commitImmediately(event.currentTarget.value)}
            onInput={(event) => {
              const nextValue = event.currentTarget.value;
              updateVisibleValue(nextValue);
              onPreview(token, nextValue);
              scheduleCommit(nextValue);
            }}
          />
        </label>
      </div>
    );
  }
);

function ThemeEditorHeader() {
  return (
    <div>
      <h1 className="font-semibold text-lg">my-ui</h1>
      <p className="text-muted-foreground text-sm">@my-ui/ui sandbox</p>
    </div>
  );
}

function ThemeEditorControls({
  commitColor,
  draft,
  effectiveTheme,
  previewColor,
  reset,
  selectedTheme,
  setTheme,
  tokenValues,
  updateDraft,
}: {
  commitColor: (token: ColorToken, value: string) => void;
  draft: ThemeDraft;
  effectiveTheme: ResolvedThemeMode;
  previewColor: (token: ColorToken, value: string) => void;
  reset: () => void;
  selectedTheme: ResolvedThemeMode;
  setTheme: (value: string) => void;
  tokenValues: Record<ColorToken, string>;
  updateDraft: <K extends keyof Omit<ThemeDraft, "colorOverrides">>(
    key: K,
    value: ThemeDraft[K]
  ) => void;
}) {
  const themeModeValueId = React.useId();
  const modeValueScript = `(()=>{try{var t=localStorage.getItem(${JSON.stringify(
    themeModeStorageKey
  )});var m=t==="dark"||t==="light"?t:matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";var labels=${JSON.stringify(themeModeLabels)};var el=document.getElementById(${JSON.stringify(
    themeModeValueId
  )});if(el)el.textContent=labels[m]||labels.light}catch(e){}})()`;

  return (
    <>
      <div className="grid gap-3">
        <Label htmlFor="theme-mode">Mode</Label>
        <Select
          aria-label="Theme mode"
          value={selectedTheme}
          onValueChange={(value) => {
            if (value) {
              setTheme(value);
            }
          }}
          items={themeModeItems}
        >
          <SelectTrigger id="theme-mode">
            <SelectValue id={themeModeValueId} />
          </SelectTrigger>
          <SelectPopup>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
          </SelectPopup>
        </Select>
        <InlineScript html={modeValueScript} />
      </div>

      <div className="grid gap-4">
        <ThemeRange
          label="Radius"
          max="24"
          min="0"
          step="1"
          value={draft.radius}
          unit="px"
          onChange={(value) => updateDraft("radius", value)}
        />
      </div>

      <div className="grid gap-4">
        <div className="flex items-center justify-between gap-3">
          <Label>Colors</Label>
          <span className="text-muted-foreground text-xs">
            {effectiveTheme === "dark" ? "Dark" : "Light"} tokens
          </span>
        </div>
        {colorTokenGroups.map((group) => (
          <div className="grid gap-3" key={group.label}>
            <p className="font-medium text-muted-foreground text-xs">
              {group.label}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {group.tokens.map((token) => {
                const colorValue = getColorValue(
                  tokenValues,
                  draft,
                  effectiveTheme,
                  token.value
                );

                return (
                  <ThemeColor
                    key={`${effectiveTheme}-${token.value}-${colorValue}`}
                    label={token.label}
                    token={token.value}
                    value={colorValue}
                    onCommit={commitColor}
                    onPreview={previewColor}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-3">
        <Label htmlFor="theme-font">Font</Label>
        <Select
          aria-label="Font"
          value={draft.font}
          onValueChange={(value) =>
            updateDraft("font", value as ThemeDraft["font"])
          }
          items={[
            { label: "Geist", value: "geist" },
            { label: "System", value: "system" },
            { label: "Serif", value: "serif" },
          ]}
        >
          <SelectTrigger id="theme-font">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            <SelectItem value="geist">Geist</SelectItem>
            <SelectItem value="system">System</SelectItem>
            <SelectItem value="serif">Serif</SelectItem>
          </SelectPopup>
        </Select>
      </div>

      <div className="grid gap-3">
        <Label htmlFor="theme-motion">Motion</Label>
        <Select
          aria-label="Motion"
          value={draft.motion}
          onValueChange={(value) =>
            updateDraft("motion", value as ThemeDraft["motion"])
          }
          items={[
            { label: "Standard", value: "standard" },
            { label: "Reduced", value: "reduced" },
            { label: "None", value: "none" },
          ]}
        >
          <SelectTrigger id="theme-motion">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            <SelectItem value="standard">Standard</SelectItem>
            <SelectItem value="reduced">Reduced</SelectItem>
            <SelectItem value="none">None</SelectItem>
          </SelectPopup>
        </Select>
      </div>

      <Button onClick={reset} variant="outline">
        Reset tokens
      </Button>
    </>
  );
}

function ThemeEditor({
  commitColor,
  draft,
  effectiveTheme,
  previewColor,
  reset,
  selectedTheme,
  setTheme,
  tokenValues,
  updateDraft,
}: {
  commitColor: (token: ColorToken, value: string) => void;
  draft: ThemeDraft;
  effectiveTheme: ResolvedThemeMode;
  previewColor: (token: ColorToken, value: string) => void;
  reset: () => void;
  selectedTheme: ResolvedThemeMode;
  setTheme: (value: string) => void;
  tokenValues: Record<ColorToken, string>;
  updateDraft: <K extends keyof Omit<ThemeDraft, "colorOverrides">>(
    key: K,
    value: ThemeDraft[K]
  ) => void;
}) {
  const isWide = useMediaQuery("lg");
  const [sheetOpen, setSheetOpen] = React.useState(false);

  React.useEffect(() => {
    if (isWide) {
      setSheetOpen(false);
    }
  }, [isWide]);

  function renderControls() {
    return (
      <ThemeEditorControls
        commitColor={commitColor}
        draft={draft}
        effectiveTheme={effectiveTheme}
        previewColor={previewColor}
        reset={reset}
        selectedTheme={selectedTheme}
        setTheme={setTheme}
        tokenValues={tokenValues}
        updateDraft={updateDraft}
      />
    );
  }

  return (
    <>
      <Sheet onOpenChange={setSheetOpen} open={sheetOpen}>
        <div className="sticky top-0 z-40 flex items-center justify-between gap-3 border-border border-b bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
          <ThemeEditorHeader />
          <SheetTrigger
            render={<Button aria-label="Open theme editor" variant="outline" />}
          >
            <SlidersHorizontalIcon />
            Theme
          </SheetTrigger>
        </div>
        <SheetPopup className="max-w-80" side="left">
          <SheetHeader>
            <SheetTitle>Theme editor</SheetTitle>
            <SheetDescription>
              Adjust sandbox tokens and display mode.
            </SheetDescription>
          </SheetHeader>
          <SheetPanel>
            <div className="grid gap-5">{renderControls()}</div>
          </SheetPanel>
        </SheetPopup>
      </Sheet>

      <aside className="sticky top-0 hidden h-svh flex-col gap-5 overflow-auto border-border border-e bg-card/72 p-5 backdrop-blur lg:flex">
        <ThemeEditorHeader />
        {renderControls()}
      </aside>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-border border-b py-8">
      <h2 className="mb-5 font-semibold text-base">{title}</h2>
      <div className="grid gap-0 border-border border-t">{children}</div>
    </section>
  );
}

function ComponentBlock({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-4 border-border border-b py-5 md:grid-cols-[12rem_minmax(0,1fr)]">
      <div className="font-mono text-muted-foreground text-xs uppercase tracking-normal">
        {name}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function ShellHeader() {
  return (
    <header className="flex items-center justify-between border-border border-b px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex size-8 items-center justify-center border border-border bg-card">
          <LayersIcon className="size-4" />
        </div>
        <div>
          <p className="font-medium">Component sandbox</p>
          <p className="text-muted-foreground text-sm">
            Base UI primitives, Tailwind tokens, npm package exports
          </p>
        </div>
      </div>
      <div className="hidden items-center gap-2 sm:flex">
        <Badge variant="secondary">Tailwind v4</Badge>
        <Badge variant="outline">Base UI</Badge>
      </div>
    </header>
  );
}

function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button loading>Saving</Button>
      <Button size="icon" variant="outline" aria-label="Save">
        <SaveIcon />
      </Button>
    </div>
  );
}

function FormDemo() {
  return (
    <Form
      className="grid max-w-md gap-4"
      onSubmit={(event) => event.preventDefault()}
    >
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input placeholder="you@example.com" type="email" />
        <FieldDescription>Used for workspace notifications.</FieldDescription>
      </Field>
      <Field invalid>
        <FieldLabel>Handle</FieldLabel>
        <Input aria-invalid defaultValue="taken" />
        <FieldError>Use another handle.</FieldError>
      </Field>
      <Button className="w-fit" type="submit">
        Save profile
      </Button>
    </Form>
  );
}

function SelectionDemo() {
  return (
    <div className="grid max-w-lg gap-5 md:grid-cols-2">
      <Field>
        <FieldLabel>Checkbox</FieldLabel>
        <Label className="flex items-center gap-2">
          <Checkbox defaultChecked />
          Analytics
        </Label>
      </Field>
      <Field>
        <FieldLabel>Switch</FieldLabel>
        <Label className="flex items-center gap-2">
          <Switch defaultChecked />
          Sync
        </Label>
      </Field>
      <Field>
        <FieldLabel>Checkbox Group</FieldLabel>
        <CheckboxGroup defaultValue={["reports"]}>
          <Label className="flex items-center gap-2">
            <Checkbox value="reports" />
            Reports
          </Label>
          <Label className="flex items-center gap-2">
            <Checkbox value="billing" />
            Billing
          </Label>
        </CheckboxGroup>
      </Field>
      <Field>
        <FieldLabel>Radio Group</FieldLabel>
        <RadioGroup defaultValue="weekly">
          <Label className="flex items-center gap-2">
            <Radio value="daily" />
            Daily
          </Label>
          <Label className="flex items-center gap-2">
            <Radio value="weekly" />
            Weekly
          </Label>
        </RadioGroup>
      </Field>
    </div>
  );
}

function SelectDemo() {
  const portalProps = useSandboxPortalProps();

  return (
    <Select defaultValue="next" items={frameworkItems} aria-label="Framework">
      <SelectTrigger className="max-w-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectPopup portalProps={portalProps}>
        {frameworkItems.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectPopup>
    </Select>
  );
}

function AutocompleteDemo() {
  const portalProps = useSandboxPortalProps();

  return (
    <Autocomplete items={fruitItems}>
      <AutocompleteInput
        aria-label="Search tokens"
        placeholder="Search tokens..."
        showClear
        showTrigger
      />
      <AutocompletePopup portalProps={portalProps}>
        <AutocompleteEmpty>No tokens found.</AutocompleteEmpty>
        <AutocompleteList>
          {(item: Fruit) => (
            <AutocompleteItem key={item.value} value={item}>
              {item.label}
            </AutocompleteItem>
          )}
        </AutocompleteList>
      </AutocompletePopup>
    </Autocomplete>
  );
}

function ComboboxDemo() {
  const portalProps = useSandboxPortalProps();

  return (
    <Combobox items={fruitItems}>
      <ComboboxInput aria-label="Select tone" placeholder="Select tone..." />
      <ComboboxPopup portalProps={portalProps}>
        <ComboboxEmpty>No tones found.</ComboboxEmpty>
        <ComboboxList>
          {(item: Fruit) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  );
}

function CommandDemo() {
  const [open, setOpen] = React.useState(false);
  const portalProps = useSandboxPortalProps();

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogTrigger render={<Button variant="outline" />}>
        Open command
        <Kbd>J</Kbd>
      </CommandDialogTrigger>
      <CommandDialogPopup portalProps={portalProps}>
        <Command items={commandGroups}>
          <CommandInput placeholder="Search..." />
          <CommandPanel>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList>
              {(group: CommandGroupData) => (
                <React.Fragment key={group.value}>
                  <CommandGroup items={group.items}>
                    <CommandGroupLabel>{group.value}</CommandGroupLabel>
                    <CommandCollection>
                      {(item: CommandItemData) => (
                        <CommandItem
                          key={item.value}
                          onClick={() => setOpen(false)}
                          value={item.value}
                        >
                          <span className="flex-1">{item.label}</span>
                          {item.shortcut ? (
                            <CommandShortcut>{item.shortcut}</CommandShortcut>
                          ) : null}
                        </CommandItem>
                      )}
                    </CommandCollection>
                  </CommandGroup>
                  <CommandSeparator />
                </React.Fragment>
              )}
            </CommandList>
          </CommandPanel>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  );
}

function OverlayDemo() {
  const portalProps = useSandboxPortalProps();

  return (
    <div className="flex flex-wrap gap-2">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          Dialog
        </DialogTrigger>
        <DialogPopup className="sm:max-w-sm" portalProps={portalProps}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Adjust profile details before saving.
            </DialogDescription>
          </DialogHeader>
          <DialogPanel>
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input defaultValue="Marlowe Stone" />
            </Field>
          </DialogPanel>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>
              Cancel
            </DialogClose>
            <DialogClose render={<Button />}>Save</DialogClose>
          </DialogFooter>
        </DialogPopup>
      </Dialog>

      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="outline" />}>
          Alert Dialog
        </AlertDialogTrigger>
        <AlertDialogPopup portalProps={portalProps}>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive project?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes it from active dashboards.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose render={<Button variant="ghost" />}>
              Cancel
            </AlertDialogClose>
            <AlertDialogClose render={<Button variant="destructive" />}>
              Archive
            </AlertDialogClose>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog>

      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>Sheet</SheetTrigger>
        <SheetPopup portalProps={portalProps} side="right">
          <SheetHeader>
            <SheetTitle>Project settings</SheetTitle>
            <SheetDescription>Review workspace controls.</SheetDescription>
          </SheetHeader>
          <SheetPanel>
            <Textarea defaultValue="Internal design system sandbox." />
          </SheetPanel>
          <SheetFooter>
            <SheetClose render={<Button />}>Done</SheetClose>
          </SheetFooter>
        </SheetPopup>
      </Sheet>

      <Drawer>
        <DrawerTrigger render={<Button variant="outline" />}>
          Drawer
        </DrawerTrigger>
        <DrawerSwipeArea />
        <DrawerPopup portalProps={portalProps} showBar>
          <DrawerHeader>
            <DrawerTitle>Mobile panel</DrawerTitle>
            <DrawerDescription>Drawer built on Base UI.</DrawerDescription>
          </DrawerHeader>
          <DrawerPanel>
            <p className="text-muted-foreground text-sm">
              Content can snap, scroll, and close from the edge.
            </p>
          </DrawerPanel>
          <DrawerFooter>
            <DrawerClose render={<Button />}>Close</DrawerClose>
          </DrawerFooter>
        </DrawerPopup>
      </Drawer>
    </div>
  );
}

function FloatingDemo() {
  const portalProps = useSandboxPortalProps();

  return (
    <div className="flex flex-wrap gap-2">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          Popover
        </PopoverTrigger>
        <PopoverPopup className="max-w-64 gap-3" portalProps={portalProps}>
          <PopoverTitle>Token details</PopoverTitle>
          <PopoverDescription>
            Popovers inherit the active token set.
          </PopoverDescription>
          <PopoverClose className={buttonVariants({ size: "sm" })}>
            Close
          </PopoverClose>
        </PopoverPopup>
      </Popover>

      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>
          Tooltip
        </TooltipTrigger>
        <TooltipPopup portalProps={portalProps}>
          Neutral, sharp, tokenized.
        </TooltipPopup>
      </Tooltip>

      <PreviewCard>
        <PreviewCardTrigger className="inline-flex h-9 items-center border border-input px-3 text-sm underline-offset-4 hover:underline">
          Preview card
        </PreviewCardTrigger>
        <PreviewCardPopup className="max-w-72" portalProps={portalProps}>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>UI</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">my-ui package</p>
                <p className="text-muted-foreground text-xs">
                  Base UI + Tailwind
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Rich hover previews compose with any trigger.
            </p>
          </div>
        </PreviewCardPopup>
      </PreviewCard>
    </div>
  );
}

function MenuDemo() {
  const portalProps = useSandboxPortalProps();

  return (
    <div className="flex flex-wrap gap-2">
      <Menu>
        <MenuTrigger render={<Button variant="outline" />}>Menu</MenuTrigger>
        <MenuPopup portalProps={portalProps}>
          <MenuGroup>
            <MenuGroupLabel>Playback</MenuGroupLabel>
            <MenuItem>
              <PlayIcon />
              Play
              <MenuShortcut>P</MenuShortcut>
            </MenuItem>
            <MenuItem>
              <PauseIcon />
              Pause
            </MenuItem>
          </MenuGroup>
          <MenuSeparator />
          <MenuCheckboxItem>Shuffle</MenuCheckboxItem>
          <MenuSub>
            <MenuSubTrigger>More</MenuSubTrigger>
            <MenuSubPopup portalProps={portalProps}>
              <MenuItem>Duplicate</MenuItem>
              <MenuItem variant="destructive">
                <TrashIcon />
                Delete
              </MenuItem>
            </MenuSubPopup>
          </MenuSub>
          <MenuSeparator />
          <MenuRadioGroup defaultValue="name">
            <MenuRadioItem value="name">Name</MenuRadioItem>
            <MenuRadioItem value="date">Date</MenuRadioItem>
          </MenuRadioGroup>
        </MenuPopup>
      </Menu>

      <ContextMenu>
        <ContextMenuTrigger className="flex h-9 min-w-44 items-center justify-center border border-dashed text-muted-foreground text-sm">
          Context menu target
        </ContextMenuTrigger>
        <ContextMenuPopup portalProps={portalProps}>
          <ContextMenuItem>Back</ContextMenuItem>
          <ContextMenuItem>Forward</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Reload</ContextMenuItem>
        </ContextMenuPopup>
      </ContextMenu>
    </div>
  );
}

function DatePickerDemo() {
  const portalProps = useSandboxPortalProps();
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2026, 5, 24)
  );
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button className="w-72 justify-start text-left" variant="outline" />
        }
      >
        <CalendarIcon />
        {date ? format(date, "PPP") : "Pick a date"}
      </PopoverTrigger>
      <PopoverPopup
        align="start"
        className="w-auto p-0"
        portalProps={portalProps}
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={(nextDate) => {
            setDate(nextDate);

            if (nextDate) {
              setOpen(false);
            }
          }}
        />
      </PopoverPopup>
    </Popover>
  );
}

function ContentDemo() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Revenue</CardTitle>
          <CardDescription>Quarterly recurring revenue</CardDescription>
        </CardHeader>
        <CardPanel>
          <p className="font-semibold text-2xl">$48,240</p>
        </CardPanel>
        <CardFooter className="text-muted-foreground text-sm">
          Updated 2 minutes ago
        </CardFooter>
      </Card>

      <Frame>
        <FrameHeader>
          <FrameTitle>Frame</FrameTitle>
          <FrameDescription>Constrained surface</FrameDescription>
        </FrameHeader>
        <FramePanel>
          <p className="text-muted-foreground text-sm">
            Use frames for focused content previews.
          </p>
        </FramePanel>
        <FrameFooter>
          <Button size="sm" variant="outline">
            Inspect
          </Button>
        </FrameFooter>
      </Frame>
    </div>
  );
}

function NavigationDemo() {
  return (
    <div className="grid gap-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Sandbox</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

function DisclosureDemo() {
  const [open, setOpen] = React.useState(true);
  return (
    <div className="grid gap-4">
      <Accordion defaultValue={["tokens"]}>
        <AccordionItem value="tokens">
          <AccordionTrigger>Design tokens</AccordionTrigger>
          <AccordionPanel>
            Radius, colors, font, and motion are live CSS variables.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="package">
          <AccordionTrigger>Package exports</AccordionTrigger>
          <AccordionPanel>
            Components are path-exported for npm consumers.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger render={<Button variant="outline" />}>
          {open ? "Hide" : "Show"} release notes
        </CollapsibleTrigger>
        <CollapsiblePanel className="mt-3">
          <div className="border border-border p-3 text-muted-foreground text-sm">
            The sandbox persists token changes to localStorage only.
          </div>
        </CollapsiblePanel>
      </Collapsible>
    </div>
  );
}

function DataDemo() {
  return (
    <Table variant="card">
      <TableCaption>Component coverage snapshot</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Area</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Count</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Inputs</TableCell>
          <TableCell>
            <Badge variant="secondary">Ready</Badge>
          </TableCell>
          <TableCell className="text-right">12</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Overlays</TableCell>
          <TableCell>
            <Badge variant="secondary">Ready</Badge>
          </TableCell>
          <TableCell className="text-right">10</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function StatusDemo() {
  return (
    <div className="grid max-w-lg gap-4">
      <Progress value={64}>
        <div className="flex items-center justify-between">
          <ProgressLabel>Build</ProgressLabel>
          <ProgressValue />
        </div>
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      </Progress>
      <Meter value={72}>
        <div className="flex items-center justify-between">
          <MeterLabel>Usage</MeterLabel>
          <MeterValue />
        </div>
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>
      <div className="flex items-center gap-3">
        <Spinner />
        <Skeleton className="h-8 w-48" />
      </div>
    </div>
  );
}

function NumericDemo() {
  return (
    <div className="grid max-w-lg gap-4">
      <NumberField defaultValue={12}>
        <NumberFieldScrubArea label="Seats" />
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>

      <Slider defaultValue={42}>
        <div className="mb-2 flex items-center justify-between">
          <Label>Opacity</Label>
          <SliderValue />
        </div>
      </Slider>

      <OTPField aria-label="One-time password" length={6}>
        {[0, 1, 2].map((index) => (
          <OTPFieldInput key={index} />
        ))}
        <OTPFieldSeparator />
        {[3, 4, 5].map((index) => (
          <OTPFieldInput key={index} />
        ))}
      </OTPField>
    </div>
  );
}

function ActionDemo() {
  return (
    <div className="grid gap-4">
      <ToggleGroup defaultValue={["bold"]} multiple variant="outline">
        <ToggleGroupItem aria-label="Bold" value="bold">
          <BoldIcon />
        </ToggleGroupItem>
        <ToggleGroupSeparator />
        <ToggleGroupItem aria-label="Italic" value="italic">
          <ItalicIcon />
        </ToggleGroupItem>
        <ToggleGroupSeparator />
        <ToggleGroupItem aria-label="Underline" value="underline">
          <UnderlineIcon />
        </ToggleGroupItem>
      </ToggleGroup>

      <div className="flex gap-2">
        <Toggle defaultPressed variant="outline">
          <StarIcon />
          Favorite
        </Toggle>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarButton
              aria-label="Bold"
              className={buttonVariants({ size: "icon-sm", variant: "ghost" })}
            >
              <BoldIcon />
            </ToolbarButton>
            <ToolbarButton
              aria-label="Italic"
              className={buttonVariants({ size: "icon-sm", variant: "ghost" })}
            >
              <ItalicIcon />
            </ToolbarButton>
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarGroup>
            <ToolbarButton
              aria-label="Save"
              className={buttonVariants({ size: "icon-sm", variant: "ghost" })}
            >
              <SaveIcon />
            </ToolbarButton>
          </ToolbarGroup>
        </Toolbar>
      </div>
    </div>
  );
}

function SidebarDemo() {
  return (
    <div className="h-[22rem] overflow-hidden border border-border">
      <SidebarProvider className="h-full !min-h-0">
        <Sidebar
          className="border-sidebar-border border-e"
          collapsible="none"
          variant="sidebar"
        >
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
                  <HomeIcon />
                  <span>Overview</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <InboxIcon />
                      <span>Inbox</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <SettingsIcon />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <UserIcon />
                  <span>Account</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="h-full min-h-0">
          <div className="flex items-center gap-2 border-border border-b p-3">
            <span className="text-muted-foreground text-sm">
              App shell preview
            </span>
          </div>
          <div className="grid gap-3 p-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-24 w-full" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

function UtilityDemo() {
  const isWide = useMediaQuery("lg");
  const { copyToClipboard, isCopied } = useCopyToClipboard();
  return (
    <div className="flex flex-wrap items-center gap-3">
      <KbdGroup>
        <Kbd>Cmd</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
      <Group>
        <GroupText>{isWide ? "Large viewport" : "Compact viewport"}</GroupText>
        <GroupSeparator />
        <Button
          size="sm"
          variant="outline"
          onClick={() => copyToClipboard("npm install @my-ui/ui")}
        >
          {isCopied ? <CheckIcon /> : <CopyIcon />}
          Copy install
        </Button>
      </Group>
    </div>
  );
}

function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          toastManager.add({
            description: "Theme tokens were saved to localStorage.",
            title: "Saved",
            type: "success",
          })
        }
        variant="outline"
      >
        Success toast
      </Button>
      <Button
        onClick={() =>
          toastManager.add({
            description: "This is a neutralized semantic warning.",
            title: "Warning",
            type: "warning",
          })
        }
        variant="outline"
      >
        Warning toast
      </Button>
    </div>
  );
}

export function Sandbox() {
  const {
    commitColor,
    draft,
    effectiveTheme,
    previewColor,
    previewRef,
    portalPropsRef,
    reset,
    selectedTheme,
    setTheme,
    tokenValues,
    updateDraft,
  } = useSandboxThemeDraft();
  const preview = React.useMemo(
    () => (
      <SandboxPortalPropsContext.Provider value={portalPropsRef}>
        <main
          ref={previewRef}
          className="min-w-0 bg-background text-foreground"
        >
          <ShellHeader />
          <div className="mx-auto max-w-6xl px-6">
            <Section title="Actions">
              <ComponentBlock name="Button">
                <ButtonDemo />
              </ComponentBlock>
              <ComponentBlock name="Toggle / Toggle Group / Toolbar">
                <ActionDemo />
              </ComponentBlock>
            </Section>

            <Section title="Inputs">
              <ComponentBlock name="Input">
                <Input className="max-w-sm" placeholder="Project name" />
              </ComponentBlock>
              <ComponentBlock name="Textarea">
                <Textarea
                  className="max-w-sm"
                  defaultValue="Textarea content"
                />
              </ComponentBlock>
              <ComponentBlock name="Input Group">
                <InputGroup className="max-w-sm">
                  <InputGroupAddon>
                    <SearchIcon />
                  </InputGroupAddon>
                  <InputGroupInput placeholder="Search" />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>Cmd K</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </ComponentBlock>
              <ComponentBlock name="Field / Form / Label">
                <FormDemo />
              </ComponentBlock>
              <ComponentBlock name="Fieldset">
                <Fieldset className="grid max-w-md gap-3 border border-border p-4">
                  <FieldsetLegend>Notifications</FieldsetLegend>
                  <SelectionDemo />
                </Fieldset>
              </ComponentBlock>
              <ComponentBlock name="Select">
                <SelectDemo />
              </ComponentBlock>
              <ComponentBlock name="Autocomplete">
                <AutocompleteDemo />
              </ComponentBlock>
              <ComponentBlock name="Combobox">
                <ComboboxDemo />
              </ComponentBlock>
              <ComponentBlock name="Number Field / Slider / OTP Field">
                <NumericDemo />
              </ComponentBlock>
            </Section>

            <Section title="Overlays">
              <ComponentBlock name="Dialog / Alert Dialog / Sheet / Drawer">
                <OverlayDemo />
              </ComponentBlock>
              <ComponentBlock name="Popover / Tooltip / Preview Card">
                <FloatingDemo />
              </ComponentBlock>
              <ComponentBlock name="Menu / Context Menu">
                <MenuDemo />
              </ComponentBlock>
              <ComponentBlock name="Command">
                <CommandDemo />
              </ComponentBlock>
            </Section>

            <Section title="Navigation and Layout">
              <ComponentBlock name="Tabs">
                <Tabs defaultValue="preview">
                  <TabsList>
                    <TabsTab value="preview">Preview</TabsTab>
                    <TabsTab value="code">Code</TabsTab>
                  </TabsList>
                  <TabsPanel value="preview">
                    <p className="pt-3 text-muted-foreground text-sm">
                      Component output.
                    </p>
                  </TabsPanel>
                  <TabsPanel value="code">
                    <p className="pt-3 font-mono text-muted-foreground text-sm">
                      npm install @my-ui/ui
                    </p>
                  </TabsPanel>
                </Tabs>
              </ComponentBlock>
              <ComponentBlock name="Accordion / Collapsible">
                <DisclosureDemo />
              </ComponentBlock>
              <ComponentBlock name="Breadcrumb / Pagination">
                <NavigationDemo />
              </ComponentBlock>
              <ComponentBlock name="Sidebar">
                <SidebarDemo />
              </ComponentBlock>
              <ComponentBlock name="Scroll Area / Separator">
                <div className="max-w-md border border-border">
                  <ScrollArea className="h-32">
                    <div className="grid gap-2 p-3">
                      {Array.from({ length: 8 }, (_, index) => (
                        <React.Fragment key={index}>
                          <p className="text-sm">Scrollable row {index + 1}</p>
                          {index < 7 ? <Separator /> : null}
                        </React.Fragment>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </ComponentBlock>
            </Section>

            <Section title="Content">
              <ComponentBlock name="Card / Frame">
                <ContentDemo />
              </ComponentBlock>
              <ComponentBlock name="Avatar / Badge / Kbd / Group">
                <UtilityDemo />
              </ComponentBlock>
              <ComponentBlock name="Alert">
                <Alert variant="info">
                  <ClipboardIcon />
                  <AlertTitle>Neutral alert</AlertTitle>
                  <AlertDescription>
                    Semantic variants use neutral tokens by default.
                  </AlertDescription>
                  <AlertAction>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </AlertAction>
                </Alert>
              </ComponentBlock>
              <ComponentBlock name="Empty">
                <Empty className="border border-border">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <FileTextIcon />
                    </EmptyMedia>
                    <EmptyTitle>No files</EmptyTitle>
                    <EmptyDescription>
                      Upload a document to start the workflow.
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <Button variant="outline">
                      <PlusIcon />
                      Add file
                    </Button>
                  </EmptyContent>
                </Empty>
              </ComponentBlock>
              <ComponentBlock name="Table">
                <DataDemo />
              </ComponentBlock>
            </Section>

            <Section title="Dates and Feedback">
              <ComponentBlock name="Calendar">
                <Calendar className="border border-border p-3" />
              </ComponentBlock>
              <ComponentBlock name="Date Picker">
                <DatePickerDemo />
              </ComponentBlock>
              <ComponentBlock name="Progress / Meter / Spinner / Skeleton">
                <StatusDemo />
              </ComponentBlock>
              <ComponentBlock name="Toast">
                <ToastDemo />
              </ComponentBlock>
            </Section>
          </div>
        </main>
      </SandboxPortalPropsContext.Provider>
    ),
    [portalPropsRef, previewRef]
  );

  return (
    <TooltipProvider>
      <ToastProvider
        portalProps={portalPropsRef.current}
        position="bottom-right"
      >
        <div className="sandbox-grid grid min-h-svh">
          <ThemeEditor
            commitColor={commitColor}
            draft={draft}
            effectiveTheme={effectiveTheme}
            previewColor={previewColor}
            reset={reset}
            selectedTheme={selectedTheme}
            setTheme={setTheme}
            tokenValues={tokenValues}
            updateDraft={updateDraft}
          />
          {preview}
        </div>
      </ToastProvider>
    </TooltipProvider>
  );
}
