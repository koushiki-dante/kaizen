export function trigger<T>(target: EventTarget, name: string, data?: T ) {
    target.dispatchEvent(new CustomEvent(name, { bubbles: true, cancelable: false, detail: data }));
}
