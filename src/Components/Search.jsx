import React from 'react'
import '../Search.css';
export default function Search() {
    const [trainLine, setTrainLine] = React.useState('')
    const [trainData, setTrainData] = React.useState({})
    const [isLoading, setLoading] = React.useState(false)
    const [isValidData, setIsValidData] = React.useState();
    const [submitted, setSubmitted] = React.useState(false);

    const trainStatus = {
        '0': 'Special Service',
        '1': 'Closed',
        '2': 'Suspended',
        '3': 'Part Suspended',
        '4': 'Planned Closure',
        '5': 'Part Closure',
        '6': 'Severe Delays',
        '7': 'Reduced Service',
        '8': 'Bus Service',
        '9': 'Minor Delays',
        '10': 'Good Service',
        '11': 'Part Closed',
        '12': 'Exit Only',
        '13': 'No Step Free Access',
        '14': 'Change of Frequency',
        '15': 'Diverted',
        '16': 'Not Running',
        '17': 'Issues Reported',
        '18': 'No Issues',
        '19': 'Information',
        '20': 'No Service',
    }

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
                    <p className='line-details'> {trainStatus[trainData.lineStatuses[0].statusSeverity]}</p>
                    <p className='line-details'> {trainData.serviceTypes[1]?.name ? 'Night Tube ✅' : ''}</p>

                </div>
            )}
        </>
    )
}