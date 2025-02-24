import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowButtonProps = {
	isOpen: boolean; // Состояние кнопки: открыта или закрыта
	onClick: OnClick;  // Функция, которая будет вызвана при клике на кнопку
};

export const ArrowButton = ({ isOpen, onClick }: ArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'  // Указываем, что это кнопка для доступности
			aria-label='Открыть/Закрыть форму параметров статьи'  // Описание для screen readers
			tabIndex={0}  // Делает элемент фокусируемым с помощью клавиатуры.
			className={clsx(styles.container, { [styles.container_open]: isOpen })}  // Условные классы
			onClick={onClick}>  
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}  // Условные классы
			/>
		</div>
	);
};
