# API Deviations

The component APIs intentionally track Coss UI closely. Current deviations:

- Package imports use `@my-ui/ui/*` instead of `@coss/ui/*`.
- `Date Picker` is documented and demonstrated as a `Calendar` + `Popover` composition, matching the Coss docs. There is no standalone `date-picker.tsx` export.
- Theme tokens default to sharp corners, roomier spacing, and neutral light/dark palettes.
- The package is built for npm publishing instead of shadcn-style copy/paste installation.
