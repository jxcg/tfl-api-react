import React from 'react'
import '../Search.css';
export default function Search() {
    const [trainLine, setTrainLine] = React.useState('')
    const [trainData, setTrainData] = React.useState({})
    const [isLoading, setLoading] = React.useState(false)
    const [isValidName, setIsValidData] = React.useState();

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
        
            console.log(apiURL)

            try {
                
                const response = await fetch(apiURL)
                const data = await response.json();
                if (response.status === 404) {
                    setIsValidData(false);
                    console.log("This is false")
                }
                else {
                    setTrainData(data);
                    setIsValidData(true);
                }
            }
            catch (error) {
                console.log("ERROR: ",error)
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
        {isLoading ? <h1>Searching for {trainLine} Line</h1> : <h1>London Underground Train Line Data</h1>}
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
            {isValidName && <h2>Data for the {trainLine} Line exists and is valid</h2>}
            </div>
        </>
    )
}