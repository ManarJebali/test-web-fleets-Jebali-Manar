"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useIntlayer } from "next-intlayer";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/button";
import { MODAL_IDS, Modal, useModalActions, useModalState } from "@/components/modal";
import { useCreateFleetMutation } from "@/hooks/use-fleets";
import { useTilt } from "@/hooks/use-tilt";
import { DEFAULT_FLEET_COLOR } from "@/lib/fleet-colors";
import { createFleetSchema, type CreateFleetInput } from "@/lib/validation/fleet";

import { FleetCard } from "../fleet-card";
import { FleetForm } from "./FleetForm";

const defaultValues: CreateFleetInput = {
  title: "",
  color: DEFAULT_FLEET_COLOR,
  description: "",
};

export const CreateFleetModal = () => {
  const content = useIntlayer("create-fleet-modal");
  const { openModalId } = useModalState();
  const { closeModal } = useModalActions();
  const isOpen = openModalId === MODAL_IDS.createFleet;

  const {
    ref: tiltRef,
    style: tiltStyle,
    onMouseMove: onTiltMouseMove,
    onMouseLeave: onTiltMouseLeave,
  } = useTilt<HTMLDivElement>();
  const mutation = useCreateFleetMutation();

  const form = useForm<CreateFleetInput>({
    resolver: zodResolver(createFleetSchema),
    defaultValues,
  });

  const title = useWatch({ control: form.control, name: "title" });
  const description = useWatch({ control: form.control, name: "description" });
  const color = useWatch({ control: form.control, name: "color" });

  // Reset the form (and any previous submit error) each time the modal is
  // reopened, so a closed-without-submitting draft doesn't linger.
  useEffect(() => {
    if (isOpen) {
      form.reset(defaultValues);
      mutation.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const onSubmit = form.handleSubmit((values) => {
    mutation.mutate(values, { onSuccess: () => closeModal() });
  });

  return (
    <Modal id={MODAL_IDS.createFleet} animation="scale" closeOnOverlayClick>
      <Modal.Overlay blurIntensity={10} opacity={0.6} />
      <Modal.Content size="xl" maxWidth="960px" borderRadius="1rem" padding="0">
        <div className="glassmorphism grid grid-cols-1 gap-8 rounded-2xl p-8 md:grid-cols-[minmax(0,260px)_1fr]">
          <div className="flex flex-col gap-3">
            <p className="text-xs text-white/50">
              {content.breadcrumbRoot} <span className="mx-1">›</span>
              <span className="text-white/80">{title || content.breadcrumbFallback}</span>
            </p>
            <div
              ref={tiltRef}
              onMouseMove={onTiltMouseMove}
              onMouseLeave={onTiltMouseLeave}
              style={tiltStyle}
              className="[transform-style:preserve-3d]"
            >
              <FleetCard
                variant="preview"
                title={title}
                description={description}
                color={color}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-white">{content.modalTitle}</h2>
            <p className="mb-6 mt-1 text-sm text-white/60">{content.modalSubtitle}</p>

            <form onSubmit={onSubmit} noValidate>
              <FleetForm form={form} />

              {mutation.isError && (
                <p className="mt-4 text-sm text-danger" role="alert">
                  {content.submitError}
                </p>
              )}

              <Modal.Footer align="right" className="mt-8">
                <Button
                  type="button"
                  variant="danger"
                  onClick={closeModal}
                  disabled={mutation.isPending}
                >
                  {content.cancelButton}
                </Button>
                <Button type="submit" variant="primary" size="lg" isLoading={mutation.isPending}>
                  {mutation.isPending ? content.submitButtonPending : content.submitButton}
                </Button>
              </Modal.Footer>
            </form>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};
