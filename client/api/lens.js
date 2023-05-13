import { LensClient, development, production, ReactionTypes } from '@/libs/lens-client' 

export const lensClient = new LensClient({
	environment: IS_MAIN_CHAIN ? production : development,
	storage: {
			getItem: (key) => {
				return window.localStorage.getItem(key);
			},		
			setItem: (key, value) => {
				window.localStorage.setItem(key, value);
			},		
			removeItem: (key) => {
				window.localStorage.removeItem(key);
			}
		}
	}
);

export {
	ReactionTypes
}
