export async function fetchAvailableTargets(source: string): Promise<{ code: string; label: string }[]> {
    const response = await chrome.runtime.sendMessage({ type: "request-available-targets", source });
    return response || [];
}
