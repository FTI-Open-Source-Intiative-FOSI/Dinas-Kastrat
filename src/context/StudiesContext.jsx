import React, { createContext, useContext, useEffect, useState } from 'react'
import { studies as mock } from '../data/mockStudies'

const StudiesContext = createContext(null)

export function StudiesProvider({ children }) {
  const [studies, setStudies] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchStudies = async () => {
    setLoading(true)
    try {
      const localData = localStorage.getItem('kastrat_studies')
      if (localData) {
        setStudies(JSON.parse(localData))
      } else {
        setStudies(mock)
        localStorage.setItem('kastrat_studies', JSON.stringify(mock))
      }
    } catch (e) {
      console.error(e)
      setStudies(mock)
    }
    setLoading(false)
  }

  const addStudy = (newStudy) => {
    const updated = [newStudy, ...studies]
    setStudies(updated)
    localStorage.setItem('kastrat_studies', JSON.stringify(updated))
  }

  useEffect(() => {
    fetchStudies()
  }, [])

  const refresh = () => {
    fetchStudies()
  }

  return (
    <StudiesContext.Provider value={{ studies, loading, refresh, addStudy }}>
      {children}
    </StudiesContext.Provider>
  )
}

export const useStudies = () => useContext(StudiesContext)
