import { AdresseLivraison } from "@prisma/client";
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

const OrderReceivedEmail = ({
  adresseLivraison,
  commandeId,
  commandeDate,
}: {
  adresseLivraison: AdresseLivraison;
  commandeId: string;
  commandeDate: string;
}) => {
  const baseUrl =
    process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://coquemoi.vercel.app"; ///adresse site

  return (
    <Html>
      <Head />
      <Preview>
        Le récapitulatif de votre commande et la date de livraison estimée
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={message}>
            <Img
              src={`${baseUrl}/bob-3.png`}
              width="65"
              height="73"
              alt="bob cadeau"
              style={{ margin: "auto" }}
            />
            <Heading style={global.heading}>
              Merci pour votre commande !
            </Heading>
            <Text style={global.text}>
              Nous préparons tout pour la livraison et vous informerons dès que
              votre colis aura été expédié. Le délai de livraison est
              généralement de 7 jours.
            </Text>
            <Text style={{ ...global.text, marginTop: 24 }}>
              Si vous avez des questions concernant votre commande, n'hésitez
              pas à nous contacter en indiquant votre numéro de commande. Nous
              sommes là pour vous aider.
            </Text>
          </Section>
          <Hr style={global.hr} />
          <Section style={global.defaultPadding}>
            <Text style={adressTitle}>Envoi à : {adresseLivraison.name}</Text>
            <Text style={{ ...global.text, fontSize: 14 }}>
              {adresseLivraison.country}, {adresseLivraison.street},{" "}
              {adresseLivraison.state} {adresseLivraison.codepostal}
            </Text>
          </Section>
          <Hr style={global.hr} />
          <Section style={global.defaultPadding}>
            <Row style={{ display: "inline-flex gap-16", marginBottom: 40 }}>
              <Column style={{ width: 170 }}>
                <Text style={global.paragraphWithBold}>Numéro de commande</Text>
                <Text style={track.number}>{commandeId}</Text>
              </Column>
              <Column style={{ marginLeft: 20 }}>
                <Text style={global.paragraphWithBold}>
                  Date de la commande
                </Text>
                <Text style={track.number}>{commandeDate}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={global.hr} />

          <Section style={paddingY}>
            <Row>
              <Text
                style={{
                  ...footer.text,
                  paddingTop: 30,
                  paddingBottom: 30,
                }}
              >
                N'hésitez pas à nous contacter si vous avez des questions. (Si
                vous répondez à cet e-mail, nous ne pourrons pas le voir).
              </Text>
            </Row>
            <Row>
              <Text style={footer.text}>
                ©CoqueMoi. Tous les droits sont réservés.
              </Text>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default OrderReceivedEmail;

const paddingX = {
  paddingLeft: "40px",
  paddingRight: "40px",
};

const paddingY = {
  paddingTop: "22px",
  paddingBottom: "22px",
};

const paragraph = {
  margin: "0",
  lineHeight: "2",
};

const global = {
  paddingX,
  paddingY,
  defaultPadding: {
    ...paddingX,
    ...paddingY,
  },
  paragraphWithBold: { ...paragraph, fontWeight: "bold" },
  heading: {
    fontSize: "32px",
    lineHeight: "1.3",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: "-1px",
  } as React.CSSProperties,
  text: {
    ...paragraph,
    color: "#747474",
    fontWeight: "500",
  },
  button: {
    border: "1px solid #929292",
    fontSize: "16px",
    textDecoration: "none",
    padding: "10px 0px",
    width: "220px",
    display: "block",
    textAlign: "center",
    fontWeight: 500,
    color: "#000",
  } as React.CSSProperties,
  hr: {
    borderColor: "#E5E5E5",
    margin: "0",
  },
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "10px auto",
  width: "600px",
  maxWidth: "100%",
  border: "1px solid #E5E5E5",
};

const track = {
  container: {
    padding: "22px 40px",
    backgroundColor: "#F7F7F7",
  },
  number: {
    margin: "12px 0 0 0",
    fontWeight: 500,
    lineHeight: "1.4",
    color: "#6F6F6F",
  },
};

const message = {
  padding: "40px 74px",
  textAlign: "center",
} as React.CSSProperties;

const adressTitle = {
  ...paragraph,
  fontSize: "15px",
  fontWeight: "bold",
};

const footer = {
  policy: {
    width: "166px",
    margin: "auto",
  },
  text: {
    margin: "0",
    color: "#AFAFAF",
    fontSize: "13px",
    textAlign: "center",
  } as React.CSSProperties,
};
