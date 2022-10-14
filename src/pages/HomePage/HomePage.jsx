import './HomePage.css'
import NavBar from '../../components/NavBar/NavBar'

export default function HomePage({handleLogout}) {
    return(
        <main className="">
            <NavBar handleLogout={handleLogout}/>
            <h1>About Route Ticket</h1>
            <p className="home-text">
                Route Ticket was developed to connect infrustructure planners with their citizens to 
                provide improved and inexpensive data for roadway and infrastructure maintenance and planning. 
            </p>
            <p className="home-text">
                Users can create an account and report issues along their route by opening 
                a "Route Ticket". Whether it be potholes, snow obstructions, poor signage or other concerns,
                Users can report a unique issue by selecting "New Ticket" and providing details including 
                map position and an optional image.
            </p>
            <p className="home-text">
                If the issue of concern already has an active ticket it will appear on the map. A user can 
                cast a confirmation vote on the ticket to indicate extra urgency to resolve the issue.  Similarily, 
                users can vote on tickets that are resolved to assist with a status and filtering algorithm. 
            </p>
            <img className="home-logo" src='/images/Earth.gif' alt ='Logo'/>
            <h1>Development</h1>
            <p className="home-text">
                Route Ticket is currently undergoing testing and further development to add additional functionality. 
                Please test the website and report any issues or suggestions to casetrait@gmail.com or randolphcrasto1@gmail.com
            </p>
        </main>
    )
}
