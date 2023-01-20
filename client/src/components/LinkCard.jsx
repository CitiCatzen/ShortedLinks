export function LinkCard({ link }) {
    console.log(link)
    return (
        <>
            <h2>The Link's Data:</h2>
            <p>
                Your Link:
                <a href={link.to} >{link.to}
                </a>
            </p>
            <p>
                From:
                <a href={link.from} >{link.from}
                </a>
            </p>
            <p>Click's Count: <strong>{link.click}</strong> </p>
            <p>Date Of Create: <strong>{new Date(link.date).toLocaleDateString()}</strong> </p>
        </>
    )
}
