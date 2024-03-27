const modal = document.querySelector('[data-role=modal]') as HTMLDialogElement;
const openModalBtn = document.querySelector('[data-role=open-modal]') as HTMLButtonElement;
const closeModalBtn = document.querySelector('[data-role=close-modal]') as HTMLButtonElement;

openModalBtn.addEventListener('click', () => {
    modal.showModal();
});

closeModalBtn.addEventListener('click', () => {
    modal.close();
});
