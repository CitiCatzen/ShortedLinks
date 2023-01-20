import { useContext } from 'react'
import { useState, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useNavigate } from 'react-router-dom'

export function CreatePage() {
    const navigate = useNavigate()
    const [link, setLink] = useState('')
    const { request } = useHttp()
    const auth = useContext(AuthContext)

    useEffect(() => {
        window.M.updateTextFields()
    })

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', { from: link }, {
                    Authorization: `Bearer ${auth.token}`
                })
                navigate(`/detail/${data.link._id}`)
            } catch (error) { }
        }
    }
    return (
        <div className="row">
            <div className="col s8 offset-s2 blue darken-1" style={{ paddingTop: '2rem', marginTop: '2rem' }}>
                <div className="input-field">
                    <input
                        placeholder="Input link..."
                        id="link"
                        type="text"
                        className="validate yellow-input"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Enter A Link</label>
                </div>
            </div>
        </div>
    )
}
