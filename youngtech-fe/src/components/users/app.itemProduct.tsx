import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
const AppItemProduct = () => {
  return (
    <div className='flex group flex-col my-3 hover:shadow-lg border px-3 rounded-lg py-3'>
              <p className='mb-5 overflow-hidden text-[11px] w-[70px]  flex justify-center bg-slate-200'>Trả góp 0%</p>
              
  <Image 
    src="/images/ip1.jpg"  
    alt="Logo" 
    className='transform transition-transform duration-500 ease-in-out hover:-translate-y-4'
    width={200}  
    height={250} 
  />
  <h3 className='pt-5 font-semibold transition-colors duration-500 group-hover:text-blue-600 w-full'>
    iPhone 16 Pro Max
  </h3>

         <div className='print-screen pt-1 w-full flex items-center gap-2'>
              <span className=' text-[12px] bg-slate-200 px-2 rounded-lg'>6.9</span>
              <span className=' text-[12px] bg-slate-200 px-2 rounded-lg'>Super Retina XDR</span>
         </div>
         <div className='gb w-full py-3'>
            <ul className='flex items-center gap-2'>
              <li className='border px-2 py-1 rounded-lg'>256Gb</li>
              <li className='border px-2 py-1 rounded-lg'>512Gb</li>
              <li className='border px-2 py-1 rounded-lg' >1Tb</li>
            </ul>
         </div>
         <strong className='price w-full text-[16px] text-red-600 '>34.990.000₫</strong>
         <div className='start py-1 text-slate-500'>
         <FontAwesomeIcon icon={faStar} style={{color: "#FFD43B",}} />
         <span className=''>4.3</span> (7)
         </div>
             </div>
  )
}

export default AppItemProduct
