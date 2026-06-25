"use client";

import {
  Button,
  Label,
  Popover,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
  SliderPrimitive,
} from "@my-ui/ui";
import { cn } from "@my-ui/ui/lib/utils";
import * as React from "react";

import {
  clampOklchToGamut,
  getThemeColorSwatch,
  isValidOklchColor,
  OKLCH_MAX_CHROMA,
  oklchToCss,
  resolvePickerOklch,
} from "./theme-color";
import type { OklchColor } from "./theme-color";

const hueGradientStops = [0, 60, 120, 180, 240, 300, 360];
const sliderTrackStops = [0, 0.25, 0.5, 0.75, 1];

function oklchGradient(stops: OklchColor[]) {
  const segments = stops
    .map((stop) => oklchToCss(clampOklchToGamut(stop)))
    .join(", ");

  return `linear-gradient(to right, ${segments})`;
}

function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
  if (event.key === "Enter") {
    event.currentTarget.blur();
  }
}

function formatChannel(value: number, max: number) {
  if (max === 360) {
    return Math.round(value).toString();
  }

  return value.toFixed(3);
}

function OklchSlider({
  background,
  label,
  max,
  onChange,
  step,
  value,
}: {
  background: string;
  label: string;
  max: number;
  onChange: (value: number) => void;
  step: number;
  value: number;
}) {
  const id = React.useId();

  return (
    <div className="grid gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <Label className="text-muted-foreground text-xs" htmlFor={id}>
          {label}
        </Label>
        <span className="font-mono text-muted-foreground text-xs tabular-nums">
          {formatChannel(value, max)}
        </span>
      </div>
      <SliderPrimitive.Root
        aria-label={label}
        id={id}
        max={max}
        min={0}
        onValueChange={(next) =>
          onChange(Array.isArray(next) ? (next[0] ?? 0) : next)
        }
        step={step}
        thumbAlignment="edge"
        value={value}
      >
        <SliderPrimitive.Control className="flex h-4 w-full touch-none select-none items-center">
          <SliderPrimitive.Track
            className="relative h-3 w-full rounded-full shadow-[inset_0_0_0_1px_var(--border)]"
            style={{ background }}
          >
            <SliderPrimitive.Thumb className="size-4 rounded-full border-2 border-foreground bg-background shadow-xs/25 outline-none transition-[scale] has-focus-visible:ring-[3px] has-focus-visible:ring-ring/24 data-dragging:scale-110" />
          </SliderPrimitive.Track>
        </SliderPrimitive.Control>
      </SliderPrimitive.Root>
    </div>
  );
}

