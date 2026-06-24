"use client";

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
  Alert,
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
  CircleAlertIcon,
  CircleCheckIcon,
  ClipboardIcon,
  CopyIcon,
  FileTextIcon,
  InfoIcon,
  ItalicIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
  SaveIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  StarIcon,
  TrashIcon,
  TriangleAlertIcon,
  UnderlineIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import {
  normalizeHexColor,
  parseThemeColorRgba,
  resolveColorToHex,
} from "./theme-color";
import { ThemeColorField } from "./theme-color-field";

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
const themeSpacingMinRem = 0.2;
const themeSpacingMaxRem = 0.35;
const themeSpacingStepRem = 0.01;
const themeRadiusMaxRem = 2;
const themeRadiusStepRem = 0.1;

const resolvedThemeModes = ["light", "dark"] as const;

const themeModeItems = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
] as const;

const themeModeLabels = {
  dark: "Dark",
  light: "Light",
} as const;

const themeFontItems = [
  { label: "Geist", value: "geist" },
  { label: "Inter", value: "inter" },
  { label: "System", value: "system" },
  { label: "Serif", value: "serif" },
  { label: "Mono", value: "mono" },
] as const;

const themeFontLabels = Object.fromEntries(
  themeFontItems.map((item) => [item.value, item.label])
) as Record<(typeof themeFontItems)[number]["value"], string>;

const themeFontValues = themeFontItems.map((item) => item.value);

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
  "data-sandbox-preview-portal": string;
  style: ThemeStyle;
};

interface ThemeDraft {
  colorOverrides: ThemeColorOverrides;
  font: (typeof themeFontItems)[number]["value"];
  radius: string;
  spacing: string;
}

const colorTokens = colorTokenGroups.flatMap((group) =>
  group.tokens.map((token) => token.value)
) as ColorToken[];

function cssVariableName(token: ColorToken) {
  return `--${token}` as const;
}

const legacyDocumentThemeProperties = [
  "--radius",
  "--font-sans",
  ...colorTokens.map((token) => `--${token}`),
];
const managedPreviewStyleProperties = [
  "--radius",
  "--spacing",
  "--font-sans",
  ...colorTokens.map((token) => cssVariableName(token)),
] as const;

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
    radius: "0",
    spacing: "0.25",
  };
}

const defaultThemeDraft = createDefaultThemeDraft();

function parseThemeRem(value: string) {
  const parsed = Number.parseFloat(value);

  return Number.isNaN(parsed) ? 0 : parsed;
}

function formatThemeRem(value: number, decimals = 2) {
  return value.toFixed(decimals);
}

