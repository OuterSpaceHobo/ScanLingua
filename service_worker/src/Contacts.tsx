import { useTranslation } from 'react-i18next';
import { EnvelopeIcon } from '@heroicons/react/24/solid'

export function Contacts() {
  const { t } = useTranslation();
  const iconClass = "h-[4vw] w-[4vw] text-primary";

  return (
    <div className="flex items-center gap-[1vw] mt-4 px-3 py-1 w-fit justify-center bg-surface border border-border rounded-t-[5px]">
      <p className="text-xs font-light m-[5px]">{t('contacts.madeBy')}</p>
      <a href="https://t.me/+v7OhTnrVwxBiY2Ji" target="_blank" rel="noreferrer" className="pr-[2vw]">
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.97 9.293c-.145.658-.537.818-1.084.508l-3-2.211-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.93z" />
        </svg>
      </a>
      <a href="https://github.com/OuterSpaceHobo/ScanLingua.git" target="_blank" rel="noreferrer" className="pr-[2vw]">
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      </a>
      <a href="mailto:shabalin.st@gmail.com" target="_blank" rel="noreferrer">
        <EnvelopeIcon className={iconClass} />
      </a>
    </div>
  )
}
