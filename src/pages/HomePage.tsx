import TopSales from '../components/catalog/TopSales'
import Catalog from '../components/catalog/Catalog'
import Banner from '../components/common/Banner'

function HomePage() {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner />
          <TopSales />
          <Catalog searchQuery="" searchText="" onSearchTextChange={() => { }} onSearchSubmit={() => { }} />
        </div>
      </div>
    </main>
  )
}

export default HomePage
