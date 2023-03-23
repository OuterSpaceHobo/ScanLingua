export {sleep}

export async function getResult () {
    await sleep(1000)
    return {res: "ok"}
}

const sleep = (ms: number | undefined) =>
    new Promise(resolve => {
        setTimeout(resolve, ms)
    })