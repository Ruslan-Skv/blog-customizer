import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	OptionType, // Тип для опций (каждая опция имеет title, value, className и optionClassName)
	fontFamilyOptions, // Массив опций для выбора шрифта
	fontColors, // Массив опций для выбора цвета текста
	backgroundColors, // Массив опций для выбора цвета фона
	contentWidthArr, // Массив опций для выбора ширины контента
	fontSizeOptions, // Массив опций для выбора размера шрифта
	defaultArticleState, // Начальное состояние параметров
	ArticleStateType, // Тип для состояния статьи
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef, SyntheticEvent } from 'react';
import clsx from 'clsx';

// Тип для пропсов компонента ArticleParamsForm
export type ArticleParamsFormProps = {
	onChange: React.Dispatch<React.SetStateAction<ArticleStateType>>; // Функция для обновления состояния
};

export const ArticleParamsForm = ({ onChange }: ArticleParamsFormProps) => {
	// Ссылка на DOM-элемент aside (боковая панель)
	const asideRef = useRef<HTMLDivElement | null>(null);
	// Состояние для управления открытием/закрытием боковой панели
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	// Состояния для каждого параметра
	const [fontFamily, setFontFamily] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);
	const [fontColor, setFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [contentWidth, setContentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		onChange: setIsMenuOpen,
		rootRef: asideRef,
	});

	// Функция для переключения состояния боковой панели (открыто/закрыто)
	const toggleStateMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};
	// Обработчики изменения параметров
	const changeFontFamily = (option: OptionType) => {
		setFontFamily(option);
	};
	const changeFontSize = (option: OptionType) => {
		setFontSize(option);
	};
	const changeBackgroundColor = (option: OptionType) => {
		setBackgroundColor(option);
	};
	const changeFontColor = (option: OptionType) => {
		setFontColor(option);
	};
	const changeContentWidth = (option: OptionType) => {
		setContentWidth(option);
	};

	// Обработчик отправки формы
	const handleOnSubmitForm = (e: SyntheticEvent) => {
		e.preventDefault();
		// Вызов функции onChange с новым состоянием
		onChange({
			fontFamilyOption: fontFamily,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSize,
		});
	};

	// Обработчик сброса формы к начальным значениям
	const handleOnClickButtonReset = () => {
		// Вызов функции onChange с начальным состоянием
		onChange(defaultArticleState);
		// Сброс всех состояний к начальным значениям
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setFontColor(defaultArticleState.fontColor);
		setContentWidth(defaultArticleState.contentWidth);
	};

	return (
		<div ref={asideRef}>
			<ArrowButton isOpen={isMenuOpen} onClick={toggleStateMenu} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleOnSubmitForm}
					onReset={handleOnClickButtonReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<div className={styles.spacing} />
					<Select
						options={fontFamilyOptions}
						selected={fontFamily}
						onChange={changeFontFamily}
						title='шрифт'
					/>
					<div className={styles.spacing} />
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={fontSize}
						onChange={changeFontSize}
						title='размер шрифта'
					/>
					<div className={styles.spacing} />
					<Select
						options={fontColors}
						selected={fontColor}
						onChange={changeFontColor}
						title='цвет шрифта'
					/>
					<div className={styles.spacing} />
					<Separator />
					<div className={styles.spacing} />
					<Select
						options={backgroundColors}
						selected={backgroundColor}
						onChange={changeBackgroundColor}
						title='цвет фона'
					/>
					<div className={styles.spacing} />
					<Select
						options={contentWidthArr}
						selected={contentWidth}
						onChange={changeContentWidth}
						title='ширина контента'
					/>
					<div className={styles.bottomSpacing} />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
