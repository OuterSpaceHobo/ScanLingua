import { useEffect, useState } from 'react'
import { IconButton, Button, Input, InputGroup, InputRightElement, Stack } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { updateAPI } from './messages'
import { ContentBox, FormContainer, InputP } from './Container'

export function ApiInput() {
    const [show, setShow] = useState(false)
    const [validation, setValidation] = useState(false)
    const [invalid, setInvalid] = useState(false)
    const [userApi, setUserApi] = useState("");

    const handleClick = () => setShow(!show)

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        if (userApi.length === 0) {
            setInvalid(true)
            updateAPI("")
        } else {
            updateAPI(userApi)
            setValidation(true)
        }
        const timeout = setTimeout(() => {
            setValidation(false);
            setInvalid(false)
          }, 3000);
    }

    useEffect(() => {
        chrome.storage.local.get(["setApi"], (result) => {
            setUserApi(result.setApi);
            console.log("Get key is set to " + result.setApi);

            if (result.setApi === null) {
                setUserApi("")
            } else if (result.setApi === undefined) {
                setUserApi("")
            } // test
        })
    }, []);
    
    useEffect(() => {
        chrome.storage.local.set({ "setApi": userApi }).then(() => {
            console.log("Set key to " + userApi);
          });
    }, [userApi]);

    return (
        <>
        <FormContainer>
        <Stack direction='row' spacing={4} align='center' width={`390px`}>
        <InputGroup size='md'>
            <Input
            colorScheme='teal'
            pr='4.5rem'
            type={show ? 'text' : 'password'}
            placeholder='Enter API key'
            value={userApi}
            onChange={(e) => setUserApi(e.target.value)}
            />
            <InputRightElement width='4.5rem'>
            <Button colorScheme='teal' h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
            </Button>
            </InputRightElement>
        </InputGroup>
        <IconButton
            variant='outline'
            colorScheme='teal'
            aria-label='Check API'
            icon={<CheckIcon />}
            onClick={handleSubmit}
            />
        </Stack>
        <ContentBox>
            <div>
                {validation && <InputP style={{fontSize: '12px'}}>key saved, try to crop</InputP>}
                {invalid && <InputP style={{fontSize: '12px'}}>insert key</InputP>}
            </div>
        </ContentBox>
        </FormContainer>
        </>
    )
}