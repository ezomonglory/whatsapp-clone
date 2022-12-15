import React from "react";
import FadeLoader from "react-spinners/FadeLoader"
function Loading() {
	return (
		<div className="h-screen grid place-items-center ">
			<div className="flex flex-col items-center justify-center">
				<img
					src='/image/wtsp.png'
					className='h-[200px] mb-[2rem]'
				/>
                <FadeLoader  color="#3CBC28" />
               
			</div>
		</div>
	);
}

export default Loading;
