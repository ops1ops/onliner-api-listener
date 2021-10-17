import { Palette, PaletteOptions } from '@mui/material';

declare module '@mui/material/styles' {
  interface Theme {
    palette: Palette;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    palette?: PaletteOptions;
  }
}
