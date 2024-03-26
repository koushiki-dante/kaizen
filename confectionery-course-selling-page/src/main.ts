export {};

const navDialogRoot = document.querySelector("[data-dialog-root]");
const navOpenTrigger = document.querySelector("[data-open-trigger]");
const navCloseTrigger = document.querySelector("[data-close-trigger]");

navOpenTrigger?.addEventListener("click", () => {
  navOpenTrigger?.setAttribute("aria-expanded", "true");
  navDialogRoot?.setAttribute("data-dialog-state", "opened");
});

navCloseTrigger?.addEventListener("click", () => {
  navOpenTrigger?.setAttribute("aria-expanded", "false");
  navDialogRoot?.setAttribute("data-dialog-state", "closed");
});
