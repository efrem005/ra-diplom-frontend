import { Outlet } from 'react-router'
import Footer from '../../components/layout/Footer'
import Header from '../../components/layout/Header'

function LayoutTemplate() {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	)
}

export default LayoutTemplate
