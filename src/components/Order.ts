
export class Order {
    public container: HTMLElement;
    protected stage: string; // Состояние этапов оформления

    constructor(container: HTMLElement) {
        this.container = container;
        this.stage = 'initial'; // Начальный этап
        this.addCloseButton(); // Добавляем кнопку закрытия при инициализации
    }

    public set_stage(stage: string) {
        this.stage = stage;
    }

    public pay() {
        // Запускает событие оплаты
        const payEvent = new Event('pay');
        this.container.dispatchEvent(payEvent);
    }

    // Метод для добавления кнопки закрытия в модальное окно
    public addCloseButton() {
        const existingCloseButton = this.container.querySelector('.modal__close');
        if (existingCloseButton) {
            existingCloseButton.remove();
        }

        // Создаем новую кнопку закрытия
        const closeButton = document.createElement('button');
        closeButton.classList.add('modal__close');

        // Добавляем обработчик события клика
        closeButton.addEventListener('click', () => {
            this.container.style.display = 'none'; 
            this.clearModalContent(); 
        });

        // Добавляем кнопку в модальное окно
        this.container.appendChild(closeButton);
    }

    // Метод для очищения содержимого модального окна
    public clearModalContent() {
        this.container.innerHTML = ''; 
    }
}