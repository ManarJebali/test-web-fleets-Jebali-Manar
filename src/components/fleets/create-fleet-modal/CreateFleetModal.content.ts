import { t, type Dictionary } from "intlayer";

const content = {
  key: "create-fleet-modal",
  content: {
    breadcrumbRoot: t({ en: "Your directory", fr: "Votre répertoire" }),
    breadcrumbFallback: t({ en: "Title", fr: "Titre" }),
    modalTitle: t({ en: "Create your fleet", fr: "Créez votre flotte" }),
    modalSubtitle: t({
      en: "Start by defining the profile of your future fleet",
      fr: "Commencez par définir le profil de votre future flotte",
    }),
    nameLabel: t({ en: "Fleet name", fr: "Nom de la flotte" }),
    namePlaceholder: t({ en: "Enter a name", fr: "Renseignez un nom" }),
    colorLabel: t({ en: "Color", fr: "Couleur" }),
    descriptionLabel: t({ en: "Description", fr: "Description" }),
    descriptionPlaceholder: t({
      en: "Enter a description of the fleet",
      fr: "Inscrivez une description sur le sujet de la flotte",
    }),
    cancelButton: t({ en: "Cancel", fr: "Annuler" }),
    submitButton: t({ en: "Create a fleet", fr: "Créer la flotte" }),
    submitButtonPending: t({ en: "Creating…", fr: "Création…" }),
    errorRequired: t({ en: "Fleet name is required", fr: "Le nom de la flotte est requis" }),
    errorTooLong: t({
      en: "Fleet name must be 80 characters or fewer",
      fr: "Le nom de la flotte ne peut pas dépasser 80 caractères",
    }),
    errorDescriptionTooLong: t({
      en: "Description must be 280 characters or fewer",
      fr: "La description ne peut pas dépasser 280 caractères",
    }),
    submitError: t({
      en: "Couldn't create the fleet. Please try again.",
      fr: "Impossible de créer la flotte. Veuillez réessayer.",
    }),
  },
} satisfies Dictionary;

export default content;
