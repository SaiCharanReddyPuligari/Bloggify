import React from "react";
function Skeleton() {
    return (      
        <div className="w-full h-full flex">
            <div className="flex flex-auto justify-center items-center">
                <div className="flex justify-center">
                <div className="animate-spin inline-block w-16 h-16 border-[4px] border-text border-t-primary rounded-3xl">
                </div>
                </div>
             </div>
        </div>
    )
  }

export default Skeleton