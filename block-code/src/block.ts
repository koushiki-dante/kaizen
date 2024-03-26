import { trigger, getAndCloneHtmlTemplate } from "./util";

function createBlock(name: string, value?: number, contents?: Contents): TBlock {
    const item = getAndCloneHtmlTemplate('block-template', '[data-role=block]') as TBlock;

    item.setAttribute('data-name', name);
    item.appendChild(document.createTextNode(name));

    if(value !== undefined && value !== null) {
        const input = getAndCloneHtmlTemplate('input-template', 'input[type=number]') as HTMLInputElement;

        input.setAttribute('value', String(value));
        item.appendChild(input);
    }

    if(Array.isArray(contents)) {
        const container = getAndCloneHtmlTemplate('container-template', '[data-role=container]') as HTMLDivElement;

        contents.forEach((block) => {
            container.appendChild(createBlock.apply(null, block));
        });

        item.appendChild(container);
    } else if (typeof contents === 'string') { 
        // Add units specifier.
        item.appendChild(document.createTextNode(contents));
    }

    return item;
}

function blockContents(block: TBlock): TBlock[] | null {
    const container = block.querySelector('[data-role=container]');
    return container ? (Array.from(container.children) as TBlock[]) : null;
}

function blockValue(block: TBlock): number | null {
    const input = block.querySelector('input');
    return input ? Number(input.value) : null;
}

function blockUnits(block: TBlock): string | null {
    // It has a space before the unit's first character.
    const UNIT_FIRST_CHARACTER_START = 1;
    
    const isThereUnit = 
            block.children.length > 1 &&
            block.lastChild?.nodeType === Node.TEXT_NODE &&
            block.lastChild.textContent !== null;

    if(isThereUnit) {
        // The variable "isThereUnit" already checks if 
        // "block.lastChild.textContent" is null. The type casting below is just
        // for typescript to stop complaining.
        return (block.lastChild.textContent as string).slice(UNIT_FIRST_CHARACTER_START);
    } else {
        return null;
    }
}

function blockScript(block: TBlock): Script {
    const script = [block.dataset.name] as Script;
    const value = blockValue(block);

    if (value !== null) {
        script.push(value);
    }

    const contents = blockContents(block);
    const units = blockUnits(block);

    if (contents) {
        script.push(contents.map((block) => blockScript(block)));
    }

    if(units) {
        script.push(units);
    }

    return script;
}

function runBlock(blocks: TBlock[]) {
    blocks.forEach((block) => trigger('run', block));
}

export type Contents = string | Script[];

export type Script = [string, number?, Script[]?];

export type TBlock = HTMLDivElement;
                                          
export const Block= {
    create: createBlock,
    contents: blockContents,
    value: blockValue,
    script: blockScript,
    run: runBlock,
    trigger: trigger,
};
