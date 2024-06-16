"use server";

import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getPaymentStatus = async ({
  commandeId,
}: {
  commandeId: string;
}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id || !user.email) {
    throw new Error("You need to be logged in to view this page.");
  }

  const commande = await db.commande.findFirst({
    where: { id: commandeId, userId: user.id },
    include: {
      facturationAdresse: true,
      configuration: true,
      adresseLivraison: true,
      user: true,
    },
  });

  if (!commande) throw new Error("Cette commande n'existe pas.");

  if (commande.isPaid) {
    return commande;
  } else {
    return false;
  }
};
