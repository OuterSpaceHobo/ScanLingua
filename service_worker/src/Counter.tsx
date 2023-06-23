import { Button } from "@chakra-ui/button";
import {  useEffect } from "react";
import { CenteredP } from "./Container";
import { resetCounter } from "./messages";

import { useAppSelector, useAppDispatch } from './hooks' // test
import { resetCount, initializeCount } from "./reducers/counterReducer";

export function Counter() {
    const counter = useAppSelector(state => state.counter) // test
    const dispatch = useAppDispatch() // test

    useEffect(() => {
        dispatch(initializeCount()) 
      }, [dispatch]) // preload counter

    const handleReset = (event: { preventDefault: () => void; }) => {
        const reset = async () => {
            // console.log('reset counter called')
            resetCounter()
            dispatch(resetCount())
          }
          reset()
    }

    return (
        <>
            <CenteredP>Recognition usage counter: {counter}</CenteredP> 
            <Button colorScheme='teal' variant='link' onClick={handleReset}>
                reset
            </Button>
        </>
    )
}
