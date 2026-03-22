import { useTranslation } from 'react-i18next';
import { Contacts } from "./Contacts";

export function Anki() {
    const { t } = useTranslation();

    return (
      <>
        <p className="text-[17px] font-light my-[5px] text-justify">
          {t('anki.description')}
        </p>
        <p className="text-[17px] font-light my-[5px] text-justify">
          {t('anki.cardInfo')}
        </p>
        <p className="text-[17px] font-light my-[5px] text-justify">
          {t('anki.enableAddon')}&nbsp;
          <a className="text-primary font-medium hover:text-link-hover cursor-pointer" href="https://ankiweb.net/shared/info/2055492159" target="_blank" rel="noreferrer">
            {t('anki.instruction')}
          </a>
        </p>
        <p className="text-[17px] font-light my-[5px] text-justify">
          {t('anki.limitation')}
        </p>
        <div className="w-full flex justify-center mt-[5px]">
          <Contacts />
        </div>
    </>
    )
  }
