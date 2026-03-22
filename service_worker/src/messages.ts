export async function fetchAvailableTargets(source: string): Promise<{ code: string; label: string }[]> {
    try {
        const response = await chrome.runtime.sendMessage({ type: "request-available-targets", source });
        return response || [];
    } catch {
        await new Promise(r => setTimeout(r, 500));
        try {
            const response = await chrome.runtime.sendMessage({ type: "request-available-targets", source });
            return response || [];
        } catch {
            return [];
        }
    }
}
