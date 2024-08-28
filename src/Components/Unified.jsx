import React from 'react';
export default function Unified() {

    const [trainData, setTrainData] = React.useState({}) // json object

    React.useEffect(() => {
        async function getAllTrainAPIData() {
            const url = 'https://api.tfl.gov.uk/Line/Mode/tube/Status'
            const response = await fetch(url)
            const data = await response.json();
            setTrainData(data)
        }
        getAllTrainAPIData()
    }, [])
    console.log(trainData)

    return (
        <>
        </>
    )
}