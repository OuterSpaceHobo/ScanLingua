import { useTranslation, Trans } from 'react-i18next';
import { Contacts } from "./Contacts";
import { QRCodeSVG } from 'qrcode.react';

export function Support(props: { window?: boolean }) {
  const { t } = useTranslation();
  const inWindow = props.window;
  const DEFAULT_WALLET_ADDRESS = '0x48B0ec1f0fF08CA6BBEdC715FE2bF17F1F1788F3';
  const ethUri = `ethereum:${DEFAULT_WALLET_ADDRESS}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(DEFAULT_WALLET_ADDRESS);
    } catch (error) {
      console.error('Failed to copy address:', error);
    }
  };

  return (
    <>
      {!inWindow &&
        <p className="text-[17px] font-light my-[5px] text-justify">
          <Trans i18nKey="support.help" components={{ github: <a className="text-primary font-medium hover:text-link-hover cursor-pointer" href="https://github.com/OuterSpaceHobo/ScanLingua" target="_blank" rel="noreferrer" /> }} />
        </p>
      } 

      <p className="text-[17px] font-light my-[5px] text-justify">
        {inWindow && <><Trans i18nKey="support.thanks" components={{ name: <span className="font-medium text-text-muted" /> }} />{' '}</>}{t('support.ratePrompt')}&nbsp;
        <a className="text-primary font-medium hover:text-link-hover cursor-pointer" href="https://chromewebstore.google.com/detail/scanlingua/mkkiocfjoeoolffbpldkglpfclmdiafn?hl=en" target="_blank" rel="noreferrer">
          {t('support.leaveReview')}
        </a>
      </p>

      <p className="text-[17px] font-light my-[5px] text-justify">
        {t('support.supportDev')}
        {t('support.ethLabel')}&nbsp;
          <button className="bg-none border-none text-primary font-medium hover:text-link-hover cursor-pointer" onClick={handleCopy}>
            {t('support.copyAddress')}
          </button>
        ):
      </p>

      <div className="mt-4 flex flex-col items-center gap-2">
        <QRCodeSVG value={ethUri} size={200} level="M" />
      </div>

      {!inWindow &&
        <div className="w-full flex justify-center mt-[5px]">
          <Contacts />
        </div>
      }
    </>
  );
}
