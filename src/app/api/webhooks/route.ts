import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import OrderReceivedEmail from "@/components/emails/OrderReceivedEmail";

 const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature");

    if (!signature) {
      return new Response("Invalid signature", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      if (!event.data.object.customer_details?.email) {
        throw new Error("Courriel de l'utilisateur manquant");
      }

      const session = event.data.object as Stripe.Checkout.Session;

      const { userId, commandeId } = session.metadata || {
        userId: null,
        commandeId: null,
      };

      if (!userId || !commandeId) {
        throw new Error("Invalid request metadata");
      }

      const facturationAdresse = session.customer_details!.address;
      const adresseLivraison = session.shipping_details!.address;

      const updatedCommande = await db.commande.update({
        where: {
          id: commandeId,
        },
        data: {
          isPaid: true,
          adresseLivraison: {
            create: {
              name: session.customer_details!.name!,
              city: adresseLivraison!.city!,
              country: adresseLivraison!.country!,
              codepostal: adresseLivraison!.postal_code!,
              street: adresseLivraison!.line1!,
              state: adresseLivraison!.state,
            },
          },
          facturationAdresse: {
            create: {
              name: session.customer_details!.name!,
              city: facturationAdresse!.city!,
              country: facturationAdresse!.country!,
              codepostal: facturationAdresse!.postal_code!,
              street: facturationAdresse!.line1!,
              state: facturationAdresse!.state,
            },
          },
        },
      });

      await resend.emails.send({
        from: "CoqueMoi <m.zeboudj@cfa-insta.fr>",
        to: [event.data.object.customer_details.email],
        subject: "Merci de votre commande!",
        react: OrderReceivedEmail({
          commandeId,
          commandeDate: updatedCommande.createdAt.toLocaleDateString(),
          // @ts-ignore
          adresseLivraison: {
            name: session.customer_details!.name!,
            city: adresseLivraison!.city!,
            country: adresseLivraison!.country!,
            codepostal: adresseLivraison!.postal_code!,
            street: adresseLivraison!.line1!,
            state: adresseLivraison!.state,
          },
        }),
      });
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { message: "Something went wrong", ok: false },
      { status: 500 }
    );
  }
}
