import { useState, useRef } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import arrowDown from 'src/images/arrow-down.svg';
import { Option } from './Option';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterSubmit } from './hooks/useEnterSubmit';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

import styles from './Select.module.scss';

type SelectProps = {
	selected: OptionType | null;  // Выбранная опция. Если ничего не выбрано, значение равно null.
	options: OptionType[];  //Массив опций, которые отображаются в выпадающем списке.
	placeholder?: string;  //Текст, который отображается, если ничего не выбрано.
	onChange?: (selected: OptionType) => void;  //Функция, которая вызывается при выборе опции. Она принимает выбранную опцию в качестве аргумента.
	onClose?: () => void;  //Функция, которая вызывается при закрытии выпадающего списка.
	title?: string;  //Заголовок выпадающего списка (опционально).
};

export const Select = (props: SelectProps) => {
	const { options, placeholder, selected, onChange, onClose, title } = props;
	// Состояние для управления открытием/закрытием выпадающего списка
	const [isOpen, setIsOpen] = useState<boolean>(false);
	// Ссылки на DOM-элементы
	const rootRef = useRef<HTMLDivElement>(null);  // Контейнер выпадающего списка
	const placeholderRef = useRef<HTMLDivElement>(null);  // Элемент с текстом-заполнителем
	// Класс опции (например, для применения стилей шрифта)
	const optionClassName = selected?.optionClassName ?? '';

	// Закрытие выпадающего списка при клике вне его области
	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose,
		onChange: setIsOpen,
	});

	// Обработка нажатия клавиши Enter
	useEnterSubmit({
		placeholderRef,
		onChange: setIsOpen,
	});

	// Обработчик выбора опции
	const handleOptionClick = (option: OptionType) => {
		setIsOpen(false);
		onChange?.(option);
	};

	// Обработчик клика на тексте-заполнителе
	const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
		setIsOpen((isOpen) => !isOpen);
	};

	return (
		<div className={styles.container}>
			{/* Отображаем заголовок, если он передан */}
			{title && (
				<>
					<Text size={12} weight={800} uppercase>
						{title}
					</Text>
				</>
			)}
			<div
				className={styles.selectWrapper}
				ref={rootRef}
				data-is-active={isOpen}  // Атрибут для стилизации активного состояния
				data-testid='selectWrapper'>
					{/* Иконка стрелки */}
				<img src={arrowDown} alt='иконка стрелочки' className={styles.arrow} />
				<div
					className={clsx(
						styles.placeholder,
						(styles as Record<string, string>)[optionClassName] // Условные классы
					)}
					data-status={status}
					data-selected={!!selected?.value}  // Атрибут для стилизации выбранного состояния
					onClick={handlePlaceHolderClick}  // Обработчик клика
					role='button'
					tabIndex={0}
					ref={placeholderRef}>
					<Text
						family={
							isFontFamilyClass(selected?.className)
								? selected?.className
								: undefined
						}>
						{selected?.title || placeholder}  {/* Отображаем выбранное значение или текст-заполнитель */}
					</Text>
				</div>
				{/* Выпадающий список */}
				{isOpen && (
					<ul className={styles.select} data-testid='selectDropdown'>
						{options
							.filter((option) => selected?.value !== option.value)
							.map((option) => (
								<Option
									key={option.value}
									option={option}
									onClick={() => handleOptionClick(option)}  // Обработчик выбора опции
								/>
							))}
					</ul>
				)}
			</div>
		</div>
	);
};
