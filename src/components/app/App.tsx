import styles from 'src/components/app/App.module.scss';
import { useState, CSSProperties } from 'react';
import { Article } from 'src/components/article/Article';
import { ArticleParamsForm } from 'src/components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

export const App = () => {
	const [styleArticle, setStyleArticle] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': styleArticle.fontFamilyOption.value,
					'--font-size': styleArticle.fontSizeOption.value,
					'--font-color': styleArticle.fontColor.value,
					'--container-width': styleArticle.contentWidth.value,
					'--bg-color': styleArticle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onChange={setStyleArticle} />
			<Article />
		</main>
	);
};
