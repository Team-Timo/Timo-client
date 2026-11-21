"use client";

import { DeleteIcon } from "@repo/timo-design-system/icons";
import { Button } from "@repo/timo-design-system/ui";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { AppleCalendarConnectRequest } from "@/generated/models";

import { OverlayModal } from "@/components/modal/OverlayModal";
import { APPLE_CALENDAR_ERROR } from "@/constants/calendar";
import { useConnectAppleCalendar } from "@/hooks/calendar/use-connect-apple-calendar";
import { ApiError } from "@/http/api-error";

interface AppleCalendarConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExited: () => void;
}

const appleIdSchema = z.email();
const APP_PASSWORD_PATTERN = /^[a-z0-9]{4}(?:-[a-z0-9]{4}){3}$/i;
const inputClassName =
  "typo-caption-r-10 text-timo-gray-900 placeholder:text-timo-gray-700 border-timo-gray-500 focus-visible:border-timo-blue-300 aria-invalid:border-timo-red aria-invalid:focus-visible:border-timo-red block h-[35px] w-full rounded-[4px] border py-[9px] pl-[11px] outline-hidden";

export const AppleCalendarConnectModal = ({
  isOpen,
  onClose,
  onExited,
}: AppleCalendarConnectModalProps) => {
  const t = useTranslations("AppleCalendar");
  const tCommon = useTranslations("Common");
  const id = useId();
  const [isEnteringCredentials, setIsEnteringCredentials] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const connectAppleCalendar = useConnectAppleCalendar();
  const isRequestPending = useRef(false);
  const {
    register,
    handleSubmit,
    resetField,
    setError,
    setFocus,
    formState: { errors, isSubmitting, isValid },
  } = useForm<AppleCalendarConnectRequest>({
    defaultValues: { appleId: "", appPassword: "" },
    mode: "onTouched",
  });

  useEffect(() => {
    if (isEnteringCredentials && isOpen) setFocus("appleId");
  }, [isEnteringCredentials, isOpen, setFocus]);

  const handleClose = () => {
    if (isRequestPending.current) return;
    resetField("appPassword");
    setIsPasswordVisible(false);
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
      if (code === APPLE_CALENDAR_ERROR.AUTH) {
        resetField("appPassword");
        setIsPasswordVisible(false);
        setError("appPassword", { message: t("invalidCredentials") });
      } else {
        setError("root", {
          message: t(
            code === APPLE_CALENDAR_ERROR.ALREADY_CONNECTED
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
      className="mx-4 w-full max-w-[490px] gap-3 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="typo-body-sb-12 text-timo-blue-300">
          {t("connectTitle")}
        </h2>
        <button
          type="button"
          aria-label={tCommon("close")}
          onClick={handleClose}
          disabled={isSubmitting || !isOpen}
          className="focus-visible:ring-timo-blue-300 shrink-0 rounded-[4px] outline-hidden focus-visible:ring-2"
        >
          <DeleteIcon />
        </button>
      </div>

      <p className="typo-headline-m-16 text-timo-black whitespace-pre-line">
        {t("connectGuide")}
      </p>

      {isEnteringCredentials ? (
        <form onSubmit={handleSubmit(handleConnect)} noValidate>
          <fieldset
            disabled={isSubmitting || !isOpen}
            className="flex min-w-0 flex-col gap-2"
          >
            <div className="flex flex-col gap-1">
              <input
                id={`${id}-email`}
                type="email"
                aria-label={t("emailLabel")}
                placeholder={t("emailPlaceholder")}
                autoComplete="off"
                required
                aria-invalid={Boolean(errors.appleId)}
                aria-describedby={
                  errors.appleId ? `${id}-email-error` : undefined
                }
                className={`${inputClassName} bg-timo-gray-200 pr-[11px]`}
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
                  className="typo-caption-r-10 text-timo-red"
                >
                  {errors.appleId.message}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                id={`${id}-password`}
                type={isPasswordVisible ? "text" : "password"}
                aria-label={t("passwordLabel")}
                placeholder={t("passwordLabel")}
                autoComplete="off"
                required
                aria-invalid={Boolean(errors.appPassword)}
                aria-describedby={
                  errors.appPassword ? `${id}-password-error` : undefined
                }
                className={`${inputClassName} bg-white pr-11`}
                {...register("appPassword", {
                  setValueAs: (value: string) => value.trim(),
                  required: t("passwordRequired"),
                  pattern: {
                    value: APP_PASSWORD_PATTERN,
                    message: t("invalidPasswordFormat"),
                  },
                })}
              />
              <button
                type="button"
                aria-label={t(
                  isPasswordVisible ? "hidePassword" : "showPassword",
                )}
                aria-controls={`${id}-password`}
                onClick={() => setIsPasswordVisible((visible) => !visible)}
                className="focus-visible:ring-timo-blue-300 absolute top-1/2 right-3 size-6 -translate-y-1/2 rounded-[4px] outline-hidden focus-visible:ring-2"
              >
                <Image
                  src={
                    isPasswordVisible
                      ? "/images/apple-password-visible.svg"
                      : "/images/apple-password-hidden.svg"
                  }
                  alt=""
                  width={24}
                  height={24}
                  unoptimized
                />
              </button>
            </div>
          </fieldset>

          <div className="typo-caption-r-10 text-timo-red mt-2 min-h-[15px]">
            {errors.appPassword && (
              <p id={`${id}-password-error`} role="alert">
                {errors.appPassword.message}
              </p>
            )}
            {errors.root?.message && <p role="alert">{errors.root.message}</p>}
          </div>
          <div className="mt-3 flex justify-end">
            <Button
              type="submit"
              variant="primary"
              appearance="fill"
              size="m"
              className="h-[33px] w-auto min-w-[147px] px-4"
              disabled={!isValid || isSubmitting || !isOpen}
            >
              {t(isSubmitting ? "connecting" : "connect")}
            </Button>
          </div>
        </form>
      ) : (
        <>
          <ol className="typo-headline-r-14 text-timo-gray-900 w-full max-w-[395px] list-decimal pl-[21px]">
            <li>
              <a
                href="https://account.apple.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline focus-visible:underline"
              >
                {t("signInStep")}
              </a>
            </li>
            <li>{t("generatePasswordStep")}</li>
          </ol>
          <div className="flex justify-end">
            <Button
              variant="primary"
              appearance="fill"
              size="m"
              className="h-[33px] w-auto min-w-[147px] px-4"
              disabled={!isOpen}
              onClick={() => setIsEnteringCredentials(true)}
            >
              {t("hasAppPassword")}
            </Button>
          </div>
        </>
      )}
    </OverlayModal>
  );
};
