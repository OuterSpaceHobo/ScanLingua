import { Button } from "@chakra-ui/react";
import { Contacts } from "./Contacts";
import { CenteredP, NameSpan, CenteredBox, DonationBlock } from "./Container";
import { QRCodeSVG } from 'qrcode.react';

export function Support(props: { window?: boolean }) {
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
      <CenteredP>
        Thank you for using <NameSpan>ScanLingua</NameSpan>! If you find this extension helpful, please take a moment and rate it:&nbsp;
        <Button colorScheme='teal' variant='link'>
          <a href="https://chromewebstore.google.com/detail/scanlingua/mkkiocfjoeoolffbpldkglpfclmdiafn?hl=en" target="_blank" rel="noreferrer">
            leave a review.
          </a>  
        </Button> 
      </CenteredP>

      <CenteredP>
        Or consider supporting further development
        (ETH / ERC-20&nbsp;
          <Button colorScheme='teal' onClick={handleCopy} variant='link'>
            copy address
          </Button> 
        ):
      </CenteredP>
      
      <DonationBlock>
        <QRCodeSVG value={ethUri} size={200} level="M" />
      </DonationBlock>

      {!inWindow ?  
        <CenteredBox>
          <Contacts />
        </CenteredBox> 
        : 
        null      
      }
    </>
  );
}