import Map from "../Map/Map";
// import ImageUpload from "../ImageUpload/ImageUpload";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getCurrentLatLng } from '../../utilities/Getloc'
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import './TicketForm.css'

export default function TicketForm({ ticketItems, reporter }) {
    const navigate = useNavigate()
    // const [statePosition,setPosition]=useState([49.895077,-97.138451])  //Winnipeg      
    const [statePosition, setPosition] = useState([43.651070, -79.347015])  //Toronto    
    const [form, setForm] = useState({ reporter: reporter, title: '', category: 'Pothole', description: '', lat: '', long: '' })
    const [loading, setLoading] = useState(false);
    const title = form.title
    const category = form.category
    const description = form.description
    const lat = statePosition[0]
    const long = statePosition[1]



    let handleUserLoc = async () => {
        setLoading(true);
        let userlatlng = await getCurrentLatLng()
        setLoading(false);
        let currloc = [userlatlng.lat, userlatlng.lng]
        setPosition(currloc)

    }
    let handleChange = (e) => {
        setForm(prevForm => {
            return { ...prevForm, [e.target.name]: e.target.value }
        }
        )
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        let body = { ...form, lat: statePosition[0], long: statePosition[1] }
        let jwt = localStorage.getItem('token')
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt
            },
            body: JSON.stringify(body)
        }
        await fetch("/api/tickets", options)
            .then(res => res.json())
            .then(data => setForm({ title: '', category: '', description: '', lat: '', long: '' }))
        navigate("/tickets")

    }

    let formCheck = 'exists'

    return (


        <div className="all-form">
            {loading ? (<div className='form-loader'><div className='loader-row'><div className='loaderglow1' /><div className='loaderglow2' /><div className='loaderglow3' /></div> Loading ...</div>) : null}
            <div className="form-map">
                <Map setPosition={setPosition} formCheck={formCheck} statePosition={statePosition} ticketItems={ticketItems} />
                <p className="form-black">
                    Latitude: <input className="ll-input" name='lat' value={statePosition[0]} onChange={handleChange}></input>
                    Longitude: <input className="ll-input" name='lng' value={statePosition[1]} onChange={handleChange}></input>
                    <button className="form-button" onClick={handleUserLoc}>Use Current Location</button>
                </p>
            </div>
            <div>
                <h1 className="form-black">New Ticket Form</h1>
                <form className="form" autoComplete="off" onSubmit={handleSubmit}>
                    <FormControl variant="filled" fullWidth>
                        <TextField variant="filled" label='Title' name='title' value={form.title} onChange={handleChange} required />
                        <Select id="cat-sel" label="Category" name='category' value={form.category} onChange={handleChange}>
                            <MenuItem value="Pothole">Pothole</MenuItem>
                            <MenuItem value="Drainage">Drainage</MenuItem>
                            <MenuItem value="Pedestrian">Pedestrian</MenuItem>
                            <MenuItem value="Traffic Light">Traffic Light</MenuItem>
                            <MenuItem value="Speed Limit">Speed Limit</MenuItem>
                            <MenuItem value="Snow">Snow</MenuItem>
                            <MenuItem value="Ice">Ice</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                        <TextField variant="filled" multiline rows={5} label='Description' name='description' value={form.description} onChange={handleChange} required placeholder='Description'></TextField>
                    </FormControl>
                    <p className="form-black">Select Location on Map Prior to Submitting</p>
                    <button className="form-button" variant="contained" type='submit'>Submit</button>
                </form>
            </div>

        </div>

    );
}