function OklchColorPicker({
  color,
  onChange,
}: {
  color: OklchColor;
  onChange: (next: OklchColor) => void;
}) {
  const { c, h, l } = color;

  const lightnessGradient = oklchGradient(
    sliderTrackStops.map((stop) => ({ c, h, l: stop }))
  );
  const chromaGradient = oklchGradient(
    sliderTrackStops.map((stop) => ({ c: stop * OKLCH_MAX_CHROMA, h, l }))
  );
  const hueGradient = oklchGradient(
    hueGradientStops.map((hue) => ({ c: Math.max(c, 0.14), h: hue, l: 0.72 }))
  );

  return (
    <div className="grid gap-3">
      <div
        aria-hidden="true"
        className="h-12 w-full rounded-lg border border-border"
        style={{ backgroundColor: oklchToCss(color) }}
      />
      <OklchSlider
        background={lightnessGradient}
        label="Lightness"
        max={1}
        onChange={(next) => onChange({ ...color, l: next })}
        step={0.001}
        value={l}
      />
      <OklchSlider
        background={chromaGradient}
        label="Chroma"
        max={OKLCH_MAX_CHROMA}
        onChange={(next) => onChange({ ...color, c: next })}
        step={0.001}
        value={c}
      />
      <OklchSlider
        background={hueGradient}
        label="Hue"
        max={360}
        onChange={(next) => onChange({ ...color, h: next })}
        step={0.5}
        value={h}
      />
    </div>
  );
}

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
    const inputId = React.useId();
    const [open, setOpen] = React.useState(false);
    // The text box and the popover share one editable draft; when there is no
    // draft the live `value` prop is shown directly.
    const [draft, setDraft] = React.useState<string | null>(null);
    const localValue = draft ?? value;
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

      if (pending && isValidOklchColor(pending)) {
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

        if (pending && isValidOklchColor(pending)) {
          onPreview(pending);
        }
      });
    }

    function handlePickerChange(nextColor: OklchColor) {
      // Author the value the user dragged to verbatim — only lightness/chroma/hue
      // ranges bound it. Gamut clamping happens for display (gradients, swatch)
      // but must never snap the slider back, or chroma can't pass the gamut edge.
      const css = oklchToCss(nextColor);
      setDraft(css);
      schedulePreview(css);
    }

    function handleInputChange(nextValue: string) {
      setDraft(nextValue);

      if (isValidOklchColor(nextValue.trim())) {
        schedulePreview(nextValue.trim());
      }
    }

    function commitValue(rawValue: string) {
      const nextColor = rawValue.trim();

      if (!isValidOklchColor(nextColor)) {
        return false;
      }

      flushPreview();
      previewSessionRef.current += 1;
      onCommit(nextColor);
      // Drop the draft so the field tracks the freshly committed `value` again;
      // this state update batches with `onCommit`, so there is no stale frame.
      setDraft(null);
      return true;
    }

    function handleInputBlur() {
      // The popover owns its own apply/cancel lifecycle while it is open.
      if (open) {
        return;
      }

      const next = localValue.trim();

      if (isValidOklchColor(next)) {
        if (next !== value.trim()) {
          commitValue(next);
        }
        return;
      }

      // Discard an invalid manual entry and restore the committed value.
      clearPendingPreview();
      onCancelPreview();
      setDraft(null);
    }

    function commitAndClose() {
      if (!commitValue(localValue)) {
        return;
      }

      closeIntentRef.current = "apply";
      setOpen(false);
    }

    function dismissWithoutApply() {
      previewSessionRef.current += 1;
      clearPendingPreview();
      onCancelPreview();
      setDraft(null);
    }

    function handleOpenChange(nextOpen: boolean) {
      if (nextOpen) {
        previewSessionRef.current += 1;
        setDraft(value);
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

    function handleRestoreDefault() {
      clearPendingPreview();
      onPreview(defaultValue);
      closeIntentRef.current = "reset";
      onReset();
      // `onReset` makes `value` resolve back to the default, so clearing the
      // draft lets the field follow it (both updates batch together).
      setDraft(null);
      previewSessionRef.current += 1;
      setOpen(false);
    }

    const pickerColor = resolvePickerOklch(localValue, value);
    const canApply = isValidOklchColor(localValue.trim());
    const swatchColor = getThemeColorSwatch(localValue, value);

    return (
      <div className="grid gap-2" data-theme-color={label}>
        <Label className="text-xs leading-4" htmlFor={inputId}>
          {label}
        </Label>
        <div
          className={cn(
            "flex h-10 w-full items-center gap-2.5 rounded-lg border border-input bg-background px-2.5 shadow-xs/5 transition-[box-shadow,background-color,border-color] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/24 sm:h-9",
            isModified && "border-foreground/18 bg-muted/35"
          )}
        >
          <Popover onOpenChange={handleOpenChange} open={open}>
            <PopoverTrigger
              aria-label={`Edit ${label} color`}
              className={cn(
                "size-6 shrink-0 cursor-pointer rounded-[6px] border border-border outline-none transition-[box-shadow,scale] focus-visible:ring-[3px] focus-visible:ring-ring/24 sm:size-5",
                isModified &&
                  "ring-2 ring-foreground/12 ring-offset-1 ring-offset-background"
              )}
              style={{ backgroundColor: swatchColor }}
            />
            <PopoverPopup
              align="start"
              className="w-[min(17rem,calc(100vw-2rem))] gap-0"
            >
              <PopoverTitle className="sr-only">{label}</PopoverTitle>
              <OklchColorPicker
                color={pickerColor}
                onChange={handlePickerChange}
              />
              <div className="grid grid-cols-2 gap-2 pt-3">
                <Button
                  className="text-muted-foreground"
                  onClick={handleRestoreDefault}
                  type="button"
                  variant="outline"
                >
                  Restore default
                </Button>
                <Button
                  disabled={!canApply}
                  onClick={commitAndClose}
                  type="button"
                >
                  Apply
                </Button>
              </div>
            </PopoverPopup>
          </Popover>
          <input
            aria-label={`${label} oklch value`}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            className="min-w-0 flex-1 bg-transparent font-mono text-muted-foreground text-xs outline-none"
            id={inputId}
            onBlur={handleInputBlur}
            onChange={(event) => handleInputChange(event.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="oklch(0.7 0.1 250)"
            spellCheck={false}
            type="text"
            value={localValue}
          />
        </div>
      </div>
    );
  }
);
