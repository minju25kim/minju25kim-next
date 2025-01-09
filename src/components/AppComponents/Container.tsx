import BreadCrumb from '@/components/AppComponents/BreadCrumb'
import Search from '@/components/AppComponents/Search'

function Container({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="container p-4 mx-auto max-w-7xl">
            <div className='flex flex-col items-start sm:flex-row sm:justify-between sm:items-center mt-4 px-2 gap-1'>
                <BreadCrumb />
                <Search />
            </div>
            {children}
        </main>
    )
}

export default Container