function formatThemeRemLabel(value: string, decimals = 2) {
  return `${formatThemeRem(parseThemeRem(value), decimals)}rem`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function isLegacyPxThemeToken(value: string) {
  if (value.includes(".") || !/^\d+$/u.test(value)) {
    return false;
  }

  const pixels = Number.parseInt(value, 10);

  return pixels >= 4;
}

function parseStoredThemeRem(
  value: string,
  fallback: string,
  min: number,
  max: number,
  decimals: number
) {
  let rem = parseThemeRem(value);

  if (isLegacyPxThemeToken(value)) {
    rem /= 16;
  }

  if (Number.isNaN(rem)) {
    return fallback;
  }

  return formatThemeRem(clamp(rem, min, max), decimals);
}

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
  values.destructive = "#ef4444";
  values["destructive-foreground"] = mode === "dark" ? "#f87171" : "#b91c1c";
  values.info = "#3b82f6";
  values["info-foreground"] = mode === "dark" ? "#60a5fa" : "#1d4ed8";
  values.success = "#10b981";
  values["success-foreground"] = mode === "dark" ? "#34d399" : "#047857";
  values.warning = "#f59e0b";
  values["warning-foreground"] = mode === "dark" ? "#fbbf24" : "#b45309";

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
    parseThemeRem(draft.radius) === parseThemeRem(defaultThemeDraft.radius) &&
    parseThemeRem(draft.spacing) === parseThemeRem(defaultThemeDraft.spacing) &&
    !hasColorOverrides(draft.colorOverrides)
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isThemeFont(value: unknown): value is ThemeDraft["font"] {
  return (
    typeof value === "string" &&
    (themeFontValues as readonly string[]).includes(value)
  );
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

  const spacing =
    typeof parsed.spacing === "string"
      ? parseStoredThemeRem(
          parsed.spacing,
          draft.spacing,
          themeSpacingMinRem,
          themeSpacingMaxRem,
          2
        )
      : draft.spacing;
  const radius =
    typeof parsed.radius === "string"
      ? parseStoredThemeRem(
          parsed.radius,
          draft.radius,
          0,
          themeRadiusMaxRem,
          1
        )
      : draft.radius;

  return {
    colorOverrides,
    font: isThemeFont(parsed.font) ? parsed.font : draft.font,
    radius,
    spacing,
  };
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
    parseThemeColorRgba(resolveTokenColor(probe, "background")) ??
    parseThemeColorRgba(fallbackValues.background);
  const values = { ...fallbackValues };

  for (const token of colorTokens) {
    const hex = backgroundColor
      ? resolveColorToHex(resolveTokenColor(probe, token), backgroundColor)
      : null;

    if (hex) {
      values[token] = hex;
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

  document.body?.style.removeProperty("--font-sans");
}

function createPreviewStyle(
  draft: ThemeDraft,
  mode: ResolvedThemeMode,
  tokenValues: Record<ColorToken, string>
) {
  const style: ThemeStyle = {};
  const modeColorOverrides = draft.colorOverrides[mode];

  if (parseThemeRem(draft.radius) !== parseThemeRem(defaultThemeDraft.radius)) {
    style["--radius"] = `${draft.radius}rem`;
  }

  if (
    parseThemeRem(draft.spacing) !== parseThemeRem(defaultThemeDraft.spacing)
  ) {
    style["--spacing"] = `${draft.spacing}rem`;
  }

  for (const token of colorTokens) {
    style[cssVariableName(token)] =
      modeColorOverrides[token] ?? tokenValues[token];
  }

  if (draft.font === "system") {
    style["--font-sans"] = "ui-sans-serif, system-ui, sans-serif";
    style.fontFamily = "var(--font-sans)";
  } else if (draft.font === "serif") {
    style["--font-sans"] = "ui-serif, Georgia, serif";
    style.fontFamily = "var(--font-sans)";
  } else if (draft.font === "inter") {
    style["--font-sans"] =
      "var(--font-inter), ui-sans-serif, system-ui, sans-serif";
    style.fontFamily = "var(--font-sans)";
  } else if (draft.font === "mono") {
    style["--font-sans"] = "var(--font-mono), ui-monospace, monospace";
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

function createSandboxPortalProps(style: ThemeStyle): SandboxPortalProps {
  return {
    "data-sandbox-preview-portal": "",
    style: { ...style },
  };
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

function useSandboxThemeDraft() {
  const { resolvedTheme, setTheme } = useTheme();
  const [draft, setDraft] = React.useState<ThemeDraft>(() =>
    createDefaultThemeDraft()
  );
  const [tokenValues, setTokenValues] = React.useState<
    Record<ColorToken, string>
  >(fallbackTokenValues.light);
  const [areTokenValuesResolved, setAreTokenValuesResolved] =
    React.useState(false);
  const [isThemeResolved, setIsThemeResolved] = React.useState(false);
  const isFirstDraftEffect = React.useRef(true);
  const [isMounted, setIsMounted] = React.useState(false);
  const previewRef = React.useRef<HTMLElement>(null);
  const liveColorPreviewRef = React.useRef(new Map<ColorToken, string>());
  const colorPreviewEpochRef = React.useRef(0);
  const selectedTheme = isResolvedThemeMode(resolvedTheme)
    ? resolvedTheme
    : "light";
  const effectiveTheme =
    isMounted && isResolvedThemeMode(resolvedTheme) ? resolvedTheme : "light";

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (
      isThemeResolved ||
      !isMounted ||
      !isResolvedThemeMode(resolvedTheme) ||
      !areTokenValuesResolved
    ) {
      return;
    }

    setIsThemeResolved(true);
  }, [areTokenValuesResolved, isMounted, isThemeResolved, resolvedTheme]);

  React.useEffect(() => {
    clearLegacyDocumentThemeStyles();
  }, []);

  React.useEffect(() => {
    setAreTokenValuesResolved(false);

    const frame = window.requestAnimationFrame(() => {
      setTokenValues(
        readResolvedTokenValues(fallbackTokenValues[effectiveTheme])
      );
      setAreTokenValuesResolved(true);
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
    () => createPreviewStyle(draft, effectiveTheme, tokenValues),
    [draft, effectiveTheme, tokenValues]
  );
  const previewStyleRef = React.useRef(previewStyle);
  previewStyleRef.current = previewStyle;
  const portalProps = React.useMemo(
    () => createSandboxPortalProps(previewStyle),
    [previewStyle]
  );

  React.useEffect(() => {
    syncPreviewStyle(previewRef.current, previewStyle);
  }, [isThemeResolved, previewStyle]);

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
      const previewEpoch = colorPreviewEpochRef.current;
      const nextColor = normalizeHexColor(value);

      if (!nextColor) {
        return;
      }

      const property = cssVariableName(token);
      const overrideColor =
        nextColor === tokenValues[token] ? undefined : nextColor;

      const applyPreview = () => {
        if (previewEpoch !== colorPreviewEpochRef.current) {
          return;
        }

        if (overrideColor) {
          liveColorPreviewRef.current.set(token, overrideColor);
        } else {
          liveColorPreviewRef.current.delete(token);
        }

        setPreviewStyleProperty(
          previewRef.current,
          property,
          overrideColor ?? tokenValues[token]
        );
      };

      applyPreview();
    },
    [tokenValues]
  );

  const cancelColorPreview = React.useCallback((_token: ColorToken) => {
    colorPreviewEpochRef.current += 1;
    liveColorPreviewRef.current.clear();

    const restorePreviewStyle = () => {
      syncPreviewStyle(previewRef.current, previewStyleRef.current);
    };

    restorePreviewStyle();
    requestAnimationFrame(restorePreviewStyle);
  }, []);

  const commitColor = React.useCallback(
    (token: ColorToken, value: string) => {
      const nextColor = normalizeHexColor(value);

      if (!nextColor) {
        return;
      }

      liveColorPreviewRef.current.delete(token);
      colorPreviewEpochRef.current += 1;

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

  const resetColorToken = React.useCallback(
    (token: ColorToken) => {
      liveColorPreviewRef.current.delete(token);

      setDraft((current) => {
        const { [token]: _removed, ...modeOverrides } =
          current.colorOverrides[effectiveTheme];

        return {
          ...current,
          colorOverrides: {
            ...current.colorOverrides,
            [effectiveTheme]: modeOverrides,
          },
        };
      });

      setPreviewStyleProperty(
        previewRef.current,
        cssVariableName(token),
        tokenValues[token]
      );
    },
    [effectiveTheme, tokenValues]
  );

  const resetAllColorTokens = React.useCallback(() => {
    liveColorPreviewRef.current.clear();
    colorPreviewEpochRef.current += 1;

    const nextDraft = createDefaultThemeDraft();
    const nextPreviewStyle = createPreviewStyle(
      nextDraft,
      effectiveTheme,
      tokenValues
    );

    setDraft(nextDraft);

    const restorePreviewStyle = () => {
      syncPreviewStyle(previewRef.current, nextPreviewStyle);
    };

    restorePreviewStyle();
    requestAnimationFrame(restorePreviewStyle);
  }, [effectiveTheme, tokenValues]);

  return {
    areTokenValuesResolved,
    cancelColorPreview,
    commitColor,
    draft,
    effectiveTheme,
    isThemeResolved,
    portalProps,
    previewColor,
    previewRef,
    previewStyle,
    resetAllColorTokens,
    resetColorToken,
    selectedTheme,
    setTheme,
    tokenValues,
    updateDraft,
  };
}

const SandboxPortalPropsContext = React.createContext<
  SandboxPortalProps | undefined
>(undefined);

function useSandboxPortalProps() {
  return React.useContext(SandboxPortalPropsContext);
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
  inputId,
  label,
  value,
  unit,
  valueDisplayId,
  displayDecimals = 2,
  onChange,
  ...props
}: {
  inputId?: string;
  label: string;
  value: string;
  unit: string;
  valueDisplayId?: string;
  displayDecimals?: number;
  onChange: (value: string) => void;
} & Omit<React.ComponentProps<"input">, "onChange" | "id" | "type" | "value">) {
  const generatedInputId = React.useId();
  const id = inputId ?? generatedInputId;

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={id}>{label}</Label>
        <span
          className="text-muted-foreground text-xs tabular-nums"
          id={valueDisplayId}
          suppressHydrationWarning={valueDisplayId !== undefined}
        >
          {unit === "rem"
            ? formatThemeRemLabel(value, displayDecimals)
            : `${value}${unit}`}
        </span>
      </div>
      <input
        className="w-full accent-foreground"
        id={id}
        suppressHydrationWarning={inputId !== undefined}
        type="range"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
    </div>
  );
}

function ThemeColorSkeleton({ label }: { label: string }) {
  return (
    <div className="grid gap-2" data-theme-color={label}>
      <Label className="text-xs leading-4">{label}</Label>
      <Skeleton className="h-10 w-full rounded-[8px] sm:h-9" />
    </div>
  );
}

const ThemeColor = React.memo(
  ({
    defaultValue,
    isModified,
    label,
    onCancelPreview,
    onCommit,
    onPreview,
    onReset,
    token,
    value,
  }: {
    defaultValue: string;
    isModified: boolean;
    label: string;
    onCancelPreview: (token: ColorToken) => void;
    onCommit: (token: ColorToken, value: string) => void;
    onPreview: (token: ColorToken, value: string) => void;
    onReset: (token: ColorToken) => void;
    token: ColorToken;
    value: string;
  }) => (
    <ThemeColorField
      defaultValue={defaultValue}
      isModified={isModified}
      label={label}
      value={value}
      onCancelPreview={() => onCancelPreview(token)}
      onCommit={(nextValue) => onCommit(token, nextValue)}
      onPreview={(nextValue) => onPreview(token, nextValue)}
      onReset={() => onReset(token)}
    />
  )
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
  areTokenValuesResolved,
  cancelColorPreview,
  commitColor,
  draft,
  effectiveTheme,
  previewColor,
  resetAllColorTokens,
  resetColorToken,
  selectedTheme,
  setTheme,
  tokenValues,
  updateDraft,
}: {
  areTokenValuesResolved: boolean;
  cancelColorPreview: (token: ColorToken) => void;
  commitColor: (token: ColorToken, value: string) => void;
  draft: ThemeDraft;
  effectiveTheme: ResolvedThemeMode;
  previewColor: (token: ColorToken, value: string) => void;
  resetAllColorTokens: () => void;
  resetColorToken: (token: ColorToken) => void;
  selectedTheme: ResolvedThemeMode;
  setTheme: (value: string) => void;
  tokenValues: Record<ColorToken, string>;
  updateDraft: <K extends keyof Omit<ThemeDraft, "colorOverrides">>(
    key: K,
    value: ThemeDraft[K]
  ) => void;
}) {
  const themeModeValueId = React.useId();
  const themeFontValueId = React.useId();
  const themeRadiusValueId = React.useId();
  const themeRadiusInputId = React.useId();
  const themeSpacingValueId = React.useId();
  const themeSpacingInputId = React.useId();
  const normalizeStoredRem = `function(v,d,min,max,decimals){var n=parseFloat(v);if(isNaN(n))return d;if(String(v).indexOf(".")===-1&&/^\\d+$/.test(String(v))&&n>=4)n=n/16;n=Math.min(max,Math.max(min,n));return n.toFixed(decimals)}`;
  const modeValueScript = `(()=>{try{var t=localStorage.getItem(${JSON.stringify(
    themeModeStorageKey
  )});var m=t==="dark"||t==="light"?t:matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";var labels=${JSON.stringify(themeModeLabels)};var el=document.getElementById(${JSON.stringify(
    themeModeValueId
  )});if(el)el.textContent=labels[m]||labels.light}catch(e){}})()`;
  const fontValueScript = `(()=>{try{var raw=localStorage.getItem(${JSON.stringify(
    storageKey
  )});var font="geist";var allowed=${JSON.stringify(themeFontValues)};if(raw){var p=JSON.parse(raw);if(p&&typeof p.font==="string"&&allowed.includes(p.font))font=p.font}var labels=${JSON.stringify(themeFontLabels)};var el=document.getElementById(${JSON.stringify(
    themeFontValueId
  )});if(el)el.textContent=labels[font]||labels.geist}catch(e){}})()`;
  const radiusValueScript = `(()=>{try{${normalizeStoredRem};var raw=localStorage.getItem(${JSON.stringify(
    storageKey
  )});var spacing="0.25";var radius="0";if(raw){var p=JSON.parse(raw);if(p&&typeof p.spacing==="string"&&p.spacing!=="")spacing=normalizeStoredRem(p.spacing,"0.25",${themeSpacingMinRem},${themeSpacingMaxRem},2);if(p&&typeof p.radius==="string"&&p.radius!=="")radius=normalizeStoredRem(p.radius,"0",0,${themeRadiusMaxRem},1)}var el=document.getElementById(${JSON.stringify(
    themeRadiusValueId
  )});if(el)el.textContent=radius+"rem";var input=document.getElementById(${JSON.stringify(
    themeRadiusInputId
  )});if(input)input.value=radius}catch(e){}})()`;
  const spacingValueScript = `(()=>{try{${normalizeStoredRem};var raw=localStorage.getItem(${JSON.stringify(
    storageKey
  )});var spacing="0.25";if(raw){var p=JSON.parse(raw);if(p&&typeof p.spacing==="string"&&p.spacing!=="")spacing=normalizeStoredRem(p.spacing,"0.25",${themeSpacingMinRem},${themeSpacingMaxRem},2)}var el=document.getElementById(${JSON.stringify(
    themeSpacingValueId
  )});if(el)el.textContent=spacing+"rem";var input=document.getElementById(${JSON.stringify(
    themeSpacingInputId
  )});if(input)input.value=spacing}catch(e){}})()`;

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

      <div className="grid gap-3">
        <Label htmlFor="theme-font">Font</Label>
        <Select
          aria-label="Font"
          value={draft.font}
          onValueChange={(value) =>
            updateDraft("font", value as ThemeDraft["font"])
          }
          items={themeFontItems}
        >
          <SelectTrigger id="theme-font">
            <SelectValue id={themeFontValueId} />
          </SelectTrigger>
          <SelectPopup>
            {themeFontItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
        <InlineScript html={fontValueScript} />
      </div>

      <div className="grid gap-4">
        <ThemeRange
          displayDecimals={1}
          inputId={themeRadiusInputId}
          label="Radius"
          max={String(themeRadiusMaxRem)}
          min="0"
          step={String(themeRadiusStepRem)}
          value={draft.radius}
          unit="rem"
          valueDisplayId={themeRadiusValueId}
          onChange={(value) => updateDraft("radius", value)}
        />
        <InlineScript html={radiusValueScript} />
        <ThemeRange
          inputId={themeSpacingInputId}
          label="Spacing"
          max={String(themeSpacingMaxRem)}
          min={String(themeSpacingMinRem)}
          step={String(themeSpacingStepRem)}
          value={draft.spacing}
          unit="rem"
          valueDisplayId={themeSpacingValueId}
          onChange={(value) => updateDraft("spacing", value)}
        />
        <InlineScript html={spacingValueScript} />
      </div>

      <Button onClick={resetAllColorTokens} variant="destructive">
        Reset all tokens
      </Button>

      <div aria-busy={!areTokenValuesResolved} className="grid gap-4.5">
        {colorTokenGroups.flatMap((group) =>
          group.tokens.map((token) => {
            if (!areTokenValuesResolved) {
              return (
                <ThemeColorSkeleton
                  key={`${effectiveTheme}-${token.value}-skeleton`}
                  label={token.label}
                />
              );
            }

            const colorValue = getColorValue(
              tokenValues,
              draft,
              effectiveTheme,
              token.value
            );
            const isModified = Boolean(
              draft.colorOverrides[effectiveTheme][token.value]
            );

            return (
              <ThemeColor
                key={`${effectiveTheme}-${token.value}`}
                defaultValue={tokenValues[token.value]}
                isModified={isModified}
                label={token.label}
                token={token.value}
                value={colorValue}
                onCancelPreview={cancelColorPreview}
                onCommit={commitColor}
                onPreview={previewColor}
                onReset={resetColorToken}
              />
            );
          })
        )}
      </div>
    </>
  );
}

interface ThemeEditorProps {
  areTokenValuesResolved: boolean;
  cancelColorPreview: (token: ColorToken) => void;
  commitColor: (token: ColorToken, value: string) => void;
  draft: ThemeDraft;
  effectiveTheme: ResolvedThemeMode;
  previewColor: (token: ColorToken, value: string) => void;
  resetAllColorTokens: () => void;
  resetColorToken: (token: ColorToken) => void;
  selectedTheme: ResolvedThemeMode;
  setTheme: (value: string) => void;
  tokenValues: Record<ColorToken, string>;
  updateDraft: <K extends keyof Omit<ThemeDraft, "colorOverrides">>(
    key: K,
    value: ThemeDraft[K]
  ) => void;
}

function ThemeEditorMobileBar(props: ThemeEditorProps) {
  const isWide = useMediaQuery("lg");
  const [sheetOpen, setSheetOpen] = React.useState(false);

  React.useEffect(() => {
    if (isWide) {
      setSheetOpen(false);
    }
  }, [isWide]);

  return (
    <div className="sandbox-mobile-bar sticky top-0 z-40 border-border border-b bg-background/95 backdrop-blur lg:hidden">
      <Sheet onOpenChange={setSheetOpen} open={sheetOpen}>
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <ThemeEditorHeader />
          <SheetTrigger
            render={<Button aria-label="Open theme editor" variant="outline" />}
          >
            <SlidersHorizontalIcon />
            Theme
          </SheetTrigger>
        </div>
        <SheetPopup className="max-w-72" side="left">
          <SheetHeader className="px-5 pb-3 pe-10 pt-5">
            <SheetTitle>Theme Editor</SheetTitle>
            <SheetDescription>
              Adjust the theme of the sandbox.
            </SheetDescription>
          </SheetHeader>
          <SheetPanel className="px-5 pb-5 pt-1">
            <div className="grid gap-5">
              <ThemeEditorControls {...props} />
            </div>
          </SheetPanel>
        </SheetPopup>
      </Sheet>
    </div>
  );
}

function ThemeEditor(props: ThemeEditorProps) {
  return (
    <div className="sandbox-sidebar hidden lg:block">
      <aside className="flex h-svh max-h-svh min-h-0 flex-col gap-5 overflow-x-hidden overflow-y-auto border-border border-e bg-card/72 p-5 backdrop-blur">
        <ThemeEditorHeader />
        <ThemeEditorControls {...props} />
      </aside>
    </div>
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

function ThemeColorSwatch({
  label,
  portalProps,
  token,
}: {
  label: string;
  portalProps?: SandboxPortalProps;
  token: ColorToken;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        delay={0}
        render={
          <span
            aria-label={label}
            className="inline-block size-10 shrink-0 rounded-sm border border-black"
            role="img"
            style={{ backgroundColor: `var(${cssVariableName(token)})` }}
          />
        }
      />
      <TooltipPopup portalProps={portalProps}>{label}</TooltipPopup>
    </Tooltip>
  );
}

function ThemeColorPalette({
  areTokenValuesResolved,
}: {
  areTokenValuesResolved: boolean;
}) {
  const portalProps = useSandboxPortalProps();

  return (
    <Section title="Colors">
      <TooltipProvider closeDelay={0} delay={0}>
        <div className="grid gap-5 py-5">
          {colorTokenGroups.map((group) => (
            <div className="grid gap-2" key={group.label}>
              <p className="font-mono text-muted-foreground text-xs uppercase tracking-normal">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.tokens.map((token) => {
                  if (!areTokenValuesResolved) {
                    return (
                      <Skeleton
                        className="size-10 rounded-sm"
                        key={token.value}
                      />
                    );
                  }

                  return (
                    <ThemeColorSwatch
                      key={token.value}
                      label={token.label}
                      portalProps={portalProps}
                      token={token.value}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </TooltipProvider>
    </Section>
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
            Radius, colors, and font are live CSS variables.
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

function AlertDemo() {
  return (
    <div className="grid max-w-lg gap-4">
      <Alert>
        <ClipboardIcon />
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>
          Neutral styling with muted icon color.
        </AlertDescription>
      </Alert>
      <Alert variant="info">
        <InfoIcon />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>
          Informational message using info tokens.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <CircleCheckIcon />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Confirmation that an action completed successfully.
        </AlertDescription>
      </Alert>
      <Alert variant="warning">
        <TriangleAlertIcon />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Caution about a situation that needs attention.
        </AlertDescription>
      </Alert>
      <Alert variant="error">
        <CircleAlertIcon />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong and may need correction.
        </AlertDescription>
      </Alert>
    </div>
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
    areTokenValuesResolved,
    cancelColorPreview,
    commitColor,
    draft,
    effectiveTheme,
    isThemeResolved,
    previewColor,
    previewRef,
    portalProps,
    resetAllColorTokens,
    resetColorToken,
    selectedTheme,
    setTheme,
    tokenValues,
    updateDraft,
  } = useSandboxThemeDraft();
  const preview = React.useMemo(
    () => (
      <SandboxPortalPropsContext.Provider value={portalProps}>
        <main
          ref={previewRef}
          className="min-w-0 bg-background text-foreground"
        >
          <div className="mx-auto max-w-6xl px-6">
            <ThemeColorPalette
              areTokenValuesResolved={areTokenValuesResolved}
            />
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
                <AlertDemo />
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
    [areTokenValuesResolved, portalProps, previewRef]
  );

  const themeEditorProps = {
    areTokenValuesResolved,
    cancelColorPreview,
    commitColor,
    draft,
    effectiveTheme,
    previewColor,
    resetAllColorTokens,
    resetColorToken,
    selectedTheme,
    setTheme,
    tokenValues,
    updateDraft,
  };

  return (
    <TooltipProvider>
      <ToastProvider portalProps={portalProps} position="bottom-right">
        <div className="flex min-h-svh flex-col">
          <ThemeEditorMobileBar {...themeEditorProps} />
          <div className="sandbox-grid grid min-h-0 flex-1">
            <ThemeEditor {...themeEditorProps} />
            <div className="sandbox-preview relative">
              {isThemeResolved ? (
                preview
              ) : (
                <div className="flex h-full min-h-0 items-center justify-center bg-background text-foreground">
                  <Spinner className="text-muted-foreground [&_svg]:size-6" />
                </div>
              )}
            </div>
          </div>
        </div>
      </ToastProvider>
    </TooltipProvider>
  );
}
