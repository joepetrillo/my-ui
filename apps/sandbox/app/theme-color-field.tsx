"use client";

import {
  Button,
  Input,
  Label,
  Popover,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@my-ui/ui";
import { cn } from "@my-ui/ui/lib/utils";
import dynamic from "next/dynamic";
import * as React from "react";

import {
  getThemeColorSwatch,
  isValidHexColor,
  resolvePickerHex,
} from "./theme-color";

const hexDigitPattern = /[^\da-f]/giu;

function normalizeHexInput(raw: string) {
  const digits = raw
    .replace(/^#/u, "")
    .replaceAll(hexDigitPattern, "")
    .slice(0, 6)
    .toLowerCase();

  return `#${digits}`;
}

// react-colorful drives its drag with window-level mouse listeners and never
// captures the pointer, so releasing a drag outside the popup lands a
// synthesized `click` on an ancestor element. Base UI's popover reads that as
// an outside press and closes — losing the in-progress color. Capturing the
// pointer to the slider keeps every move/up/click targeted inside the popup,
// so the drag stays self-contained no matter where the cursor is released.
function capturePickerPointer(event: React.PointerEvent<HTMLDivElement>) {
  const interactive = (event.target as HTMLElement).closest<HTMLElement>(
    ".react-colorful__interactive"
  );

  interactive?.setPointerCapture(event.pointerId);
}

const HexColorPicker = dynamic(
  async () => {
    const mod = await import("react-colorful");
    return mod.HexColorPicker;
  },
  {
    loading: () => (
      <div
        aria-hidden="true"
        className="h-[140px] w-full animate-pulse rounded-md bg-muted"
      />
    ),
    ssr: false,
  }
);

export const ThemeColorField = React.memo(
  ({
    defaultValue,
    isModified,
    label,
    onCancelPreview,
    onCommit,
    onPreview,
    onReset,
    value,
  }: {
    defaultValue: string;
    isModified: boolean;
    label: string;
    onCancelPreview: () => void;
    onCommit: (value: string) => void;
    onPreview: (value: string) => void;
    onReset: () => void;
    value: string;
  }) => {
    const triggerId = React.useId();
    const colorInputId = React.useId();
    const [open, setOpen] = React.useState(false);
    // While the popover is open the user edits a local draft; when it is
    // closed there is no draft and the live `value` prop is shown directly.
    const [draft, setDraft] = React.useState<string | null>(null);
    const localValue = draft ?? value;
    const committedValueRef = React.useRef(value);
    const previewFrameRef = React.useRef<number | null>(null);
    const pendingPreviewRef = React.useRef<string | null>(null);
    const previewSessionRef = React.useRef(0);
    const closeIntentRef = React.useRef<"apply" | "reset" | null>(null);

    React.useEffect(
      () => () => {
        if (previewFrameRef.current !== null) {
          cancelAnimationFrame(previewFrameRef.current);
        }
      },
      []
    );

    function clearPendingPreview() {
      if (previewFrameRef.current !== null) {
        cancelAnimationFrame(previewFrameRef.current);
        previewFrameRef.current = null;
      }

      pendingPreviewRef.current = null;
    }

    function flushPreview() {
      if (previewFrameRef.current !== null) {
        cancelAnimationFrame(previewFrameRef.current);
        previewFrameRef.current = null;
      }

      const pending = pendingPreviewRef.current;
      pendingPreviewRef.current = null;

      if (pending && isValidHexColor(pending)) {
        onPreview(pending);
      }
    }

    function schedulePreview(nextValue: string) {
      pendingPreviewRef.current = nextValue;

      if (previewFrameRef.current !== null) {
        return;
      }

      const session = previewSessionRef.current;

      previewFrameRef.current = requestAnimationFrame(() => {
        previewFrameRef.current = null;

        if (session !== previewSessionRef.current) {
          pendingPreviewRef.current = null;
          return;
        }

        const pending = pendingPreviewRef.current;
        pendingPreviewRef.current = null;

        if (pending && isValidHexColor(pending)) {
          onPreview(pending);
        }
      });
    }

    function handlePickerChange(nextValue: string) {
      const normalized = nextValue.toLowerCase();
      setDraft(normalized);
      schedulePreview(normalized);
    }

    function handleColorInputChange(nextValue: string) {
      const lower = normalizeHexInput(nextValue);
      setDraft(lower);

      if (isValidHexColor(lower)) {
        schedulePreview(lower);
      }
    }

    function commitAndClose() {
      const nextColor = localValue.trim();

      if (!isValidHexColor(nextColor)) {
        return;
      }

      flushPreview();
      previewSessionRef.current += 1;
      closeIntentRef.current = "apply";
      onCommit(nextColor);
      committedValueRef.current = nextColor;
      setDraft(nextColor);
      setOpen(false);
    }

    function dismissWithoutApply() {
      previewSessionRef.current += 1;
      clearPendingPreview();
      onCancelPreview();
      setDraft(committedValueRef.current);
    }

    function handleOpenChange(nextOpen: boolean) {
      if (nextOpen) {
        previewSessionRef.current += 1;
        setDraft(value);
        committedValueRef.current = value;
        setOpen(true);
        return;
      }

      const intent = closeIntentRef.current;
      closeIntentRef.current = null;

      if (intent === "apply" || intent === "reset") {
        setOpen(false);
        return;
      }

      dismissWithoutApply();
      setOpen(false);
    }

    const pickerColor = resolvePickerHex(localValue, value);
    const canApply = isValidHexColor(localValue);
    const triggerDisplayValue = open ? localValue : value;
    const triggerSwatchColor = open
      ? getThemeColorSwatch(localValue, value)
      : getThemeColorSwatch(value, value);
    const hasPendingChange =
      open && canApply && localValue.trim() !== value.trim();

    function handleRestoreDefault() {
      if (previewFrameRef.current !== null) {
        cancelAnimationFrame(previewFrameRef.current);
        previewFrameRef.current = null;
      }

      pendingPreviewRef.current = null;
      setDraft(defaultValue);
      committedValueRef.current = defaultValue;
      onPreview(defaultValue);
      closeIntentRef.current = "reset";
      onReset();
      previewSessionRef.current += 1;
      setOpen(false);
    }

    return (
      <div className="grid gap-2" data-theme-color={label}>
        <Label className="text-xs leading-4" htmlFor={triggerId}>
          {label}
        </Label>
        <Popover onOpenChange={handleOpenChange} open={open}>
          <PopoverTrigger
            aria-label={`${label}, ${triggerDisplayValue}`}
            className={cn(
              "flex h-10 w-full cursor-pointer items-center gap-2.5 rounded-lg border border-input bg-background px-2.5 shadow-xs/5 outline-none transition-[box-shadow,background-color,border-color] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/24 sm:h-9",
              isModified && "border-foreground/18 bg-muted/35",
              hasPendingChange && "border-foreground/18 bg-muted/35"
            )}
            id={triggerId}
          >
            <span
              aria-hidden="true"
              className={cn(
                "size-6 shrink-0 rounded-[6px] border border-border transition-colors sm:size-5",
                isModified &&
                  "ring-2 ring-foreground/12 ring-offset-1 ring-offset-background"
              )}
              style={{ backgroundColor: triggerSwatchColor }}
            />
            <span className="truncate font-mono text-muted-foreground text-xs">
              {triggerDisplayValue}
            </span>
          </PopoverTrigger>
          <PopoverPopup
            align="start"
            className="w-[min(16rem,calc(100vw-2rem))] gap-0"
          >
            <PopoverTitle className="sr-only">{label}</PopoverTitle>
            <div onPointerDownCapture={capturePickerPointer}>
              <HexColorPicker
                aria-label={`${label} color picker`}
                className="theme-color-picker w-full!"
                color={pickerColor}
                onChange={handlePickerChange}
              />
            </div>
            <div className="grid gap-2 pt-3">
              <Label className="sr-only" htmlFor={colorInputId}>
                Color
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  aria-label="Hex color value"
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  className="min-w-0 font-mono"
                  id={colorInputId}
                  maxLength={7}
                  nativeInput
                  onChange={(event) =>
                    handleColorInputChange(event.target.value)
                  }
                  placeholder="#ffffff"
                  spellCheck={false}
                  value={localValue}
                />
                <Button
                  disabled={!canApply}
                  onClick={commitAndClose}
                  type="button"
                >
                  Apply
                </Button>
              </div>
              <Button
                className="text-muted-foreground"
                onClick={handleRestoreDefault}
                type="button"
                variant="outline"
              >
                Restore default
              </Button>
            </div>
          </PopoverPopup>
        </Popover>
      </div>
    );
  }
);
