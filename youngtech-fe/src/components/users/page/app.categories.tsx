import AppItemCategories from './app.itemCategories';

const AppCategories = () => {
  return (
    <div className='w-full flex justify-center items-center'>
      <div className="w-[90%] bg-white mt-5 rounded-lg overflow-hidden"> 
        <div className="flex no-scrollbar sm:flex-nowrap md:flex-nowrap overflow-x-auto sm:overflow-x-auto md:overflow-x-auto lg:grid lg:grid-cols-8 gap-4 lg:overflow-visible">
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
          <AppItemCategories />
        </div>
      </div>
    </div>
  );
};

export default AppCategories;
