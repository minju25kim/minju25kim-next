import BreadCrumb from '@/components/AppComponents/BreadCrumb'
import Search from '@/components/AppComponents/Search'

function Header() {
    return (
        <header className='flex flex-col items-start sm:flex-row sm:justify-between sm:items-center gap-2 w-full'>
            <BreadCrumb />
            <Search />
        </header>
    )
}
export default Header