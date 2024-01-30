const lightTheme = {
  primary: "#D84727",
  secondary: "#F1DDC9",
  text: "#333333",
  textSecondary: "#666666",
  danger: "#FF4949",
  background: "#FFFFFF",
};

const darkTheme: Theme = {
  primary: "#D84727",
  secondary: "#F1DDC9",
  text: "#FFFFFF",
  textSecondary: "#666666",
  danger: "#FF4949",
  background: "#3D3D3D",
};

export type Theme = typeof lightTheme;

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
