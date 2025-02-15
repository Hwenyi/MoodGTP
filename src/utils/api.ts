const createURL = (path) => window.location.origin + path

export const createNewEntry = async() => {
    
    const res = await fetch(new Request(createURL('/api/journal'),{
        method: 'POST',
    }))

    if(res.ok){
        const data = await res.json()
        return data.data
    }

}

export const updateEntry = async(id, content) => {
    
    const res = await fetch(new Request(createURL(`/api/journal/${id}`),{
        method: 'PATCH',
        body: JSON.stringify({content})
    }))

    if(!res.ok) {
        throw new Error('Failed to update entry.')
    }

    const data = await res.json()
    return data.data

}

export const askQuestion = async(question) => {

    const res = await fetch(new Request(createURL('/api/journal/question'),{
            method: 'POST',
            body: JSON.stringify({question})
        }),
    )

    if(res.ok) {
        const data = await res.json()
        return data.data
    }
}