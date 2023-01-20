import { useCallback } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from '../components/Loader'
import { LinkCard } from '../components/LinkCard'
import { AuthContext } from '../contexts/AuthContext'
import { useHttp } from '../hooks/http.hook'

export function DetailPage() {
    const { token } = useContext(AuthContext)
    const [link, setLink] = useState(null)
    const linkId = useParams().id
    const { request, loading } = useHttp()
    const getLink = useCallback(async () => {
        try {
            console.log(token)
            const data = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLink(data.link)
        } catch (error) { }
    }, [token, linkId, request])

    useEffect(() => {
        getLink()
    }, [getLink])

    if (loading) return <Loader />

    return (
        <>
            {!loading && link && <LinkCard link={link} />}
        </>
    )
}
