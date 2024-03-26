type Attrs = { [key: string]: string; }

export function elem<K extends keyof HTMLElementTagNameMap>(name: K, attrs?: Attrs, children?: any[]): HTMLElementTagNameMap[K] {
    const e = document.createElement(name);

    if (attrs) {
        Object.keys(attrs).forEach((key) => {
            e.setAttribute(key, attrs[key]);
        });
    }

    if (children) {
        children.forEach((child) => {
            if (typeof child === 'string') {
                e.appendChild(document.createTextNode(child));
            } else {
                e.appendChild(child);
            }
        });
    }

    return e;
}

export function trigger(name: string, target: EventTarget) {
    target.dispatchEvent(new CustomEvent(name, { bubbles: true, cancelable: false }));
}

export function getAndCloneHtmlTemplate(templateId: string, selector: string): Element | null {
    const template = document.getElementById(templateId);

    if (!(template instanceof HTMLTemplateElement)) {
        return null;
    }

    const clone = template.content.cloneNode(true) as DocumentFragment;

    return clone.querySelector(selector);
}
