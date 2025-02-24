import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Option } from './Option';

import styles from './RadioGroup.module.scss';

type RadioGroupProps = {
	name: string;  // Имя группы радио-кнопок (используется для группировки)
	options: OptionType[];  // Список опций для отображения
	selected: OptionType;  // Выбранная опция
	onChange?: (value: OptionType) => void;  // Функция, которая будет вызвана при изменении выбранной опции
	title: string;  // Заголовок группы радио-кнопок
};

export const RadioGroup = (props: RadioGroupProps) => {
	const { name, options, selected, onChange, title } = props;

	const handleChange = (option: OptionType) => onChange?.(option); // Функция для обработки изменения выбранной опции

	return (
		<div className={styles.container}>
			{/* Отображаем заголовок, если он передан */}
			{title && (
				<>
					<Text weight={800} size={12} uppercase>
						{title}
					</Text>
				</>
			)}
			{/* Контейнер для группы радио-кнопок */}
			<div className={styles.group}>
				{/* Мапим опции в компоненты Option */}
				{options.map((option) => (
					<Option
						key={option.value}  // Уникальный ключ для каждой опции
						groupName={name}  // Имя группы для группировки радио-кнопок
						value={option.value}  // Значение опции
						title={option.title}  // Текст опции
						selected={selected}  // Выбранная опция (для определения активной кнопки).
						onChange={() => handleChange(option)}  // Обработчик изменения, который вызывает handleChange с текущей опцией.
						option={option}  // Вся опция (может использоваться внутри Option)
					/>
				))}
			</div>
		</div>
	);
};
