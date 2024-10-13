import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';


const Breadcrumb = () => {
  return (
    <div className='flex gap-3 bg-slate-50 px-5 py-5 w-full items-center ' >
    <a href="/" className='text-blue-700'>Trang Chủ</a>
    <FontAwesomeIcon className='text-[10px] ' icon={faChevronRight} />
    <h3 >128 Điện thoại</h3>
</div>
  )
}

export default Breadcrumb
