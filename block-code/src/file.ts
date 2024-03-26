import { Block, Script, TBlock } from "./block";
import { circle, spiral, triangle } from "./examples";
import { Menu } from "./menu";
import { elem } from "./util";

const htmlScript = document.querySelector('[data-role=script]') as HTMLDivElement;
const title = `__${document.querySelector('title')?.textContent?.toLowerCase().replace(' ', '_')}`;

function saveLocal() {
    const script = scriptToJson();

    if(script) {
        localStorage.setItem(title, script);
    } else {
        localStorage.removeItem(title);
    }
}

function scriptToJson(): string | null {
    const blocks = Array.from(htmlScript.querySelectorAll('[data-role=script] > [data-role=block]')) as TBlock[];

    if (blocks.length) {
        return JSON.stringify(blocks.map(Block.script));
    } else {
        return null;
    }
}

function jsonToScript(json: string) {
    clearScript();

    const script = JSON.parse(json) as Script[];

    script.forEach((block) => {
        htmlScript.appendChild(Block.create.apply(null, block));
    });

    Menu.runSoon();
}

function restoreLocal() { 
    jsonToScript(localStorage.getItem(title) || '[]');
}

function clearScript() {
    Array.from(htmlScript.querySelectorAll('[data-role=script] > [data-role=block]'))
        .forEach((block) => block.parentElement?.removeChild(block));

    Menu.runSoon();
}
                 
function saveFile() {
    const fileTitle = prompt('Save file as: ');
    const json = scriptToJson();

    if(!fileTitle || !json) {
        return;
    }

    const file = new Blob([json], { type: 'application/json'  });
    const reader = new FileReader();

    reader.onloadend = function() {
        const result = reader.result;

        if(!result || typeof result !== 'string') {
            return;
        }

        const a = elem('a', { 'href': result, 'download': `${fileTitle}.json` });

        a.click();
    }

    reader.readAsDataURL(file);
}                         

function isJsonFile(file: File) {
    const LENGTH_JSON_FILE_EXTENSION = 5;
    const position = file.name.length - LENGTH_JSON_FILE_EXTENSION;

    return file.name.indexOf('.json', position) !== -1;
}

function readFile(file: File) {
    if(!isJsonFile(file)) {
        return alert('Not a JSON file.');
    }

    const reader = new FileReader();

    reader.readAsText(file);
    reader.onload = function(e: ProgressEvent<FileReader>) {
       const reader = e.target; 

       if (!reader) {
           return;
       } else if (!reader.result || typeof reader.result !== 'string') {
           return;
       }

       jsonToScript(reader.result);
    }
}                            

function loadFile() {
    const input = elem('input', { 'type': 'file', 'accept': 'application/json'  });

    input.addEventListener('change', () => {
        const file = input.files ? input.files[0] : null;

        if (file) {
            readFile(file);
        }
    });

    input.click();
}

function loadExample(e: Event) {
    if(!(e.target instanceof HTMLOptionElement)) {
        return;
    } else if(!Object.keys(file.examples).includes(e.target.value)) {
        return;
    }
    
    const exampleName = e.target.value as keyof typeof file.examples;
    const script = file.examples[exampleName];

    clearScript();

    script.forEach((block) => {
        htmlScript.appendChild(Block.create.apply(null, block));
    });

    Menu.runSoon();
}

export const file = {
    saveLocal,
    restoreLocal,
    examples: {
        circle,
        spiral,
        triangle,
    },
}

document.querySelector('[data-role=clear]')?.addEventListener('click', clearScript);
document.querySelector('[data-role=save]')?.addEventListener('click', saveFile);
document.querySelector('[data-role=load]')?.addEventListener('click', loadFile);
document.querySelector('[data-role=choose-example]')?.addEventListener('click', loadExample);
window.addEventListener('unload', file.saveLocal);
window.addEventListener('load', file.restoreLocal);
