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

interface ThemeDraft {
  radius: string;
  spacing: string;
  background: string;
  foreground: string;
  card: string;
  primary: string;
  border: string;
  font: "geist" | "system" | "serif";
  motion: "standard" | "reduced" | "none";
}

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

const themeModeItems = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
] as const;

const themeModeLabels = {
  dark: "Dark",
  light: "Light",
  system: "System",
} as const;

const themeColorProperties = [
  "--background",
  "--card",
  "--popover",
  "--foreground",
  "--card-foreground",
  "--popover-foreground",
  "--primary",
  "--primary-foreground",
  "--border",
  "--input",
  "--ring",
] as const;

const defaultThemeDraft: ThemeDraft = {
  background: "#fbfaf7",
  border: "#d8d3c9",
  card: "#fffefd",
  font: "geist",
  foreground: "#252521",
  motion: "standard",
  primary: "#252521",
  radius: "0",
  spacing: "0.27",
};

function isDefaultThemeDraft(draft: ThemeDraft) {
  return Object.entries(defaultThemeDraft).every(
    ([key, value]) => draft[key as keyof ThemeDraft] === value
  );
}

function hasCustomThemeColors(draft: ThemeDraft) {
  return (
    draft.background !== defaultThemeDraft.background ||
    draft.foreground !== defaultThemeDraft.foreground ||
    draft.card !== defaultThemeDraft.card ||
    draft.primary !== defaultThemeDraft.primary ||
    draft.border !== defaultThemeDraft.border
  );
}

