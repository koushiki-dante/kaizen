const btnOpenModal = document.querySelector('[data-role=open-modal]') as HTMLButtonElement;
const btnCloseModal = document.querySelector('[data-role=close-modal]') as HTMLButtonElement;
const modal = document.getElementById('modal') as HTMLDialogElement;

btnOpenModal.addEventListener('click', () => {
    modal.showModal();
});

btnCloseModal.addEventListener('click', () => {
    modal.close();
});
