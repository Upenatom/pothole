import './IndexPage.css'
import { useState, useEffect } from 'react'
import * as ticketsAPI from '../../utilities/tickets-api'
import OverflowScrolling from 'react-overflow-scrolling';
import NavBar from '../../components/NavBar/NavBar'
import Search from '../../components/Search/Search'
import Map from '../../components/Map/Map'
import TicketList from '../../components/TicketList/TicketList'


export default function IndexPage({ user, handleLogout }) {


    // const [statePosition,setPosition]=useState([49.895077,-97.138451]) //winnipeg
    const [statePosition, setPosition] = useState([43.651070, -79.347015])  //Toronto  
    const [ticketItems, setTicketItems] = useState([]);
    const [indexLoading, setindexLoading] = useState(false);


    //delete post CRUD function
    let handleOnClickDelete = (ticketId) => {
        let jwt = localStorage.getItem('token')
        let options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt
            }

        }
        ticketsAPI.deleteOne(ticketId, options).then(() => fetchTicketItems())
    }


    //filter functions
    let fetchTicketItems = async () => {
        setindexLoading(true)
        const tickets = await ticketsAPI.getAll()
        setTicketItems(tickets)
        setindexLoading(false)
    }

    let handleChangeCategory = async (e) => {
        if (e.target.value !== "Select Category") {
            setindexLoading(true)
            const tickets = await ticketsAPI.getbyCategory(e.target.value)
            setTicketItems(tickets)
            setindexLoading(false)
        }

    }
    let handleYourTickets = async (userid) => {
        setindexLoading(true)
        const yourTickets = await ticketsAPI.getYourTickets(userid)
        setTicketItems(yourTickets)
        setindexLoading(false)
    }
    let handleMostConfirmed = async () => {
        setindexLoading(true)
        const mostConfirmed = await ticketsAPI.mostConfirmed()
        setTicketItems(mostConfirmed)
        setindexLoading(false)
    }

    let handleMostResolved = async () => {
        setindexLoading(true)
        const mostResolved = await ticketsAPI.mostResolved()
        setTicketItems(mostResolved)
        setindexLoading(false)
    }
    let handleShowResolved = async () => {
        setindexLoading(true)
        const showResolved = await ticketsAPI.showResolved()
        setTicketItems(showResolved)
        setindexLoading(false)
    }

    let handleMarkerClickSearch = async (ticketid, lat, long) => {
        setindexLoading(true)
        setPosition([lat, long])
        const markerClickSearch = await ticketsAPI.markerSearch(ticketid)
        setTicketItems([markerClickSearch])
        setindexLoading(false)
    }



    useEffect(() => {

        fetchTicketItems()
    }, []
    )


    return (
        <main className="">
            <NavBar handleLogout={handleLogout} />
            <div className="index-map-search">
                <Search
                    fetchTicketItems={fetchTicketItems}
                    handleYourTickets={handleYourTickets}
                    handleChangeCategory={handleChangeCategory}
                    handleMostConfirmed={handleMostConfirmed}
                    handleMostResolved={handleMostResolved}
                    handleShowResolved={handleShowResolved}
                    user={user}
                />
                <Map className="index-map" setPosition={setPosition}
                    statePosition={statePosition}
                    ticketItems={ticketItems}
                    handleMarkerClickSearch={handleMarkerClickSearch}
                />
                <div>
                    <h2 id="stat-head">Statistics:</h2>
                    <div className="stats">
                        <h4>User Leaderboard:</h4>
                        <p>Coming Soon</p>
                        <h4>Top Cities:</h4>
                        <p>Coming Soon</p>
                        <h4>Worst Cities:</h4>
                        <p>Coming Soon</p>
                    </div>
                </div>
            </div>
            {indexLoading ? <div className='index-loader'>Loading ...</div> :
                <OverflowScrolling className='overflow-scrolling'>
                    <TicketList id="list"
                        ticketItems={ticketItems}
                        user={user}
                        handleOnClickDelete={handleOnClickDelete}
                        fetchTicketItems={fetchTicketItems}
                        setPosition={setPosition}
                    />
                </OverflowScrolling>}
        </main>
    )

}