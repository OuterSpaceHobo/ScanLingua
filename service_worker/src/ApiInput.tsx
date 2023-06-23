import { useEffect, useState } from 'react'
import { IconButton, Button, Input, InputGroup, InputRightElement, Stack } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { updateAPI } from './messages'
import { ContentBox, FormContainer, TextP } from './Container'
import { translateZone } from '../public/fetch.js'
import { useAppSelector, useAppDispatch } from './hooks' 
import { rememberUserKey, initializeKey } from './reducers/apiKeyReducer' 
import Notification from './Notification'
import { createNotification } from './reducers/notificationReducer'

export function ApiInput() {
    const [show, setShow] = useState(false) // chakra input
    const reduxUserApi = useAppSelector((state) => state.key) 
    const dispatch = useAppDispatch()
    // console.log('reduxUserApi', reduxUserApi) // test

    const handleClick = () => setShow(!show) // chakra input

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        const valid = await translateZone('テスト', reduxUserApi)
        // console.log('valid', valid)
        if (reduxUserApi.length === 0) {
            dispatch(createNotification(`please enter key to validate`, 3));
        } else if (valid.error) {            
            // updateAPI(reduxUserApi)
            dispatch(createNotification(`validation failed, please refer to instruction`, 3));
        } else if (!valid.error && valid.data.translations[0].translatedText === 'test') {            
            updateAPI(reduxUserApi)
            dispatch(createNotification(`key is valid, try to crop`, 3));
        } 
    } // validation

    useEffect(() => {
        dispatch(initializeKey()) 
      }, [dispatch]) // preload key

    return (
        <>
        <FormContainer style={{justifyContent: `center`}}>
        <Stack 
        direction='row' 
        spacing={4} 
        align='center' 
        width={`390px`}>
        <InputGroup 
        size='md'>
            <Input
            focusBorderColor='teal'
            _focus={{ WebkitTapHighlightColor: 'transparent' }}
            _focusVisible={{ boxShadow: "none", outline: "none", }}
            colorScheme='teal'
            pr='4.5rem'
            type={show ? 'text' : 'password'}
            placeholder='Enter API key'
            value={reduxUserApi}
            onChange={(e) => dispatch(rememberUserKey(e.target.value))}/>
            <InputRightElement 
            width='4.5rem'>
            <Button 
            colorScheme='teal' 
            h='1.75rem' 
            size='sm' 
            onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
            </Button>
            </InputRightElement>
        </InputGroup>
        <IconButton
        variant='outline'
        colorScheme='teal'
        aria-label='Check API'
        icon={<CheckIcon />}
        onClick={handleSubmit}/>
        </Stack>
        <ContentBox>
            <Notification />
        </ContentBox>
        </FormContainer>
        </>
    )
}