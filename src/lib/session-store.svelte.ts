import { browser } from '$app/environment';
import { useSession } from '$lib/auth-client';

let sessionInstance: ReturnType<typeof useSession> | null = null;

export function getSession() {
	if (!browser) return null;
	
	if (!sessionInstance) {
		sessionInstance = useSession();
	}
	
	return sessionInstance;
}
