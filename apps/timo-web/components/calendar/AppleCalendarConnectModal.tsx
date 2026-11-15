"use client";

import { Button } from "@repo/timo-design-system/ui";
import { useTranslations } from "next-intl";
import { useId, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { AppleCalendarConnectRequest } from "@/generated/models";

import { OverlayModal } from "@/components/modal/OverlayModal";
import { APPLE_CALENDAR_AUTH_ERROR } from "@/constants/calendar";
import { useConnectAppleCalendar } from "@/hooks/calendar/use-connect-apple-calendar";
import { ApiError } from "@/http/api-error";

interface AppleCalendarConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExited: () => void;
}

const appleIdSchema = z.email();
const inputClassName =
  "typo-headline-r-14 text-timo-black border-timo-gray-500 focus-visible:border-timo-blue-300 w-full rounded-[4px] border px-3 py-2 outline-hidden disabled:bg-timo-gray-200";

export const AppleCalendarConnectModal = ({
  isOpen,
  onClose,
  onExited,
}: AppleCalendarConnectModalProps) => {
  const t = useTranslations("AppleCalendar");
  const id = useId();
  const connectAppleCalendar = useConnectAppleCalendar();
  const isRequestPending = useRef(false);
  const {
    register,
    handleSubmit,
    resetField,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AppleCalendarConnectRequest>({
    defaultValues: { appleId: "", appPassword: "" },
  });

  const handleClose = () => {
    if (isRequestPending.current) return;
    resetField("appPassword");
    onClose();
  };

  const handleConnect = async (values: AppleCalendarConnectRequest) => {
    if (isRequestPending.current || !isOpen) return;
    isRequestPending.current = true;

    try {
      await connectAppleCalendar(values);
      resetField("appPassword");
      onClose();
    } catch (error) {
      const code = error instanceof ApiError ? error.errorCode : undefined;
      if (code === APPLE_CALENDAR_AUTH_ERROR) {
        resetField("appPassword");
        setError("appPassword", { message: t("invalidCredentials") });
      } else {
        setError("root", {
          message: t(
            code === "APPLE_CALENDAR_409"
              ? "alreadyConnected"
              : "connectFailed",
          ),
        });
      }
    } finally {
      isRequestPending.current = false;
    }
  };

  return (
    <OverlayModal
      isOpen={isOpen}
      onClose={handleClose}
      onExited={onExited}
      ariaLabel={t("connectTitle")}
      className="mx-4 w-full max-w-100 gap-4 p-4.5 md:p-5.5"
    >
      <div className="flex flex-col gap-2">
        <h2 className="typo-headline-b-18 text-timo-black">
          {t("connectTitle")}
        </h2>
        <p className="typo-headline-r-14 text-timo-gray-900">
          {t("passwordGuide")}
        </p>
        <a
          href="https://account.apple.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="typo-body-sb-12 text-timo-blue-300 w-fit underline"
        >
          {t("appleAccountLink")}
        </a>
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleConnect)}
        noValidate
      >
        <fieldset
          disabled={isSubmitting || !isOpen}
          className="flex min-w-0 flex-col gap-3"
        >
          <div className="flex flex-col gap-1">
            <label
              htmlFor={`${id}-email`}
              className="typo-headline-m-14 text-timo-gray-900"
            >
              {t("emailLabel")}
            </label>
            <input
              id={`${id}-email`}
              type="email"
              autoComplete="off"
              required
              aria-invalid={Boolean(errors.appleId)}
              aria-describedby={
                errors.appleId ? `${id}-email-error` : undefined
              }
              className={inputClassName}
              {...register("appleId", {
                setValueAs: (value: string) => value.trim(),
                validate: (value) =>
                  appleIdSchema.safeParse(value).success || t("invalidEmail"),
              })}
            />
            {errors.appleId && (
              <p
                id={`${id}-email-error`}
                role="alert"
                className="typo-body-r-12 text-timo-red"
              >
                {errors.appleId.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor={`${id}-password`}
              className="typo-headline-m-14 text-timo-gray-900"
            >
              {t("passwordLabel")}
            </label>
            <input
              id={`${id}-password`}
              type="password"
              autoComplete="off"
              required
              aria-invalid={Boolean(errors.appPassword)}
              aria-describedby={
                errors.appPassword ? `${id}-password-error` : undefined
              }
              className={inputClassName}
              {...register("appPassword", {
                setValueAs: (value: string) => value.trim(),
                required: t("passwordRequired"),
              })}
            />
            {errors.appPassword && (
              <p
                id={`${id}-password-error`}
                role="alert"
                className="typo-body-r-12 text-timo-red"
              >
                {errors.appPassword.message}
              </p>
            )}
          </div>
        </fieldset>

        {errors.root?.message && (
          <p role="alert" className="typo-body-r-12 text-timo-red">
            {errors.root.message}
          </p>
        )}
        <div className="flex gap-3">
          <Button
            variant="secondary"
            appearance="outline"
            size="m"
            className="flex-1"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            {t("cancel")}
          </Button>
          <Button
            type="submit"
            variant="primary"
            appearance="fill"
            size="m"
            className="flex-1"
            disabled={isSubmitting || !isOpen}
          >
            {t(isSubmitting ? "connecting" : "connect")}
          </Button>
        </div>
      </form>
    </OverlayModal>
  );
};
