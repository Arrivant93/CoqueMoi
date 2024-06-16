"use client";

import { useQuery } from "@tanstack/react-query";
import { getPaymentStatus } from "./actions";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import PhonePreview from "@/components/PhonePreview";
import { formatPrice } from "@/lib/utils";

const ThankYou = () => {
  const searchParams = useSearchParams();
  const commandeId = searchParams.get("commandeId") || "";

  const { data } = useQuery({
    queryKey: ["get-payment-status"],
    queryFn: async () => await getPaymentStatus({ commandeId }),
    retry: true,
    retryDelay: 500,
  });

  if (data === undefined) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">
            Chargement de votre commande...
          </h3>
          <p>Cela ne prendra pas longtemps.</p>
        </div>
      </div>
    );
  }

  if (data === false) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">
            Vérification de votre paiement...
          </h3>
          <p>Cela peut prendre un certain temps.</p>
        </div>
      </div>
    );
  }

  const { configuration, facturationAdresse, adresseLivraison, amount } = data;
  const { color } = configuration;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <p className="text-base font-medium text-primary">
            Merci de votre attention !
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Votre coque est en route !
          </h1>
          <p className="mt-2 text-base text-zinc-500">
            Nous avons reçu votre commande et sommes en train de la traiter.
          </p>

          <div className="mt-12 text-sm font-medium">
            <p className="text-zinc-900">Numéro de commande</p>
            <p className="mt-2 text-zinc-500">{commandeId}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-200">
          <div className="mt-10 flex flex-auto flex-col">
            <h4 className="font-semibold text-zinc-900">
              Vous avez fait un excellent choix !
            </h4>
            <p className="mt-2 text-sm text-zinc-600">
              Chez Coquemoi, nous pensons qu'un étui de téléphone ne doit pas
              seulement être beau, mais qu'il doit aussi durer des années. Nous
              offrons une garantie d'impression de 5 ans : Si votre étui n'est
              pas de la plus haute qualité, nous le remplacerons gratuitement.
            </p>
          </div>
        </div>

        <div className="flex space-x-6 overflow-hidden mt-4 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
          <PhonePreview
            croppedImageUrl={configuration.croppedImageUrl!}
            color={color!}
          />
        </div>

        <div>
          <div className="grid grid-cols-2 gap-x-6 py-10 text-sm">
            <div>
              <p className="font-medium text-gray-900">Adresse de livraison</p>
              <div className="mt-2 text-zinc-700">
                <address className="not-italic">
                  <span className="block">{adresseLivraison?.name}</span>
                  <span className="block">{adresseLivraison?.country}</span>
                  <span className="block">
                    {adresseLivraison?.codepostal} {adresseLivraison?.street}
                  </span>
                </address>
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-900">
                Adresse de facturation
              </p>
              <div className="mt-2 text-zinc-700">
                <address className="not-italic">
                  <span className="block">{facturationAdresse?.name}</span>
                  <span className="block">{facturationAdresse?.country}</span>
                  <span className="block">
                    {facturationAdresse?.codepostal}{" "}
                    {facturationAdresse?.street}
                  </span>
                </address>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 border-t border-zinc-200 py-10 text-sm">
            <div>
              <p className="font-medium text-zinc-900">Statut du paiement</p>
              <p className="mt-2 text-zinc-700">Payé</p>
            </div>

            <div>
              <p className="font-medium text-zinc-900">Méthode d'expédition</p>
              <p className="mt-2 text-zinc-700">
                Chronopost, délai de 7 jours ouvrables
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 border-t border-zinc-200 pt-10 text-sm">
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Sous-total</p>
            <p className="text-zinc-700">{formatPrice(amount)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Livraison</p>
            <p className="text-zinc-700">{formatPrice(0)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Total</p>
            <p className="text-zinc-700">{formatPrice(amount)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
