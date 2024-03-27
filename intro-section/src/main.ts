export {};

function setMobileNavigation() {
  const navDialog = document.querySelector(
    "[data-mb-navigation-dialog]"
  ) as HTMLDialogElement;
  const navOpenTrigger = document.querySelector(
    "[data-mb-navigation-open-trigger]"
  ) as HTMLButtonElement;
  const navCloseTrigger = document.querySelector(
    "[data-mb-navigation-close-trigger]"
  ) as HTMLButtonElement;

  navOpenTrigger.addEventListener("click", () => {
    navDialog.showModal();
    navOpenTrigger.setAttribute("aria-expanded", "true");
  });

  navCloseTrigger.addEventListener("click", () => {
    navDialog.close();
    navOpenTrigger.setAttribute("aria-expanded", "false");
  });
}

function mobileNavigationItem(itemRoot: HTMLDivElement) {
  const itemTrigger = itemRoot.querySelector(
    "[data-mb-navigation-item-trigger]"
  );

  if (!itemTrigger) {
    return;
  }

  itemTrigger.addEventListener("click", () => {
    const itemState = itemRoot.getAttribute("data-mb-navigation-item-state");

    if (itemState === "closed") {
      itemRoot.setAttribute("data-mb-navigation-item-state", "open");
      itemTrigger.setAttribute("aria-expanded", "true");
    } else if (itemState === "open") {
      itemRoot.setAttribute("data-mb-navigation-item-state", "closed");
      itemTrigger.setAttribute("aria-expanded", "false");
    }
  });
}

function setMobileNavigationItems() {
  const navItemRoots = document.querySelectorAll("[data-mb-navigation-item]");

  navItemRoots.forEach((itemRoot) => {
    if (!(itemRoot instanceof HTMLDivElement)) {
      return;
    }

    mobileNavigationItem(itemRoot);
  });
}

function navigationItem(itemRoot: HTMLDivElement)  {
  const itemModal = itemRoot.querySelector(
    "[data-navigation-item-modal]"
  ) as HTMLDialogElement;
  const itemTrigger = itemRoot.querySelector(
    "[data-navigation-item-trigger]"
  ) as HTMLButtonElement;

  if(!(itemModal instanceof HTMLDialogElement)) {
    return;
  } else if(!(itemTrigger instanceof HTMLButtonElement)) {
    return;
  }

  function openModal() {
    itemModal.show();
    itemRoot.setAttribute("data-navigation-item-state", "open");
    itemTrigger.setAttribute("aria-expanded", "true");
  }

  function closeModal() {
    itemModal.close();
    itemRoot.setAttribute("data-navigation-item-state", "closed");
    itemTrigger.setAttribute("aria-expanded", "false");
  }

  function navigationState(): string | null {
    return itemRoot.getAttribute("data-navigation-item-state");
  }
  
  itemTrigger.addEventListener("mouseenter", () => {
    if(navigationState() === "closed") {
      openModal();
    }
  });

  itemRoot.addEventListener("mouseleave", () => {
    if(navigationState() === "open") {
      closeModal();

      // When the "mouseleave" event occurs, the window may or may not have this event 
      // listener attached to it. 
      window.removeEventListener("click", closeModalOnFocusLoss);
    }
  });
  
  function closeModalOnFocusLoss({ target }: MouseEvent) {
    if(!(target instanceof HTMLElement)) {
      return;
    }

    if(!itemModal.contains(target)) {
      closeModal();
      window.removeEventListener("click", closeModalOnFocusLoss);
    }
  }
  
  itemRoot.addEventListener("keyup", (e: KeyboardEvent) => {
    const navState = navigationState();

    if(navState === "open" && e.key === "Escape") {
      closeModal();
      window.removeEventListener("click", closeModalOnFocusLoss);
    } else if(navState === "closed" && e.key === "Enter") {
      openModal();
      window.addEventListener("click", closeModalOnFocusLoss);
    }
  });
}

function setNavigationItems() {
  const navigationItems = document.querySelectorAll("[data-navigation-item]") as NodeListOf<HTMLDivElement>;

  navigationItems.forEach((item) => {
    navigationItem(item);
  });
}

function main() {
  setMobileNavigation();
  setMobileNavigationItems();
  
  setNavigationItems();
}

main();
