import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../contexts/AuthContext'
import { useCallback, useContext, useState, useEffect } from 'react'
import { Loader } from '../components/Loader'
import { LinksList } from '../components/LinksList'

export function LinksPage() {
    const [links, setLinks] = useState([])
    const { loading, request } = useHttp()
    const { token } = useContext(AuthContext)
    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log(fetched)
            setLinks(fetched.links)
        } catch (error) { }
    }, [token, request])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (loading) {
        return <Loader />
    }


    return (
        <>
            {!loading && <LinksList links={links} />}
        </>
    )
}
