const comment =
	'This is a code playground\nWe run three typescript javascript and python';

export const LANGUAGES = {
	javascript: {
		ext: '.js',
		initialContent: `/*${comment}*/`,
	},
	python: {
		ext: '.py',
		initialContent: `'''${comment}''''`,
	},
	typescript: {
		ext: '.ts',
		initialContent: `/*${comment}*/`,
	},
};

export const DEFAULT_THEME = 'blackboard';
