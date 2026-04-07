import type { SubmitEvent } from 'react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import Catalog from '../components/catalog/Catalog'
import Banner from '../components/common/Banner'

function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') || ''
  const [searchText, setSearchText] = useState<string>(searchQuery)

  useEffect(() => {
    setSearchText(searchQuery)
  }, [searchQuery])

  const handleSearchSubmit = (e: SubmitEvent): void => {
    e.preventDefault()
    if (searchText.trim()) {
      setSearchParams({ q: searchText.trim() })
    } else {
      setSearchParams({})
    }
  }

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner />
          <Catalog searchQuery={searchQuery} searchText={searchText} onSearchTextChange={setSearchText} onSearchSubmit={handleSearchSubmit} />
        </div>
      </div>
    </main>
  )
}

export default CatalogPage
