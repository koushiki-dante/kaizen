import axios, { AxiosError } from 'axios'
import { trigger, getHtmlTemplate } from './utils';

interface GithubUser {
   login: string;
   id: number;
   node_id: string;
   avatar_url: string;
   gravatar_id: string;
   url: string;
   html_url: string;
   followers_url: string;
   following_url: string;
   gists_url: string;
   starred_url: string;
   subscriptions_url: string;
   organizations_url: string;
   repos_url: string;
   events_url: string;
   received_events_url: string;
   type: string;
   site_admin: boolean;
   name: string | null;
   company: string | null;
   blog: string | null;
   location: string | null;
   email: string | null;
   hireable: boolean | null;
   bio: string | null;
   twitter_username: string | null;
   public_repos: number;
   public_gists: number;
   followers: number;
   following: number;
   created_at: string;
   updated_at: string;
}

type ResponseSuccess = {
    data: GithubUser,
    status: 'SUCCESS',
}

type ResponseError = {
    status: 'ERR_NOT_FOUND' | 'ERR_UNKOWN' | 'ERR_UNEXPECTED',
}

type Response = ResponseSuccess | ResponseError;

const root = document.querySelector('[data-role=root]') as HTMLDivElement;
const form = document.getElementById('search') as HTMLDivElement;

function search(e: SubmitEvent) {
    e.preventDefault();

    const input = form.querySelector('[data-role=search_input]') as HTMLInputElement;
    const query = input.value.trim();

    if (query !== '') {
        trigger(form, 'request', query);
    }
}

function setRootState(state: string) {
    root.replaceChildren();
    root.setAttribute('data-state', state);
}

function handleLoading() {
    setRootState('LOADING');
}

async function getGithubUser(username: string): Promise<Response> {
    try {
        const URL = `https://api.github.com/users/${username}`;
        const axiosRes = await axios.get<GithubUser>(URL);

        return {
            status: 'SUCCESS',
            data: axiosRes.data,
        };
    } catch (err) {
        if (!(err instanceof AxiosError)) {
            return {
                status: 'ERR_UNKOWN',
            };
        } 

        switch (err.request.status) {
            case 404: 
                return {
                    status: 'ERR_NOT_FOUND',
                };
            default:
                return {
                    status: 'ERR_UNEXPECTED',
                };
        }
    }
}

async function handleRequest(e: Event) {
    if (!(e instanceof CustomEvent)) {
        return;
    }
    
    const username = e.detail as string;

    trigger(document, 'loading');

    const res = await getGithubUser(username);

    trigger(document, 'response', res);
}

function setElement(e: HTMLElement, field: string | null) {
    if (field !== null) {
        e.textContent = field;
    } else {
        e.textContent = 'Not Available';
        e.setAttribute('data-state', 'disabled');
    }
}

function buildCardComponent(user: GithubUser): HTMLElement {
    const c = getHtmlTemplate('user_card_template', '[data-role=card]') as HTMLElement;
    const options = {
        'year': 'numeric', 
        'month': 'long', 
        'day': '2-digit', 
    } satisfies Intl.DateTimeFormatOptions;

    c.querySelector('[data-role=card_login]')!.textContent = user.login;
    c.querySelector('[data-role=card_name]')!.textContent = user.name;
    c.querySelector('[data-role=card_bio]')!.textContent = user.bio || 'This profile has no bio.';
    c.querySelector('[data-role=card_followers]')!.textContent = String(user.followers);
    c.querySelector('[data-role=card_following]')!.textContent = String(user.following);
    c.querySelector('[data-role=card_public_repos]')!.textContent = String(user.public_repos);
    c.querySelector('[data-role=card_created_at]')!.textContent = new Date(user.created_at).toLocaleDateString('en-US', options);
    c.querySelector('[data-role=card_html_url]')!.textContent = user.html_url;
    (c.querySelector('[data-role=card_html_url]') as HTMLAnchorElement)!.href = user.html_url || 'Not Available';
    (c.querySelector('[data-role=card_avatar]') as HTMLImageElement)!.src = user.avatar_url;

    setElement(c.querySelector('[data-role=card_company]')!, user.company);
    setElement(c.querySelector('[data-role=card_location]')!, user.location);
    setElement(c.querySelector('[data-role=card_twitter_username]')!, user.twitter_username);

    return c;
}

function render(user: GithubUser) {
    setRootState('NORMAL');
    root.appendChild(buildCardComponent(user));
}

function handleResponse(e: Event) {
    if (!(e instanceof CustomEvent)) {
        return;
    }

    const res = e.detail as Response;

    switch (res.status) {
        case 'SUCCESS':
            render(res.data);
            return;
        case 'ERR_NOT_FOUND':
            setRootState('ERR-NOT-FOUND');
            return;
        case 'ERR_UNEXPECTED':
            setRootState('ERR-UNEXPECTED');
            return;
        case 'ERR_UNKOWN':
            setRootState('ERR-UNKOWN');
            return;
    }
}

form.addEventListener('submit', search);
document.addEventListener('loading', handleLoading);
document.addEventListener('request', handleRequest);
document.addEventListener('response', handleResponse);
