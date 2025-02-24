import { Text } from 'src/ui/text';

import styles from './Button.module.scss';
import { clsx } from 'clsx';

export const Button = ({
	title,
	onClick,
	htmlType,
	type,
}: {
	title: string;  // Текст, который будет отображаться на кнопке
	onClick?: () => void;  // Функция, которая будет вызвана при клике на кнопку (опционально)
	htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];  // Тип кнопки (например, "submit", "reset")
	type: 'apply' | 'clear';  // Тип кнопки для определения стиля ("apply" или "clear")
}) => {
	return (
		<button
			className={clsx(
				styles.button,  // Базовый класс для кнопки
				{ [styles.button_apply]: type === 'apply' },  // Класс для стиля "apply"
				{ [styles.button_clear]: type === 'clear' }  // Класс для стиля "clear"
			)}
			type={htmlType}  // Указываем тип кнопки (например, "submit", "reset")
			onClick={onClick}> 
			<Text weight={800} uppercase>
				{title}  {/* Отображаем текст на кнопке */}
			</Text>
		</button>
	);
};
