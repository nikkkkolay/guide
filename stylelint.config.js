export default {
  extends: ["stylelint-config-standard"],
  plugins: ["stylelint-order"],
  rules: {
    "order/properties-order": [
      [
        "display",
        "flex-direction",
        "justify-content",
        "align-items",
        "position",
        "top",
        "right",
        "bottom",
        "left",
        "width",
        "height",
        "padding",
        "margin",
        "font-size",
        "color",
        "background",
        "border",
      ],
      { unspecified: "bottomAlphabetical" },
    ],
  },
};
