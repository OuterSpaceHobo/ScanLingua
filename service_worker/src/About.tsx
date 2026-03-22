import { useTranslation } from 'react-i18next';
import { Contacts } from "./Contacts";

export function About() {
    const { t } = useTranslation();

    return (
      <>
      <p className="text-[17px] font-light my-[5px] text-justify">
        {t('about.description')}
      </p>
      <p className="text-[17px] font-light my-[5px] text-justify">
        {t('about.security')}
      </p>
      <p className="text-[17px] font-light my-[5px] text-justify">
        {t('about.ocrEngine')}
      </p>
      <p className="text-[17px] font-light my-[5px] text-justify">
        {t('about.dictionaries')}
      </p>
      <div className="w-full flex justify-center mt-[5px]">
        <Contacts />
      </div>
      </>
    )
  }
