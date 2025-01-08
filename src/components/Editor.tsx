'use client'
import { updateEntry } from '@/utils/api';
import React, {useState} from 'react';
import { useAutosave } from 'react-autosave';

const Editor = ({entry}) => {

    const [value, setValue] = useState(entry.content)
    const [isLoading, setIsLoading] = useState(false)

    const [analysis, setAnalysis] = useState(entry.analysis)

    const { mood = '', summary = '', subject = '', color = '', sentimentScore = 0, negative = false } =
    analysis ?? {}

    const analysisDate = [
        {name: 'Mood', value: mood},
        {name: 'Summary', value: summary},
        {name: 'Subject', value: subject},
        {name: 'sentimentScore', value: sentimentScore},
        {name: 'Negetive', value: negative ? 'Yes' : 'No'},
    ]

    useAutosave({
        data: value,
        onSave: async (_value) => {
            setIsLoading(true)
            const updatedEntry = await updateEntry(entry.id, _value)
            setAnalysis(updatedEntry.analysis)
            setIsLoading(false)
        }
    })

    return (
        <div className="w-full h-full overflow-hidden grid grid-cols-3">
            <div className='col-span-2'>
                {isLoading && <div>... loading</div>}
                <textarea 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full h-full p-8 text-xl outline-none"
                />  
            </div>

            <div className="border-l border-black/10">
            <div className="px-6 py-10" style={{backgroundColor: color}}>
                <h2 className="text-2xl">Analysis</h2>
            </div>
                <div>
                    <ul>
                        {analysisDate.map((data) => (
                            <li key={data.name} 
                            className="px-2 py-4 border-t border-black/10 flex items-center justify-between"
                            >
                                <span className="text-lg font-semibold">{data.name}</span>
                                <span>{data.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Editor;