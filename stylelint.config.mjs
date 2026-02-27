/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard"],
  rules: {
    // CSS Modules: composes is not a standard property
    "property-no-unknown": [true, { ignoreProperties: ["composes"] }],
    // CSS Modules: local/global pseudo-classes
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["local", "global"] },
    ],
    // CSS Modules: camelCase class names are idiomatic
    "selector-class-pattern": null,
    // Next.js / PostCSS processes string @import notation
    "import-notation": "string",
    // composes values are class names, not CSS keywords — disable case check
    "value-keyword-case": null,
    // Project deliberately groups custom properties with blank lines
    "custom-property-empty-line-before": null,
    // Formatting preferences — low value, keep flexible
    "at-rule-empty-line-before": null,
    "comment-empty-line-before": null,
  },
};
