
import Image from 'next/image';

const AppItemCategories = () => {
  return (
    <div className="flex flex-col hover:bg-slate-200 cursor-pointer p-4 items-center">
    <Image src="/images/cate1.png" alt="Máy giặc" width={48} height={48} />
    <p className='py-1'>Máy giặc</p>
  </div>
  )
}

export default AppItemCategories
