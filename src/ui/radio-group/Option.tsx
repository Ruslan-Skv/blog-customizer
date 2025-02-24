import { useRef } from 'react';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { useEnterSubmit } from './hooks/useEnterSubmit';

import styles from './RadioGroup.module.scss';

type OptionProps = {
	value: OptionType['value'];  // Значение опции. Это уникальный идентификатор для радио-кнопки.
	title: OptionType['title'];  // Текст опции, который отображается рядом с радио-кнопкой.
	selected: OptionType;  // Выбранная опция. Это позволяет определить, активна ли текущая радио-кнопка.
	groupName: string;  // Имя группы радио-кнопок. Это важно для группировки, чтобы только одна кнопка могла быть выбрана в группе.
	onChange?: (option: OptionType) => void;  // Функция, которая будет вызвана при изменении выбранной опции. Она принимает новую выбранную опцию в качестве аргумента.
	option: OptionType;  // Вся опция (для передачи в обработчик)
};

export const Option = (props: OptionProps) => {
	const { value, title, selected, groupName, onChange, option } = props;

	const optionRef = useRef<HTMLDivElement>(null); // Создаем ссылку на DOM-элемент

	const handleChange = () => onChange?.(option);  // Функция для обработки изменения выбранной опции

	useEnterSubmit({ onChange, option });  // Используем кастомный хук для обработки нажатия Enter

	const inputId = `${groupName}_radio_item_with_value__${value}`;  // Генерируем уникальный идентификатор для input и label
	const isChecked = value === selected.title;  // Проверяем, выбрана ли текущая опция

	return (
		<div
			className={styles.item} // Класс для стилизации контейнера
			key={value} // Уникальный ключ для React (обязательно для списков)
			data-checked={isChecked} // Атрибут для стилизации выбранной опции
			data-testid={inputId} // Атрибут для тестирования
			tabIndex={0} // Делаем элемент фокусируемым
			ref={optionRef} // Ссылка на DOM-элемент
			>
			<input
				className={styles.input} // Класс для стилизации input
				type='radio' // Тип элемента (радио-кнопка)
				name={groupName} // Имя группы для группировки радио-кнопок
				id={inputId} // Уникальный идентификатор для связи с label
				value={value} // Значение опции
				onChange={handleChange} // Обработчик изменения
				tabIndex={-1} // Убираем элемент из последовательности фокусировки
			/>
			<label className={styles.label} htmlFor={inputId}>
				<Text size={18} uppercase>
					{title}  {/* Отображаем текст опции */}
				</Text>
			</label>
		</div>
	);
};
