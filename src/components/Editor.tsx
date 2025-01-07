'use client'
import { updateEntry } from '@/utils/api';
import React, {useState} from 'react';
import { useAutosave } from 'react-autosave';

const Editor = ({entry}) => {

    const [value, setValue] = useState(entry.content)
    const [isLoading, setIsLoading] = useState(false)

    useAutosave({
        data: value,
        onSave: async (_value) => {
            setIsLoading(true)
            const updatedEntry = await updateEntry(entry.id, _value)
            setIsLoading(false)
        }
    })

    return (
        <div className="w-full h-full">
            <div className="w-full h-16 flex items-center justify-center">
                {isLoading ? 'Saving...' : 'Saved'}
            </div>
            <textarea 
                value={value} 
                onChange={(e) => setValue(e.target.value)}
                className="w-full h-full p-8 text-xl outline-none"
            />  
        </div>
    )
}

export default Editor;