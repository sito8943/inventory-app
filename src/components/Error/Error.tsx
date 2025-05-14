import { useTranslation } from "react-i18next";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadTear } from "@fortawesome/free-regular-svg-icons";

export default function Error() {
  const { t } = useTranslation();

  return (
    <main>
      <div className="flex flex-col items-center justify-center pt-10 gap-5">
        <FontAwesomeIcon icon={faSadTear} className="text-red-300 text-4xl" />
        <p className="text-white text-center">
          {t("_accessibility:errors.unknownError")}
        </p>
      </div>
    </main>
  );
}
