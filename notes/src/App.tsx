import { ChangeEvent, useEffect, useState } from 'react';
import { useLocalStorage } from "@uidotdev/usehooks";
import { NewNoteCard } from './components/NewNoteCard';
import { NoteCard } from './components/NoteCard';
import { toast  } from 'sonner';
import logo from './assets/logo-nlw-expert.svg';

export interface Note {
    id: string
    date: Date 
    content: string
}

export function App() {
    const [search, setSearch] = useState('');
    const [notes, setNotes] = useLocalStorage<Note[]>('notes', []); 

    function handleOnSearch(e: ChangeEvent<HTMLInputElement>) {
        const query = e.target.value;

        setSearch(query);
    }

    function handleOnSaveNote(e: Event) {
        if (!(e instanceof CustomEvent)) {
            return;
        }

        const note = {
            id: crypto.randomUUID(),
            date: new Date(),
            content: e.detail as string,
        }

        // I prefer to avoid to use the spread operator for copying objects due
        // to performance issues, but given the scope of the project i think 
        // it's all right. The application it's not going to be affected at all.
        setNotes([note, ...notes]);

        toast.success('Nota criada com sucesso!');
    }

    function handleOnDeleteNote(e: Event) {
        if (!(e instanceof CustomEvent)) {
            return;
        }

        const id = e.detail as string;

        setNotes(notes.filter((note) => note.id !== id));
            
        toast.success('Nota deletada com sucesso!');
    }

    useEffect(() => {
        document.addEventListener('save-note', handleOnSaveNote);
        document.addEventListener('delete-note', handleOnDeleteNote);

        return () => {
            document.removeEventListener('save-note', handleOnSaveNote);
            document.removeEventListener('delete-note', handleOnDeleteNote);
        }
    }, [notes]);

    let displayedNotes = search !== '' ? 
        notes.filter((note) => note.content.toLowerCase().includes(search.toLowerCase())) : 
        notes;

    return (
        <div className='max-w-6xl mx-auto my-12 space-y-6 px-5'>
            <img 
                src={logo}
                alt='NLW Expert'
                loading='lazy'
                decoding='async'
            />

            <form className='w-full'>
                <input
                    onChange={handleOnSearch}
                    type='text'
                    placeholder='Busque em suas notas...'
                    className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500'
                />
            </form>

            <div className='h-px bg-slate-700' />

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]'>
                <NewNoteCard />
                
                {displayedNotes.map(note => {
                    return <NoteCard key={note.id} note={note} />
                })}
            </div>
        </div>
    );
}
