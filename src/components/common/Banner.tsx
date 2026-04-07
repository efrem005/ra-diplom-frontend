import type { ReactElement } from 'react'

function Banner(): ReactElement {
  return (
    <div className="banner">
      <img src="/ra-diplom-frontend/img/banner.jpg" className="img-fluid" alt="К весне готовы!" />
      <h2 className="banner-header">К весне готовы!</h2>
    </div>
  )
}

export default Banner
