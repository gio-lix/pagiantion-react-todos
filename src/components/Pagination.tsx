import {FC, useEffect, useState} from "react"
import axios from "axios";
import Render from "./Render";
import {TypeProps} from "../type/types";


const Pagination = () => {
    const [state, setState] = useState<TypeProps[]>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);

    const [pageNumberLimit, setPageNumberLimit] = useState<number>(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState<number>(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState<number>(0);


    const handleClick = (e: any) => {
        setCurrentPage(Number(e.target.id))
    }


    const pages = []
    for (let i = 1; i <= Math.ceil(state?.length! / itemsPerPage); i++) {
        pages.push(i)
    }


    const renderPageNumber = pages?.map((number: any) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <button  key={number} id={number} onClick={handleClick}
                         className={`${currentPage == number ? 'bg-white text-black' : 'text-white'} w-10 h-10 mx-1 border border-white-400`}>
                    {number}
                </button>
            )
        } else {
            return  null
        }
    })

    const indexOfLastItems = currentPage * itemsPerPage
    const indexOfFirstItems = indexOfLastItems - itemsPerPage

    const currentItems = state?.slice(indexOfFirstItems, indexOfLastItems)

    useEffect(() => {
        const api = async () => {
            const {data} = await axios.get(`https://jsonplaceholder.typicode.com/todos`)
            setState(data)
        }
        api()
    }, [])

    const nextPage = () => {
        setCurrentPage(currentPage + 1)
        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
    }
    const prevPage = () => {
        setCurrentPage(currentPage - 1)
        if ((currentPage - 1 ) % pageNumberLimit == 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
    }

    let pageIncrementBtn = null
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <span className='w-10 h-10 text-center  mr-1' onClick={nextPage}>&hellip;</span>
    }

    let pageDecrementBtn = null
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <span className='w-10 h-10 text-center  mr-1' onClick={prevPage}>&hellip;</span>
    }
    return (
        <div className='text-white  mt-20'>
            <div>
                {currentItems?.map((el: TypeProps) => (
                    <Render items={el} key={el.id}/>
                ))}
            </div>
                <div className='flex my-10 justify-center '>
                    <button  onClick={prevPage} disabled={currentPage == pages[0]} className=' px-2 h-10 border border-gray-200'>Prev</button>
                    {pageDecrementBtn}
                    {renderPageNumber}
                    {pageIncrementBtn}
                    <button  onClick={nextPage} disabled={currentPage == pages[pages.length - 1]}  className=' px-2 h-10 border border-gray-200'>Next</button>
                </div>


        </div>
    )
}
export default Pagination