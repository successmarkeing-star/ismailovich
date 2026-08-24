export type WhatsAppLanguage = "ar" | "en";

export type WhatsAppRequest = {
  name: string;
  phone: string;
  request: string;
};

export const WHATSAPP_NUMBER = "966543749292";

export function buildWhatsAppUrl(language: WhatsAppLanguage, details: WhatsAppRequest) {
  const message = language === "ar"
    ? `مرحبًا فريق الرائدة الفضية، أرغب في الاستفسار عن خدماتكم.\nالاسم: ${details.name}\nرقم التواصل: ${details.phone}\nتفاصيل الطلب: ${details.request}`
    : `Hello Silver Pioneer team, I would like to enquire about your services.\nName: ${details.name}\nContact number: ${details.phone}\nRequest details: ${details.request}`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
