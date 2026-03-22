import { useTranslation, Trans } from 'react-i18next';
import { Contacts } from "./Contacts";
import { LanguageSelector } from "./LanguageSelector";

export function Home() {
    const { t } = useTranslation();
    return (
    <>
      <div className="grid h-fit">
        <div className="w-full h-fit relative" style={{marginBottom: '5px'}}>
          <p className="text-[17px] font-light my-[5px] text-center">
            <Trans i18nKey="home.welcome" components={{ name: <span className="font-medium text-text-muted" /> }} />
          </p>
          <p className="text-[17px] font-light my-[5px] text-center">
            {t('home.subtitle')}
          </p>
        </div>
        <LanguageSelector />
        <div className="w-full flex justify-center mt-[5px]">
          <Contacts />
        </div>
      </div>
    </>
    )
  }
