"use client";

import { useIntlayer } from "next-intlayer";
import { useWatch, type UseFormReturn } from "react-hook-form";

import { FLEET_COLORS } from "@/lib/fleet-colors";
import type { CreateFleetInput } from "@/lib/validation/fleet";
import { cn } from "@/utils";

export interface FleetFormProps {
  form: UseFormReturn<CreateFleetInput>;
}

/** Maps our Zod issue codes to translated messages, so the client and
 * server share the same validation rules but can each render translated
 * copy for the codes. */
function useFieldErrorMessage(code?: string) {
  const content = useIntlayer("create-fleet-modal");
  if (!code) return undefined;
  if (code === "fleet_name_required") return content.errorRequired;
  if (code === "fleet_name_too_long") return content.errorTooLong;
  if (code === "fleet_description_too_long") return content.errorDescriptionTooLong;
  return code;
}

export const FleetForm = ({ form }: FleetFormProps) => {
  const content = useIntlayer("create-fleet-modal");
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = form;

  const selectedColor = useWatch({ control, name: "color" });
  const titleError = useFieldErrorMessage(errors.title?.message);
  const descriptionError = useFieldErrorMessage(errors.description?.message);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-white" htmlFor="fleet-name">
          {content.nameLabel} *
        </label>
        <input
          id="fleet-name"
          type="text"
          placeholder={content.namePlaceholder.toString()}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-primary-400 focus:outline-none"
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "fleet-name-error" : undefined}
          {...register("title")}
        />
        {titleError && (
          <p className="mt-1.5 text-xs text-danger" id="fleet-name-error" role="alert">
            {titleError}
          </p>
        )}
      </div>

      <div>
        <span className="mb-2 block text-sm font-medium text-white">{content.colorLabel}</span>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={content.colorLabel.toString()}>
          {FLEET_COLORS.map(({ id, swatch }) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={selectedColor === id}
              aria-label={id}
              onClick={() => setValue("color", id, { shouldDirty: true, shouldValidate: true })}
              className={cn(
                "h-6 w-6 rounded-full ring-offset-2 ring-offset-transparent transition-all",
                selectedColor === id ? "ring-2 ring-white" : "ring-0 hover:scale-110",
              )}
              style={{ backgroundColor: swatch }}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white" htmlFor="fleet-description">
          {content.descriptionLabel}
        </label>
        <textarea
          id="fleet-description"
          rows={3}
          placeholder={content.descriptionPlaceholder.toString()}
          className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-primary-400 focus:outline-none"
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? "fleet-description-error" : undefined}
          {...register("description")}
        />
        {descriptionError && (
          <p className="mt-1.5 text-xs text-danger" id="fleet-description-error" role="alert">
            {descriptionError}
          </p>
        )}
      </div>
    </div>
  );
};
