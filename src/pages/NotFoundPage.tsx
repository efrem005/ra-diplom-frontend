import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img src="/ra-diplom-frontend/img/banner.jpg" className="img-fluid" alt="К весне готовы!" />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          <section className="top-sales">
            <h2 className="text-center">Страница не найдена</h2>
            <p className="text-center">Извините, такая страница не найдена!</p>
            <p className="text-center">вернуться на: <Link className="text-uppercase" to="/ra-diplom-frontend/">главную страницу</Link></p>
          </section>
        </div>
      </div>
    </main>
  )
}

export default NotFoundPage
