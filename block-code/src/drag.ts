import { TBlock } from "./block";
import { trigger } from "./util";

let dragTarget: TBlock | null = null; // Block we're dragging.
let dragType: 'menu' | 'script'; // Are we dragging from the menu or from the script?
// @ts-ignore
let scriptBlocks: TBlock[] = []; // Blocks in the script, sorted by position.

function dragStart(e: DragEvent) {
    if (!(e.target instanceof HTMLDivElement)) {
        return;
    } else if (!e.target.matches('[data-role="block"]')) {
        return;
    } 

    if (e.target.matches('[data-role="menu"] [data-role="block"]')) {
        dragType = 'menu'
    } else {
        dragType = 'script'
    }

    e.target.setAttribute('data-dragging', '');

    dragTarget = e.target;
    scriptBlocks = Array.from(document.querySelectorAll('[data-role=script] [data-role=block]:not([data-dragging])'));

    if(e.dataTransfer) {
        e.dataTransfer.setData('text/html', e.target.outerHTML);

        if (e.target.matches('[data-role="menu"] [data-role="block"]')) {
            e.dataTransfer.effectAllowed = 'copy';
        } else {
            e.dataTransfer.effectAllowed = 'move';
        }
    }
}

function dragEnter(e: DragEvent) {
    if (!(e.target instanceof HTMLElement)) {
        return;
    }

    if (e.target.matches('[data-role="menu"], [data-role="script"], [data-role="content"]')) {
        e.target.setAttribute('data-over', '');
        // Necessary. Allow us to drop.
        e.preventDefault();
    } else if (!e.target.matches('[data-role="menu"] *, [data-role="script"] *')) {
        _findAndRemoveAttribute('data-over');
        e.target.removeAttribute('data-over');
    }
}

function dragOver(e: DragEvent) {
    if (!(e.target instanceof HTMLElement)) {
        return;
    }

    if(!e.target.matches(
        `[data-role="menu"], [data-role="menu"] *, [data-role="script"], [data-role="script"] *, [data-role="content"]`
    )) {
        return;
    }
    
    // Necessary. Allows us to drop. 
    e.preventDefault(); 

    if (e.dataTransfer) {
        if (dragType === 'menu') {
            // See the section on the DataTransfer object.
            e.dataTransfer.effectAllowed = 'copy';
        } else {
            e.dataTransfer.effectAllowed = 'move';
        }
    }
}

function drop(e: DragEvent) {
    if (!dragTarget || !dragTarget.parentElement) {
        return;
    } else if (!(e.target instanceof HTMLElement)) {
        return;
    } else if (!e.target.matches('[data-role="menu"], [data-role="menu"] *, [data-role="script"], [data-role="script"] *')) {
        return;
    }
                               
    const dropTarget = e.target.closest('[data-role="script"] [data-role="container"], [data-role="script"] [data-role="block"], [data-role="menu"], [data-role="script"]');
    const dropType = dropTarget?.matches('[data-role="menu"]') ? 'menu' : 'script';

    if (!dropTarget || !dropTarget.parentElement) {
        return;
    }

    // Stops the browser from redirecting. 
    e.stopPropagation();  

    if (dragType === 'script' && dropType === 'menu') {
        // trigger('blockRemoved', dragTarget.parentElement, dragTarget);
        trigger('blockRemoved', dragTarget);

        dragTarget.parentElement.removeChild(dragTarget);
    } else if (dragType === 'script' && dropType === 'script') {
        if (dropTarget.matches('[data-role="block"]')) {
            dropTarget.parentElement.insertBefore(dragTarget, dropTarget.nextSibling);
        } else {
            dropTarget.insertBefore(dragTarget, dropTarget.firstElementChild);
        }

        // trigger('blockRemoved', dropTarget, dragTarget);
        trigger('blockMoved', dragTarget);
    } else if (dragType === 'menu' && dropType === 'script') {
        const newNode = dragTarget.cloneNode(true) as TBlock;

        newNode.removeAttribute('data-dragging');

        if(dropTarget.matches('[data-role="block"]')) {
            dropTarget.parentElement.insertBefore(newNode, dropTarget.nextSibling);
        } else {
            dropTarget.insertBefore(newNode, dropTarget.firstElementChild);
        }

        // trigger('blockRemoved', dropTarget, newNode);
        trigger('blockAdded', newNode);
    }
}   

function _findAndRemoveAttribute(a: string) {
    const e = document.querySelector(`[${a}]`);

    if (e) {
        e.removeAttribute(a);
    }
}

function dragEnd() {
    _findAndRemoveAttribute('data-dragging');
    _findAndRemoveAttribute('data-over');
    _findAndRemoveAttribute('data-next');
}

document.addEventListener('dragstart', dragStart);
document.addEventListener('dragenter', dragEnter);
document.addEventListener('dragover', dragOver);
document.addEventListener('drag', () => {});
document.addEventListener('drop', drop);
document.addEventListener('dragend', dragEnd);
