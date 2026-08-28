import { t, type Dictionary } from "intlayer";

const content = {
  key: "fleets-list",
  content: {
    pageTitle: t({ en: "Your fleets", fr: "Vos flottes" }),
    createFleetButton: t({ en: "Create a fleet", fr: "Créer une flotte" }),
    emptyTitle: t({ en: "No fleets yet", fr: "Aucune flotte pour le moment" }),
    emptyDescription: t({
      en: "Create your first fleet to start grouping companies together.",
      fr: "Créez votre première flotte pour commencer à regrouper des entreprises.",
    }),
    loadError: t({
      en: "Something went wrong while loading your fleets.",
      fr: "Une erreur est survenue lors du chargement de vos flottes.",
    }),
    retryButton: t({ en: "Retry", fr: "Réessayer" }),
    loadingMore: t({ en: "Loading more…", fr: "Chargement…" }),
  },
} satisfies Dictionary;

export default content;
