import React from 'react'
import '../Search.css';
export default function Search() {
    const [trainLine, setTrainLine] = React.useState('')
    const [trainData, setTrainData] = React.useState({})
    const [isLoading, setLoading] = React.useState(false)
    const [isValidData, setIsValidData] = React.useState();
    const [submitted, setSubmitted] = React.useState(false);

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
                    setTrainData(data[0]); // index at 0
                    setIsValidData(true);
                }
            }
            catch (error) {
                console.log("ERROR: ",error)
            }
            finally {
                setLoading(false)
                setSubmitted(true)
            }
        }
    }

    React.useEffect(() => {
        if (trainData) {
            console.log(trainData)
            //console.log(trainData.lineStatuses[0].statusSeverityDescription)

        }
        else {
            console.log('promise not resolved YET')
        }
    }, [trainData]) // log when train data updats


    return (
        <>
        <h1 className='title'>TFL Train Service</h1>
        <div className='search-bar-container'>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    placeholder='Search for Train Line'
                    value={trainLine}
                    name='train-line-search'
                    onChange={handleChange}
                    className='search-bar'
                    />
            </form>
            </div>
            {isLoading && submitted && <h1>Loading data</h1>}
            {!isLoading && !isValidData && submitted && <p>Invalid Train Line</p>}
            {!isLoading && isValidData && trainData && submitted &&(
                <div className='train-details-container'>
                    <h1 className='title' id='line-status'>Line Status</h1>
                    <p className='line-details'>Train Line: {trainData.name}</p>
                    <p className='line-details'> {trainData.lineStatuses[0].statusSeverityDescription}</p>

                </div>
            )}
        </>
    )
}