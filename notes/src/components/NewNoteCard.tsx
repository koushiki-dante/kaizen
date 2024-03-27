import * as Dialog from '@radix-ui/react-dialog'; 
import { X } from 'lucide-react';
import { ChangeEvent,  useState } from 'react';
import { trigger } from '../utils';
import { toast } from 'sonner';

let speechRecognition: SpeechRecognition | null = null;

export function NewNoteCard() {
    const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
    const [isRecording, setIsRecording] = useState(false);
    const [content, setContent] = useState('');

    function handleStartEditing() {
        setShouldShowOnboarding(false);
    }

    function handleOnChangedContent(e: ChangeEvent<HTMLTextAreaElement>) {
        setContent(e.target.value);

        if(e.target.value === '') {
            setShouldShowOnboarding(true);
        }
    }

    function handleOnSaveNoteRequest() {
        trigger(document, 'save-note', content);
        setShouldShowOnboarding(true);
    }

    function handleOnStartRecording() {
        const isSpeechRecognitionAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

        if(!isSpeechRecognitionAvailable) {
            toast.error('Infelizmente o seu navegador não suporta a API de gravação!');
            return;
        }

        setShouldShowOnboarding(false);
        setIsRecording(true);

        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

        speechRecognition = new SpeechRecognitionAPI();

        speechRecognition.lang = 'pt-BR';
        speechRecognition.continuous = true;
        speechRecognition.maxAlternatives = 1;
        speechRecognition.interimResults = true;

        speechRecognition.onresult = (e) => { 
            const transcription = Array.from(e.results).reduce((text, result) => {
                return text.concat(result[0].transcript);
            }, '');

            setContent(transcription);
        };

        speechRecognition.onerror = (e) => console.error(e);

        speechRecognition.start();
    }
    
    function handleOnStopRecording() {
        setIsRecording(false);
    }

    function reset() {
        setIsRecording(false);
        setShouldShowOnboarding(true);
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger className="rounded-md flex flex-col gap-y-3 text-left p-5 bg-slate-700 overflow-hidden relative outline-none hover:ring-slate-600 hover:ring-2 focus-visible:ring-2 focus-visible:ring-lime-400">
                <span className="text-sm font-medium text-slate-200">
                    Adicionar nota
                </span>
                <p className="text-sm leading-6 text-slate-400">
                    Grave uma nota em audio que será convertida para texto automaticamente.
                </p>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='inset-0 fixed bg-black/50' />

                <Dialog.Content onCloseAutoFocus={reset} className='fixed inset-0 flex flex-col w-full bg-slate-700 outline-none overflow-hidden md:max-w-[640px] md:h-[60vh] md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-md md:inset-auto'>
                    <Dialog.Close className='absolute right-0 top-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-100'>
                        <X className='size-5' />
                    </Dialog.Close>
                    <form 
                        className='flex flex-col flex-1'
                    >
                        <div className='flex flex-col flex-1 gap-3 p-5'>
                            <span className="text-sm font-medium text-slate-300">
                                Adicionar nota
                            </span>
                            { shouldShowOnboarding ? 
                                (
                                    <p className="text-sm leading-6 text-slate-400">
                                        Comece 
                                        {' '}
                                        <button onClick={handleOnStartRecording} type='button' className='font-medium text-lime-400 hover:underline'>gravando uma nota</button> 
                                        {' '}
                                        em áudio ou se preferir
                                        {' '}
                                        <button onClick={handleStartEditing} className='font-medium text-lime-400 hover:underline'>utilize apenas texto</button>.
                                    </p> 
                                ) : (
                                    <textarea 
                                        autoFocus
                                        onChange={handleOnChangedContent}
                                        className='flex-1 text-sm leading-6 text-slate-400 bg-transparent outline-none resize-none'
                                    />
                                ) 
                            }
                        </div>

                        { isRecording ?
                            (
                                <button 
                                    type='button'
                                    onClick={handleOnStopRecording}
                                    className='flex items-center justify-center gap-x-2 w-full py-4 bg-slate-900 text-slate-300 text-center text-sm font-medium outline-none hover:bg-slate-800'
                                >
                                    <div className='size-3 rounded-full bg-red-500 animate-pulse' />
                                    Gravando (clique p/ interromper)
                                </button>
                            ) : (
                                <button 
                                    type='button'
                                    onClick={handleOnSaveNoteRequest}
                                    className='w-full py-4 bg-lime-400 text-lime-950 text-center text-sm font-medium outline-none hover:bg-lime-500'
                                >
                                    Salvar nota
                                </button>
                            )
                        }
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
