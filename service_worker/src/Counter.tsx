import { Button } from "@chakra-ui/button";
import {useState, useEffect} from "react";
import { InputP } from "./Container";
import { resetCounter } from "./messages";

export function Counter() {
    const [counter, setCounter] = useState(0)

    const handleReset = (event: { preventDefault: () => void; }) => {
        resetCounter()
        setCounter(0)
    }
    useEffect(() => {
        chrome.storage.local.get(["counter"], (result) => {
            setCounter(result.counter);
            // console.log("Get key is set to " + result.counter);

            if (result.counter === null) {
                setCounter(0)
            } else if (result.counter === undefined) {
                setCounter(0)
            } 
        })
    }, []);

    return <>
        <InputP style={{textAlign: `center`}}>Simple hotkey usage counter: {counter}</InputP> 
        <Button 
        colorScheme='teal' 
        variant='link'
        onClick={handleReset}>
          reset
        </Button>
    </>;
}
