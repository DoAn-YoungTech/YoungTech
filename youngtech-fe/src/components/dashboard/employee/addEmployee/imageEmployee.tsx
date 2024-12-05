import React from 'react';
import FileDropzone from '../../editProduct/DropFile/DropFile';
const ImageEmployee = () => {
    return (
        <>
            <div className="bg-[#282F36]  rounded-xl">
              <h3 className="text-[1rem] text-white/50 p-4">
                 Hình ảnh nhân viên
              </h3>
              <div className="border-t border-t-white/30">
                <div className="p-4">
                  <img src="https://toigingiuvedep.vn/wp-content/uploads/2021/05/hinh-anh-avatar-cho-con-gai-cute.jpg" alt="img " className="rounded-2xl mb-2"/>
                  <FileDropzone />
                </div>
              </div>
            </div> 
        </>
    );
}

export default ImageEmployee;
