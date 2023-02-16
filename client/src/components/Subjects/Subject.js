import React from 'react';
import {Card, CardMedia} from '@mui/material';

const Subject = ({name, image}) => {
	return(
		<Card sx={{'&:hover': {width: "99%", height:"99%"}, borderRadius: "10px"}}>
			<div style={{cursor:"pointer", position: "relative", width:"100%"}}>
				<CardMedia style={{ height: "250px", width:"100%", opacity: 0.9}}   component="img" image={image} title={name}/> 
				<div style={{backgroundColor: "rgba(0, 0, 0, 0.7)", width:"100%", textAlign: "center", fontSize:"260%" ,position: "absolute", color: "white", bottom: "0",}}>
					{name}
				</div>
			</div>
		</Card>
	);
};

export default Subject;