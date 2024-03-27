export function trigger<T>(target: EventTarget, name: string, data?: T ) {
    target.dispatchEvent(new CustomEvent(name, { bubbles: true, cancelable: false, detail: data }));
}

export function getHtmlTemplate(templateId: string, selector: string): Element | null {
    const template = document.getElementById(templateId);

    if (!(template instanceof HTMLTemplateElement)) {
        return null;
    }

    const clone = template.content.cloneNode(true) as DocumentFragment;

    return clone.querySelector(selector);
}

