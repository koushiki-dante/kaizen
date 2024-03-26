import { Block, Contents, TBlock } from './block';

type TBlockFn = (block: TBlock) => void;
type TScriptRegistry = { [key: string]: TBlockFn; };

const menu = document.querySelector('[data-role=menu]') as HTMLDivElement;
const script = document.querySelector('[data-role=script]') as HTMLDivElement;
const scriptRegistry: TScriptRegistry = {};
let scriptDirty = false;

function runSoon() {
    scriptDirty = true;
}

function menuItem(name: string, fn: TBlockFn, value?: number, units?: Contents) {
    const item = Block.create(name, value, units);

    scriptRegistry[name] = fn;
    menu.appendChild(item);

    return item;
}

function run() {
    if (scriptDirty) {
        scriptDirty = false;

        const blocks: TBlock[] = Array.from(script.querySelectorAll('[data-role=script] > [data-role="block"]'));

        Block.trigger('beforeRun', script);
        Block.run(blocks);
        Block.trigger('afterRun', script);
    } else {
        Block.trigger('everyFrame', script);
    }

    requestAnimationFrame(run);
}

requestAnimationFrame(run);

function runEach(e: Event) {
    const target = e.target;

    if (!(target instanceof HTMLElement)) {
        return;
    } else if (!target.matches('[data-role="script"] [data-role="block"]')) {
        return;
    } else if (target.dataset.name === 'Define block') {
        return;
    }

    if (target.dataset.name) {
        target.setAttribute('data-running', '');
        scriptRegistry[target.dataset.name](target as TBlock);
        target.removeAttribute('data-running');
    }
}

function repeat(block: TBlock) {
    const count = Block.value(block);
    const children = Block.contents(block);

    if (!count || !children) {
        return;
    }

    for(let i = 0; i < count; i++) {
        Block.run(children);
    }
}

menuItem('Repeat', repeat, 10, []);

export const Menu = {
    runSoon: runSoon,
    item: menuItem,
};

document.addEventListener('drop', runSoon);
script.addEventListener('run', runEach);
script.addEventListener('change', runSoon);
script.addEventListener('keyup', runSoon);
