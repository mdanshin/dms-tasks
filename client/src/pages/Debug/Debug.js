export default function debug() {
    return (
    <>
        {console.log('REACT_APP_API_URL', process.env.REACT_APP_API_URL)}
        {console.log('NODE_ENV', process.env.NODE_ENV)}
    </>)
}