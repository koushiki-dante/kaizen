import * as Dialog from '@radix-ui/react-dialog';
import { formatDistanceToNow  } from 'date-fns';
import { ptBR  } from 'date-fns/locale';
import { X } from 'lucide-react';
import { FormEvent } from 'react';
import { Note } from '../App';
import { trigger } from '../utils';

function captalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

interface NoteCardProps {
    note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
    const formattedDate = captalize(formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true }));

    function handleOnDeleteNoteRequest(e: FormEvent, noteId: string) {
        e.preventDefault();

        trigger(document, 'delete-note', noteId);
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger className="rounded-md flex flex-col gap-y-3 text-left p-5 bg-slate-800 overflow-hidden relative outline-none hover:ring-slate-600 hover:ring-2 focus-visible:ring-2 focus-visible:ring-lime-400">
                <span className="text-sm font-medium text-slate-300">
                    {formattedDate}
                </span>
                <p className="text-sm leading-6 text-slate-400">
                    {note.content}
                </p>
            
                <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='inset-0 fixed bg-black/50' />

                <Dialog.Content className='fixed inset-0 flex flex-col w-full bg-slate-700 outline-none overflow-hidden md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:h-[60vh] md:rounded-md md:max-w-[640px]'>
                    <Dialog.Close className='absolute right-0 top-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-100'>
                        <X className='size-5' />
                    </Dialog.Close>
                    <div className='flex flex-1 flex-col gap-3 p-5'>
                        <span className="text-sm font-medium text-slate-300">
                            {formattedDate}
                        </span>
                        <p className="text-sm leading-6 text-slate-400">
                            {note.content}
                        </p>
                    </div>

                    <form onSubmit={(e) => handleOnDeleteNoteRequest(e, note.id)}>
                        <button 
                            type='submit'
                            className='w-full py-4 bg-slate-800 text-center text-sm font-medium outline-none group'
                        >
                            Deseja <span className='text-red-400 group-hover:underline'>apagar essa nota</span>?
                        </button>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
