import React from 'react'
export default function Interface() {
    const [trainLine, setTrainLine] = React.useState('')
    const [trainData, setTrainData] = React.useState({})
    const [isLoading, setLoading] = React.useState(false)

    // STRUCTURE
    /* get user data from interface.jsx
    pass data down to View
    Have View update and display everything based on props received from here
    */
    function handleChange(e) {
        setTrainLine(e.target.value)
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (trainLine) {
            setLoading(true)
            const apiURL = `https://api.tfl.gov.uk/Line/${trainLine}/status`
            try {
                const response = await fetch(apiURL)
                const data = await response.json();
                setTrainData(data);
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }
    }

    React.useEffect(() => {
        if (trainData) {
            console.log(trainData)
        }
        else {
            console.log('promise not resolved YET')
        }
    }, [trainData]) // log when train data updats


    return (
        <>
        <h1>Train Line Data</h1>
        <div className='search-bar'>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    placeholder='Search for Train Line'
                    value={trainLine}
                    name='train-line-search'
                    onChange={handleChange}
                    />
            </form>
            </div>
        </>
    )
}