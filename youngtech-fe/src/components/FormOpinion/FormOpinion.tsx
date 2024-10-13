import Image from "next/image"


const FormOpinion = () => {
  return (
    <div className="w-full py-5 justify-center flex flex-col items-center">
       <div className="w-[45%]  border-blue-400 border py-5 rounded-lg shadow-lg px-5 gap-5 flex  items-center">
        
        <p className="text-slate-600">Bạn có hài lòng với trải nghiệm tìm kiếm 
            
            thông tin, sản phẩm trên website không?</p>
            
        
           <div className="flex w-[30%] flex-col hover:bg-blue-400 hover:rounded-lg cursor-pointer group py-5 px-2 justify-center items-center ">
           
                <Image src="/images/icon-happy.png" alt="icon-happy" width={30} height={30} />
                <h3 className="text-blue-400 group-hover:text-white ">Hài lòng</h3>
           
           </div>
           <div className="flex w-[47%] flex-col justify-center items-center hover:rounded-lg  hover:bg-blue-400 cursor-pointer group py-5 px-1 ">
         
                <Image src="/images/icon-bad.png" alt="icon-bad" width={25} height={25} />
                <h3 className="text-blue-400 group-hover:text-white">Không hài lòng</h3>
           
           </div>
           
           
    

       </div>
    </div>
  )
}

export default FormOpinion
