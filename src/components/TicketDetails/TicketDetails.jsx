import { useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import { green } from '@mui/material/colors';
import { red } from '@mui/material/colors';

export default function TicketDetails({ticket, checkUserVotes, conChecked, handleConChange, resChecked, handleResChange}) {

    useEffect( ()=> {
        checkUserVotes()
    },[]
    ) 
        
    return (
        <div className="ticket-details">
            <div className="left">
                <strong>Description: </strong>
                <p>{ticket.description}</p>
            </div>
            <div className="left">
                <strong>Date Added: </strong>
                <p>{ticket.createdAt.toString().substr(0,10)}</p>
            </div>
            {ticket.isActive ? 
                <div className="votes">
                    <div>
                        <p>Vote to confirm ticket accuracy:</p>
                        <Checkbox 
                            sx={{
                            color: red[800],
                            '&.Mui-checked': {
                                color: red[600],
                            },
                            }}
                            type="checkbox" 
                            checked={conChecked}
                            onChange={handleConChange}
                        />
                    </div>
                    <div>
                        <p>Vote if ticket issue is resolved:</p>
                        <Checkbox 
                            sx={{
                                color: green[800],
                                '&.Mui-checked': {
                                color: green[600],
                                },
                            }}
                            type="checkbox" 
                            checked={resChecked}
                            onChange={handleResChange}
                        />
                    </div>
                </div>
            :              
                <div>
                    <div>
                        <strong>Date Resolved: </strong>
                        <p>{ticket.updatedAt.toString().substr(0,10)}</p>
                    </div>
                </div>
            }
        </div>
    );
}