function isThemeMode(
  value: string | undefined
): value is keyof typeof themeModeLabels {
  return value === "dark" || value === "light" || value === "system";
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

function applyThemeDraft(draft: ThemeDraft) {
  const root = document.documentElement;
  const applyColors = hasCustomThemeColors(draft);
  root.style.setProperty("--radius", `${draft.radius}px`);
  root.style.setProperty("--spacing", `${draft.spacing}rem`);
  if (applyColors) {
    root.style.setProperty("--background", draft.background);
    root.style.setProperty("--card", draft.card);
    root.style.setProperty("--popover", draft.card);
    root.style.setProperty("--foreground", draft.foreground);
    root.style.setProperty("--card-foreground", draft.foreground);
    root.style.setProperty("--popover-foreground", draft.foreground);
    root.style.setProperty("--primary", draft.primary);
    root.style.setProperty(
      "--primary-foreground",
      draft.primary === "#252521" ? "#fbfaf7" : draft.background
    );
    root.style.setProperty("--border", draft.border);
    root.style.setProperty("--input", draft.border);
    root.style.setProperty("--ring", draft.primary);
  } else {
    for (const property of themeColorProperties) {
      root.style.removeProperty(property);
    }
  }
  root.dataset.uiMotion = draft.motion;

  const fontTarget = document.body;
  if (draft.font === "system") {
    root.style.setProperty(
      "--font-sans",
      "ui-sans-serif, system-ui, sans-serif"
    );
    fontTarget?.style.setProperty(
      "--font-sans",
      "ui-sans-serif, system-ui, sans-serif"
    );
  } else if (draft.font === "serif") {
    root.style.setProperty("--font-sans", "ui-serif, Georgia, serif");
    fontTarget?.style.setProperty("--font-sans", "ui-serif, Georgia, serif");
  } else {
    root.style.removeProperty("--font-sans");
    fontTarget?.style.removeProperty("--font-sans");
  }
}

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

function ThemeColor({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = React.useId();
  return (
    <div className="grid gap-2">
      <Label className="text-xs" htmlFor={id}>
        {label}
      </Label>
      <label
        className="flex h-9 cursor-pointer items-center gap-2 border border-input bg-background px-2"
        htmlFor={id}
      >
        <span
          className="size-5 border border-border"
          style={{ backgroundColor: value }}
        />
        <span className="truncate font-mono text-muted-foreground text-xs">
          {value}
        </span>
        <input
          className="sr-only"
          id={id}
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    </div>
  );
}

function ThemeEditorHeader() {
  return (
    <div>
      <h1 className="font-semibold text-lg">my-ui</h1>
      <p className="text-muted-foreground text-sm">@my-ui/ui sandbox</p>
    </div>
  );
}

function ThemeEditorControls({
  draft,
  reset,
  selectedTheme,
  setTheme,
  update,
}: {
  draft: ThemeDraft;
  reset: () => void;
  selectedTheme: keyof typeof themeModeLabels;
  setTheme: (value: string) => void;
  update: <K extends keyof ThemeDraft>(key: K, value: ThemeDraft[K]) => void;
}) {
  const themeModeValueId = React.useId();
  const modeValueScript = `(()=>{try{var t=localStorage.getItem(${JSON.stringify(
    themeModeStorageKey
  )})||"system";var labels=${JSON.stringify(themeModeLabels)};var el=document.getElementById(${JSON.stringify(
    themeModeValueId
  )});if(el)el.textContent=labels[t]||labels.system}catch(e){}})()`;

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
            <SelectItem value="system">System</SelectItem>
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
          onChange={(value) => update("radius", value)}
        />
        <ThemeRange
          label="Spacing"
          max="0.34"
          min="0.22"
          step="0.01"
          value={draft.spacing}
          unit="rem"
          onChange={(value) => update("spacing", value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <ThemeColor
          label="Background"
          value={draft.background}
          onChange={(value) => update("background", value)}
        />
        <ThemeColor
          label="Foreground"
          value={draft.foreground}
          onChange={(value) => update("foreground", value)}
        />
        <ThemeColor
          label="Surface"
          value={draft.card}
          onChange={(value) => update("card", value)}
        />
        <ThemeColor
          label="Primary"
          value={draft.primary}
          onChange={(value) => update("primary", value)}
        />
        <ThemeColor
          label="Border"
          value={draft.border}
          onChange={(value) => update("border", value)}
        />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="theme-font">Font</Label>
        <Select
          aria-label="Font"
          value={draft.font}
          onValueChange={(value) => update("font", value as ThemeDraft["font"])}
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
            update("motion", value as ThemeDraft["motion"])
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

function ThemeEditor() {
  const { theme, setTheme } = useTheme();
  const [draft, setDraft] = React.useState<ThemeDraft>(defaultThemeDraft);
  const isFirstDraftEffect = React.useRef(true);
  const selectedTheme = isThemeMode(theme) ? theme : "system";
  const isWide = useMediaQuery("lg");
  const [sheetOpen, setSheetOpen] = React.useState(false);

  React.useEffect(() => {
    if (isWide) {
      setSheetOpen(false);
    }
  }, [isWide]);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Partial<ThemeDraft>;
        const nextDraft = { ...defaultThemeDraft, ...parsed };
        if (isDefaultThemeDraft(nextDraft)) {
          window.localStorage.removeItem(storageKey);
          applyThemeDraft(defaultThemeDraft);
          return;
        }
        setDraft(nextDraft);
        applyThemeDraft(nextDraft);
      } catch {
        applyThemeDraft(defaultThemeDraft);
      }
      return;
    }
    applyThemeDraft(defaultThemeDraft);
  }, []);

  React.useEffect(() => {
    if (isFirstDraftEffect.current) {
      isFirstDraftEffect.current = false;
      return;
    }
    if (isDefaultThemeDraft(draft)) {
      window.localStorage.removeItem(storageKey);
      applyThemeDraft(draft);
      return;
    }
    window.localStorage.setItem(storageKey, JSON.stringify(draft));
    applyThemeDraft(draft);
  }, [draft]);

  function update<K extends keyof ThemeDraft>(key: K, value: ThemeDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function reset() {
    window.localStorage.removeItem(storageKey);
    setDraft(defaultThemeDraft);
  }

  function renderControls() {
    return (
      <ThemeEditorControls
        draft={draft}
        reset={reset}
        selectedTheme={selectedTheme}
        setTheme={setTheme}
        update={update}
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
  return (
    <Select defaultValue="next" items={frameworkItems} aria-label="Framework">
      <SelectTrigger className="max-w-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectPopup>
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
  return (
    <Autocomplete items={fruitItems}>
      <AutocompleteInput
        aria-label="Search tokens"
        placeholder="Search tokens..."
        showClear
        showTrigger
      />
      <AutocompletePopup>
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
  return (
    <Combobox items={fruitItems}>
      <ComboboxInput aria-label="Select tone" placeholder="Select tone..." />
      <ComboboxPopup>
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
  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogTrigger render={<Button variant="outline" />}>
        Open command
        <Kbd>J</Kbd>
      </CommandDialogTrigger>
      <CommandDialogPopup>
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
  return (
    <div className="flex flex-wrap gap-2">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          Dialog
        </DialogTrigger>
        <DialogPopup className="sm:max-w-sm">
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
        <AlertDialogPopup>
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
        <SheetPopup side="right">
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
        <DrawerPopup>
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
  return (
    <div className="flex flex-wrap gap-2">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          Popover
        </PopoverTrigger>
        <PopoverPopup className="max-w-64">
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
        <TooltipPopup>Neutral, sharp, tokenized.</TooltipPopup>
      </Tooltip>

      <PreviewCard>
        <PreviewCardTrigger className="inline-flex h-9 items-center border border-input px-3 text-sm underline-offset-4 hover:underline">
          Preview card
        </PreviewCardTrigger>
        <PreviewCardPopup className="max-w-72">
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
  return (
    <div className="flex flex-wrap gap-2">
      <Menu>
        <MenuTrigger render={<Button variant="outline" />}>Menu</MenuTrigger>
        <MenuPopup>
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
            <MenuSubPopup>
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
        <ContextMenuPopup>
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
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2026, 5, 24)
  );
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button className="w-72 justify-start text-left" variant="outline" />
        }
      >
        <CalendarIcon />
        {date ? format(date, "PPP") : "Pick a date"}
      </PopoverTrigger>
      <PopoverPopup align="start" className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} />
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
            Radius, spacing, colors, font, and motion are live CSS variables.
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
        <CollapsiblePanel className="mt-3 border border-border p-3 text-muted-foreground text-sm">
          The sandbox persists token changes to localStorage only.
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
    <div className="overflow-hidden border border-border">
      <SidebarProvider className="!min-h-[22rem]">
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
        <SidebarInset className="!min-h-[22rem]">
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
  return (
    <TooltipProvider>
      <ToastProvider position="bottom-right">
        <div className="sandbox-grid grid min-h-svh">
          <ThemeEditor />
          <main className="min-w-0">
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
                            <p className="text-sm">
                              Scrollable row {index + 1}
                            </p>
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
        </div>
      </ToastProvider>
    </TooltipProvider>
  );
}
