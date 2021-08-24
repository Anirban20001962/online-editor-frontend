import { useState, useEffect, useCallback } from 'react';
import themeList from 'monaco-themes/themes/themelist.json';

export default function useEditorTheme() {
	const [themes, setThemes] = useState(null);
	const [colors, setColors] = useState(null);

	const getDataForThemes = useCallback(async () => {
		const keys = Object.keys(themeList);
		/**
		 * Get the import link for the each theme
		 */
		const links = Object.values(themeList).map((value) =>
			import(`monaco-themes/themes/${value}`)
		);

		/**
		 * Fetch em all
		 */
		const datas = await Promise.all(links);

		/**
		 * Make themesAvailable object
		 */
		const res = keys.reduce((acc, key, i) => {
			acc[key] = datas[i];
			return acc;
		}, {});

		/**
		 * Make colorsAvailable object
		 */
		const cols = keys.reduce((acc, key, i) => {
			acc[key] = {
				background: datas[i].colors['editor.background'],
				foreground: datas[i].colors['editor.foreground'],
				lineHighlightBackground:
					datas[i].colors['editor.lineHighlightBackground'],
				selectionBackground:
					datas[i].colors['editor.selectionBackground'],
				editorCursorForeground:
					datas[i].colors['editorCursor.foreground'],
				editorWhiteSpace:
					datas[i].colors['editorWhitespace.foreground'],
			};
			return acc;
		}, {});

		setThemes(res);
		setColors(cols);
	}, []);

	useEffect(() => {
		getDataForThemes();
	}, [getDataForThemes]);

	return [themes, colors];
}
