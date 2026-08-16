import { useTranslations } from "next-intl";

// 右欄 About:開場長文(左欄已交代身份,這裡展開「怎麼想」)
const AboutSection = () => {
  const t = useTranslations("about");
  const tNav = useTranslations("nav");

  return (
    <section id="about" className="scroll-mt-24">
      <p className="mb-8 text-overline uppercase text-muted lg:sr-only">
        {tNav("about")}
      </p>

      <div className="flex flex-col gap-5">
        <p className="text-body-lg">{t("intro")}</p>
        <p className="text-body text-secondary">{t("p1")}</p>
        <p className="text-body text-secondary">{t("p2")}</p>
        <p className="text-body text-secondary">{t("p3")}</p>
        <p className="text-body text-secondary">{t("p4")}</p>
      </div>
    </section>
  );
};

export default AboutSection;
