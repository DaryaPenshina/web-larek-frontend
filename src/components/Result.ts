export class Result {
    public total: HTMLElement;
    public close: HTMLButtonElement;
    private modal: HTMLElement;

    constructor(modal: HTMLElement, options: { onClose: () => void }) {
        this.modal = modal;

        this.total = document.createElement('div');
        this.total.classList.add('result__total');

        this.close = document.createElement('button');
        this.close.classList.add('modal__close');
        this.close.addEventListener('click', options.onClose);
    }

    public set_total(amount: number) {
        this.total.innerText = `Списано ${amount} синапсов`;
    }
}


function openModal(modal: HTMLElement) {
    modal.style.display = 'block'; 
}

// Функция для очистки содержимого модального окна
function clearModalContent(modal: HTMLElement) {
    while (modal.firstChild) {
        modal.removeChild(modal.firstChild);
    }
}