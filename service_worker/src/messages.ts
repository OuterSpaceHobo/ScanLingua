export let userApi: string
export let count: number

const requests: Map<number, any> = new Map() // map [string] promise

export async function updateAPI (userApi: string) {
    const requestId = getRandomInt(100000) 
    const response = await chrome.runtime.sendMessage({type: "updated_API", requestId, userApi}); 
    const res = await new Promise((resolve, reject) => {
        requests.set(requestId, resolve) 
        setTimeout(reject, 10*1000) //10sec
    })
    return res
}

export async function resetCounter () {
    const requestId = getRandomInt(100000) 
    const response = await chrome.runtime.sendMessage({type: "reset-counter", requestId}); 
    const res = await new Promise((resolve, reject) => {
        requests.set(requestId, resolve) 
        setTimeout(reject, 10*1000) //10sec
    })
    return res
}

  function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}
