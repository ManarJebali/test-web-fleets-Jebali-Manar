import { enu, insert, t, type Dictionary } from "intlayer";

const content = {
  key: "fleet-card",
  content: {
    previewEyebrow: t({ en: "Fleet", fr: "Flotte" }),
    optionsMenuLabel: t({ en: "Options", fr: "Options" }),
    untitledFleet: t({ en: "Untitled fleet", fr: "Flotte sans titre" }),
    companyCount: enu({
      "0": insert(t({ en: "No companies", fr: "Aucune entreprise" })),
      "1": insert(t({ en: "1 company", fr: "1 entreprise" })),
      ">=2": insert(t({ en: "{{count}} companies", fr: "{{count}} entreprises" })),
    }),
  },
} satisfies Dictionary;

export default content;
