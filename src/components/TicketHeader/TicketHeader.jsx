import { useState, useEffect } from 'react'
import '../TicketItems/TicketItems.css'

export default function TicketHeader(props) {
    
    const[conVote, setConVote]=useState()
    const[resVote, setResVote]=useState()
    
    let tallyVotes=async()=> {
        const conVotes = props.ticket.confirmationVote.length
        const resVotes = props.ticket.resolvedVote.length
        setConVote(conVotes)
        setResVote(resVotes)
    }

    useEffect( ()=> {
        tallyVotes()
    },[]
    )

    return (
        <div className="ticket-header">
            <h2>Title: {props.ticket.title}</h2> 
            <h3>Category: {props.ticket.category}</h3>
            <p>Confirmation Votes: {conVote}</p>
            <p>Resolved Votes: {resVote}</p>
        </div>
    );
}